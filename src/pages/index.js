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
        }
      }
    }    
  }
`

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <div className='todo'>
          <p>TODO:</p>
          <ul>
            <li>Pie chart for episodes</li>
            <li>Pie chart for tags</li>
            <li>Histogram for recent releases</li>
            <li>Show X most recent episodes</li>
            <li>Link to QIT searches</li>
          </ul>
        </div>

        <table>
          <thead>
            <tr>
              <th>Show</th>
              <th>Episode Count</th>
            </tr>
          </thead>
          <tbody>
            {data.allPodcastShow.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/shows/${node.slug}`}>{node.podcastTitle}</Link>
                </td>
                <td>{node.episodeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
