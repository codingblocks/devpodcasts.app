const path = require(`path`)

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === `PodcastShow`) {
    console.log(`slug: ${node.slug}`)

    actions.createPage({
      path: `/shows/${node.slug}/`,
      component: path.resolve(`./src/templates/podcast-show.js`),
      context: node
    })
  }
}
