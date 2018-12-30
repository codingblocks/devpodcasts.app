import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Overview from '../components/appOverview'
import TagChart from '../components/tagChart'

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
  // TODO DUPE CODE!!
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
      <Hero />
      <Overview />
      <TagChart tags={sorted} />
      <section class='section'>
        <div class='container'>
          <h2>Tagging</h2>
          <p>
            We're still working on getting tagging right, but you can read all
            about it and see all of the tags on the <Link to='/tags'>tags</Link>{' '}
            page.
          </p>
        </div>
      </section>
    </Layout>
  )
}
