const fetch = require('node-fetch')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  delete configOptions.plugins

  const processShow = show => {
    const slug = encodeURI(show.value.trim().replace(/ +/g, '-')).toLowerCase() // Used for linking
    const normalizedShow = {
      podcastTitle: show.value,
      slug: slug,
      episodeCount: show.count,
      episodes: show.episodes
    }
    return Object.assign({}, normalizedShow, {
      id: createNodeId(
        `podcast-show-${normalizedShow.podcastTitle}-${normalizedShow.episodeCount}`
      ),
      parent: null,
      children: [],
      internal: {
        type: `PodcastShow`,
        content: JSON.stringify(normalizedShow),
        contentDigest: createContentDigest(normalizedShow)
      }
    })
  }

  const searchHeaders = {
    headers: {
      'api-key': configOptions.key
    }
  }
  const showResponse = await fetch(
    configOptions.allShowsUrl,
    searchHeaders
  ).then(r => r.json())

  const shows = showResponse['@search.facets'].podcastTitle
  const processShows = async () => {
    for (const show of shows) {
      // TODO would be better to use real feed
      const episodeUrl = `${configOptions.individualUrl}&query=${encodeURI(show.value)}`
      const episodeData = await fetch(episodeUrl, searchHeaders).then(r =>
        r.json()
      )
      show.episodes = episodeData.value
      const showData = processShow(show)
      createNode(showData)
      console.log(`Created node for ${show.value}`)
    }
  }
  await processShows()
}
