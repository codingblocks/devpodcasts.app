import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export const query = graphql`
  query {
    allPodcastShow(sort:{fields: [lastEpisodeDate], order: DESC}) {
      edges {
        node {
          slug
          episodes {
            id
            podcastTitle
            episodeTitle
            audioUrl
            published
          }
        }
      }
    }    
  }
`

export default ({ data }) => {
  let episodes = []
  data.allPodcastShow.edges.forEach(n => {
    n.node.episodes.forEach(e => {
      e.published = new Date(e.published)
      e.slug = n.node.slug
    })
    episodes.push(...n.node.episodes)
  })
  episodes.sort((a, b) => b.published - a.published)
  const recentEpisodes = episodes.slice(0, 25)

  const today = new Date()
  let endDate = new Date()
  endDate.setDate(today.getDate() - today.getDay())
  let startDate = new Date()
  startDate.setDate(endDate.getDate() - 7)
  const dateSlug = `/episodes/for-week/${formatDate(startDate)}-${formatDate(endDate)}/`

  return (
    <Layout>
      <p>
        Tech Podcasts are a great way to keep in touch with the wide world of programming.
      </p>
      <p>
        Some shows focus on the latest and greatest, and some focus on core skills - either way you are sure to find something you will love!
      </p>
      <p><Link to='/shows/'>Browse by show</Link></p>
      <p><Link to={dateSlug}>Browse by week</Link></p>
      <table>
        <thead>
          <tr>
            <th>Episode Name</th>
            <th>Podcast Show</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recentEpisodes.map(e => (
            <tr key={e.id}>
              <td>
                <Link to={e.audioUrl}>{e.episodeTitle}</Link>
              </td>
              <td>
                <Link to={`/shows/${e.slug}`}>{e.podcastTitle}</Link>
              </td>
              <td>{e.published.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

const formatDate = d => {
  return `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`
}