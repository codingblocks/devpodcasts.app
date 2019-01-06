import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import TagChart from '../components/tagChart'

export const query = graphql`
  query {
    allPodcastShow(sort: { fields: [lastEpisodeDate], order: DESC }) {
      edges {
        node {
          slug
          episodes {
            id
            podcastTitle
            episodeTitle
            audioUrl
            published
            tags
          }
        }
      }
    }
  }
`

export default ({ data }) => {
  let episodes = []
  let seenEpisodes = {}
  data.allPodcastShow.edges.forEach(n => {
    n.node.episodes.forEach(e => {
      if (seenEpisodes[e.audioUrl]) {
        return
      }
      seenEpisodes[e.audioUrl] = true
      e.published = new Date(e.published)
      e.slug = n.node.slug
      episodes.push(e)
    })
  })
  episodes.sort((a, b) => b.published - a.published)
  const recentEpisodes = episodes.slice(0, 25)

  const today = new Date()
  let endDate = new Date()
  endDate.setDate(today.getDate() - today.getDay())
  let startDate = new Date()
  startDate.setDate(endDate.getDate() - 7)
  const dateSlug = `/episodes/for-week/${formatDate(startDate)}-${formatDate(
    endDate
  )}/`

  recentEpisodes.forEach(e => {
    e.tagLinks = e.tags
      .map(
        t =>
          `<a class='tag small' href='https://qit.cloud/search/"${t.replace(
            `-`,
            ' '
          )}"'>${t}</a>`
      )
      .join(' ')
  })

  const tags = {}
  recentEpisodes.forEach(e => {
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

  const sortedTags = Object.keys(tags)
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
          <p>
            Programming Podcasts are a great way to stay educated and inspired.
          </p>
          <p>
            Some shows focus on the latest and greatest programming trends, and
            others focus on fundamentals and soft skills. Let us help you find
            the right episode for you.
          </p>
          <TagChart tags={sortedTags} showLegend showNull />
          <p>
            <Link to={dateSlug}>Browse by week</Link>
          </p>

          <p>Note: Does this table look skimpy to you? Try swiping!</p>
          <div className='table-responsive'>
            <table className='table'>
              <caption>Latest episodes</caption>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Episode Name</th>
                  <th scope='col'>Podcast Show</th>
                  <th scope='col'>Tags</th>
                  <th scope='col'>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEpisodes.map(e => (
                  <tr key={e.id}>
                    <td nowrap='true'>
                      <a
                        href={e.audioUrl}
                        title={`Listen to ${e.episodeTitle}`}
                      >
                        {e.episodeTitle}
                      </a>
                    </td>
                    <td nowrap='true'>
                      <Link to={`/shows/${e.slug}`}>{e.podcastTitle}</Link>
                    </td>
                    <td
                      dangerouslySetInnerHTML={{ __html: e.tagLinks }}
                      nowrap='true'
                    />
                    <td nowrap='true'>{e.published.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  )
}

// Lots of dupe code!!

const formatDate = d => {
  const year = d.getFullYear()
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d
    .getDate()
    .toString()
    .padStart(2, '0')
  return `${year}${month}${day}`
}
