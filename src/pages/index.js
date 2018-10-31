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
  console.log(data)
  return (
    <Layout>
      <div>
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
