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
      episodeCount: show.count
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

  return fetch(configOptions.url, {
    cache: 'no-cache',
    headers: {
      'api-key': configOptions.key
    }
  })
    .then(r => r.json())
    .then(data => {
      const shows = data['@search.facets'].podcastTitle
      shows.forEach(show => {
        const showData = processShow(show)
        console.log(showData)
        createNode(showData)
      })
    })
}
