import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
// import Chart from '../components/releaseChart'

export const query = graphql`
  query {
    allPodcastShow {
      edges {
        node {
          episodes {
            tags
          }
        }
      }
    }
  }
`
export default ({ data }) => {
  const tags = {
    none: 0
  }

  data.allPodcastShow.edges.forEach(show => {
    show.node.episodes.forEach(e => {
      if (!e.tags.length) {
        tags.none = tags.none + 1
      } else {
        e.tags.forEach(t => {
          if (!tags[t]) {
            tags[t] = 1
          } else {
            tags[t] = tags[t] + 1
          }
        })
      }
    })
  })

  return (
    <Layout>
      <section className='section clearfix'>
        <div className='container'>
          <h2>Tags</h2>
          <p>Text here about how we figured out the tags</p>
          <ul>
            {Object.keys(tags).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{tags[key]}</td>
              </tr>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
