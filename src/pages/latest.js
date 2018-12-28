import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

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

  return (
    <Layout>
      <section className='section clearfix'>
        <p>
          Programming Podcasts are a great way to stay educated and inspired.
        </p>
        <p>
          Some shows focus on the latest and greatest programming trends, and
          others focus on fundamentals and soft skills. Let us help you find the
          right episode for you.
        </p>
        <p>
          <Link to='/shows/'>Browse by show</Link>
        </p>
        <p>
          <Link to={dateSlug}>Browse by week</Link>
        </p>

        <table>
          <thead>
            <tr>
              <th>Episode Name</th>
              <th>Podcast Show</th>
              <th>Tags</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentEpisodes.map(e => (
              <tr key={e.id}>
                <td>
                  <a href={e.audioUrl} title={`Listen to ${e.episodeTitle}`}>
                    {e.episodeTitle}
                  </a>
                </td>
                <td>
                  <Link to={`/shows/${e.slug}`}>{e.podcastTitle}</Link>
                </td>
                <td>{e.tags.join(', ')}</td>
                <td>{e.published.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
