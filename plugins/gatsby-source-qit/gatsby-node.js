const fetch = require('node-fetch')

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  delete configOptions.plugins

  const processShow = show => {
    const normalizedShow = {
      podcastTitle: show.value,
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

  return fetch(configOptions.allShowsUrl, {
    cache: 'no-cache',
    headers: {
      'api-key': configOptions.key
    }
  })
    .then(r => r.json())
    .then(data => {
      const shows = data['@search.facets'].podcastTitle
      shows.forEach(show => {
        // TODO would be better to use real feed
        const episodeUrl = `${configOptions.individualUrl}&query=${encodeURI(show.value)}`
        fetch(episodeUrl, {
          cache: 'no-cache',
          headers: {
            'api-key': configOptions.key
          }
        })
          .then(r => r.json())
          .then(episodeData => {
            show.episodes = episodeData.value
            const showData = processShow(show)
            createNode(showData)
            console.log(`Created node for ${show.value}`)
          })
      })
    })
}
