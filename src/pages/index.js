import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export const query = graphql`
  query {
    allPodcastShow(sort:{fields: [episodeCount], order: DESC}) {
      edges {
        node {
          episodeCount
          podcastTitle
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
                <td>{node.podcastTitle}</td>
                <td>{node.episodeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}