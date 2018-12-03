const fetch = require('node-fetch')
const parsePodcastFeed = require('node-podcast-parser')

async function getFeed (feedUrl) {
  console.log(` fetching ${feedUrl}`)
  const body = await (await fetch(feedUrl)).text().catch(e => {
    console.error(`Error fetching ${feedUrl}`)
    return ''
  })
  return new Promise(function (resolve, reject) {
    parsePodcastFeed(body, (err, results) => {
      if (err) {
        console.error(err)
        resolve(err)
      } else {
        resolve(results)
      }
    })
  })
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  delete configOptions.plugins

  const processShow = show => {
    const slug = encodeURI(
      show.value.trim().replace(/[^\w]+/g, '-')
    ).toLowerCase() // Used for linking
    const normalizedShow = {
      podcastTitle: show.value,
      slug: slug,
      episodeCount: show.count,
      episodes: show.episodes,
      feed: show.feed,
      lastEpisodeDate: show.lastEpisodeDate
    }
    return Object.assign({}, normalizedShow, {
      id: createNodeId(
        `podcast-show-${normalizedShow.slug}-${normalizedShow.episodeCount}`
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
  )
    .then(r => r.json())
    .catch(e => {
      console.error(`Error fetching ${configOptions.allShowsUrl}`)
      console.error(e)
    })

  const shows = showResponse['@search.facets'].podcastTitle
  const processShows = async () => {
    for (const show of shows) {
      // TODO would be better to use real feed
      const episodeUrl = `${configOptions.individualUrl}&search=${encodeURI(show.value)}`
      console.log(episodeUrl)
      const episodeData = await fetch(episodeUrl, searchHeaders).then(r =>
        r.json()
      )
        .catch(e => {
          console.error(`Error getting episodes for ${episodeUrl}`)
          console.error(e)
        })
      show.episodes = episodeData.value
      const feedUrl = show.episodes[0].feed
      if (feedUrl === 'http://coder.show/rss') {
        break
      }
      const data = await getFeed(feedUrl).catch(e => {
        console.error(`Error getting feed for ${episodeUrl}`)
        console.error(e)
      })
      show.feed = {
        url: feedUrl,
        data: data
      }
      show.lastEpisodeDate = new Date(show.feed.data.episodes[0].published)

      const showData = processShow(show)
      createNode(showData)
      console.log(` created node for ${show.value}`)
    }
  }
  await processShows()
}
