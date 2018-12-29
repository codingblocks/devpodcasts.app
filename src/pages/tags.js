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

  const sorted = Object.keys(tags)
    .map(t => {
      return { tag: t, count: tags[t] }
    })
    .sort((a, b) => {
      return b.count - a.count
    })

  return (
    <Layout>
      <section className='section clearfix'>
        <div className='container'>
          <h2>Tags</h2>
          <p>Text here about how we figured out the tags</p>
          <ul>
            {sorted.map(tagCount => (
              <tr key={tagCount.tag}>
                <td>{tagCount.tag}</td>
                <td>{tagCount.count}</td>
              </tr>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
