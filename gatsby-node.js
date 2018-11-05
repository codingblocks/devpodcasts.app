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

  const formatDate = d => {
    return `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`
  }

  exports.onPreExtractQueries = ({ actions }) => {
    console.log(`Creating pages by date range`)
    const today = new Date()
    let endDate = new Date()
    endDate.setDate(today.getDate() - today.getDay())
    let startDate = new Date()
    startDate.setDate(endDate.getDate() - 7)

    const slug = `/episodes/for-week/${formatDate(startDate)}-${formatDate(endDate)}/`
    console.log(`Created page for ${slug}`)
    actions.createPage({
      path: slug,
      component: path.resolve(`./src/templates/episodes-for-week.js`),
      context: {
        startDate: startDate,
        endDate: endDate
      }
    })
  }
}
