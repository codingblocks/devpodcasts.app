import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export const query = graphql`
  query {
    allPodcastShow(sort:{fields: [episodeCount], order: DESC}) {
      edges {
        node {
          episodeCount
          podcastTitle
          slug
          lastEpisodeDate
        }
      }
    }    
  }
`

export default ({ data }) => {
  // All this should be done in graphql...
  const shows = data.allPodcastShow.edges
    .map(s => Object.assign({}, s.node))
  shows.forEach(s => { s.lastEpisodeDate = new Date(s.lastEpisodeDate) })
  shows.sort((a, b) => a.lastEpisodeDate - b.lastEpisodeDate).reverse()

  return (
    <Layout>
      <div>
        <table>
          <thead>
            <tr>
              <th>Show</th>
              <th>Last Episode</th>
              <th>Episode Count</th>
            </tr>
          </thead>
          <tbody>
            {shows.map(node => (
              <tr key={node.podcastTitle}>
                <td>
                  <Link to={`/shows/${node.slug}`}>{node.podcastTitle}</Link>
                </td>
                <td>{node.lastEpisodeDate.toLocaleDateString()}</td>
                <td>{node.episodeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
