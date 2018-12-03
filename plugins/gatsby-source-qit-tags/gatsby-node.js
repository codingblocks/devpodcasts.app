const fetch = require('node-fetch')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  delete configOptions.plugins

  const processTag = (tag, tagResponse) => {
    const normalizedTag = {
      tag: tag,
      slug: encodeURI(tag.trim().replace(/[^\w]+/g, '-')).toLowerCase(),
      episodes: tagResponse.value
    }
    return Object.assign({}, normalizedTag, {
      id: createNodeId(`tag-${normalizedTag.slug}`),
      parent: null,
      children: [],
      internal: {
        type: `PodcastTag`,
        content: JSON.stringify(normalizedTag),
        contentDigest: createContentDigest(normalizedTag)
      }
    })
  }

  const searchHeaders = {
    headers: {
      'api-key': configOptions.key
    }
  }

  const getAllTags = async () => {
    console.log(`Getting all tags`)
    for (let tagIndex in configOptions.tags) {
      const tag = configOptions.tags[tagIndex].split(',')[0]
      console.log(`Getting tag ${tag}`)
      const url = `${configOptions.episodesByTagUrl}&search=${encodeURI(tag)}`
      const tagResponse = await fetch(url, searchHeaders).then(r => r.json())
      tagData = processTag(tag, tagResponse)
      createNode(tagData)
      console.log(` created node for ${tag}`)
    }
  }
  await getAllTags()
}
