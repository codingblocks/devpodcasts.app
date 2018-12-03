const apiKey = process.env.AZURE_SEARCH_ADMIN_API_KEY
if (!apiKey) {
  console.error('No API key found for the search engine, aborting')
}
const searchUrl = process.env.AZURE_SEARCH_ENDPOINT
if (!searchUrl) {
  console.error('No search endpoint found for the search engine')
}

const version = process.env.AZURE_SEARCH_API_VERSION
if (!version) {
  console.error('No version found for the search engine')
}

const index = process.env.AZURE_SEARCH_INDEX_NAME
if (!index) {
  console.error('No index found for the search engine')
}

const sleep = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const fs = require('fs')
const fetch = require('node-fetch')
const requestDelay = process.env.TAG_FILTER_REQUEST_DELAY || 1000

// read in the file
const tags = fs.readFileSync(`files/filteredTags.txt`, 'utf-8').split(require('os').EOL)
const AzureSearch = require('azure-search')
const client = AzureSearch({
  url: searchUrl,
  key: apiKey,
  version: version
})

const updateEpisodes = async (tag) => {
  await Promise.all(
    tags.map(t => t.split(',')[0])
      .map(async t => {
        const safeTag = encodeURI(`"${t.replace(/\-/g, ' ')}"`)
        const params = `api-version=2017-11-11&$top=100&search=${safeTag}` // TODO exclude ones that have the tag already
        const url = `${searchUrl}/indexes/podcasts/docs?${params}`

        await sleep(requestDelay)

        await fetch(url, { headers: { 'api-key': apiKey } })
          .then(response => response.json())
          .then(json => {
            const episodes = json.value
            episodes.forEach(e => {
              if (e.tags.indexOf(t) >= 0) {
                return
              }
              e.tags.push(t)
            })
            client.updateDocuments(index, episodes, function (err, results) {
              // optional error, or confirmation of each document being added
              if (err) {
                console.error(`Error updating tag ${t}`)
                console.error(err)
              } else {
                console.log(`${t} updated, ${episodes.length} episodes`)
              }
            })
          })
      })
  )
}

updateEpisodes()
