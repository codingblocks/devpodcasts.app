import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Chart from '../components/tagChart'

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
          <p>
            Tags are like pre-computed search terms that aim to figure out what
            podcast episodes are about. Aside from a few synonyms there isn't
            any magic going on as you can probably see from the results below.
          </p>
          <p>
            However, there is a lot of room for improvement and there are a
            couple of changes on the horizon:
          </p>
          <h3>How can we fix this?</h3>
          <p>
            1. The actual tags aren't so great right now, for example an astute
            observer would notice the tags "ai" and "artificial intelligence"
            are both in the list. Worse, "ai" has a suspiciously high count
            because there are some low value matches being returned from other
            words that contain the letters "ai". This is easy to fix as I have
            both a white list and black list of terms that I can use to tweak
            the tags.
          </p>
          <p>
            2. Tags really ought to have a hierarchy. For example, if an episode
            is about React, then it is also about JavaScript. Same with
            Kubernetes and DevOps.
          </p>
          <p>
            3. There are a lot of "none" results. This is a combination of weak
            episode descriptions and topics that are hard to classify by search.
            Examples include things like "soft skills" or "career management". I
            think we'll need a bit of a human touch to handle these items.
          </p>
          <Chart tags={sorted} />
          <h3>All Tags</h3>
          <p>
            Note: Because of some caching there may be a small discrepancy
            between the number you see below, and the count you see after
            clicking. The number over on <a href='https://qit.cloud'>QIT</a> is
            closer to real-time.
          </p>
          <ul className='tag-list'>
            {sorted.map(tagCount => (
              <li key={tagCount.tag} className='tag'>
                {/* TODO Actually search via tag, which also fixes the "none" */}
                <a
                  href={`https://qit.cloud/search/"${tagCount.tag.replace(
                    `-`,
                    ' '
                  )}"`}
                >
                  {tagCount.tag} x {tagCount.count}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
