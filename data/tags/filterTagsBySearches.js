const apiKey = process.env.AZURE_SEARCH_ADMIN_API_KEY
if (!apiKey) {
  console.error('No API key found for the search engine, aborting')
}
const searchUrl = process.env.AZURE_SEARCH_ENDPOINT
if (!apiKey) {
  console.error('No search endpoint found for the search engine')
}

const sleep = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const fs = require('fs')
const fetch = require('node-fetch')
const threshold = process.env.TAG_FILTER_THRESHOLD || 3
const requestDelay = process.env.TAG_FILTER_REQUEST_DELAY || 500

// read in the file
const unvettedTerms = fs
  .readFileSync(`unvettedTags.txt`, 'utf-8')
  .split(require('os').EOL)

const getFilteredTerms = async () => {
  const filteredTerms = []
  await Promise.all(
    unvettedTerms.map(async t => {
      const safeTag = encodeURI(`"${t.replace(/\-/g, ' ')}"`)
      const params = `api-version=2017-11-11&$top=0&$count=true&search=${safeTag}`
      const url = `${searchUrl}/indexes/podcasts/docs?${params}`

      await sleep(requestDelay)
      await fetch(url, { headers: { 'api-key': apiKey } })
        .then(response => response.json())
        .then(json => {
          const count = json[`@odata.count`]
          if (count >= threshold) {
            filteredTerms.push({ term: t, count })
            console.log(`Adding ${t}, count ${count}`)
          } else {
            console.log(`Skipping term ${t} (${count})`)
          }
        })
    })
  )
  return filteredTerms
}
getFilteredTerms().then(filteredTerms => {
  console.log(`Keeping ${filteredTerms.length} out of ${unvettedTerms.length}`)
  fs.writeFileSync(
    `filteredTags.txt`,
    filteredTerms.map(t => `${t.term},${t.count}`).join(require('os').EOL)
  )
})
