const apiKey = process.env.AZURE_SEARCH_ADMIN_API_KEY
if (!apiKey) {
  console.error('No API key found for the search engine, aborting')
}
const searchUrl = process.env.AZURE_SEARCH_ENDPOINT
if (!searchUrl) {
  console.error('No search endpoint found for the search engine')
}

const sleep = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const fs = require('fs')
const fetch = require('node-fetch')
const threshold = process.env.TAG_FILTER_THRESHOLD || 3
const requestDelay = process.env.TAG_FILTER_REQUEST_DELAY || 1000

// read in the files
const whitelist = fs
  .readFileSync(`files/blacklistedTags.txt`, 'utf-8')
  .split(require('os').EOL)
  .map(t => t.split(`,`)[0])

const unvettedTerms = fs
  .readFileSync(`files/unvettedTags.txt`, 'utf-8')
  .split(require('os').EOL)
  .map(t => t.split(',')[0])
  .concat(whitelist)

const blacklist = {}
fs.readFileSync(`files/blacklistedTags.txt`, 'utf-8')
  .split(require('os').EOL)
  .map(t => t.split(`,`)[0])
  .forEach(t => {
    blacklist[t] = true
  })

const getFilteredTerms = async () => {
  const filteredTerms = []
  await Promise.all(
    unvettedTerms.map(async t => {
      if (blacklist[t]) {
        console.log(`Blacklisting ${t}`)
        return
      }
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
  const sorted = filteredTerms.sort((a, b) => b.count - a.count)
  console.log(`Keeping ${sorted.length} out of ${sorted.length}`)
  fs.writeFileSync(
    `files/filteredTags.txt`,
    sorted.map(t => `${t.term},${t.count}`).join(require('os').EOL)
  )
})
