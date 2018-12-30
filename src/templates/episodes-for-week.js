import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Chart from '../components/releaseChart'

export default ({ data, pageContext }) => {
  const startDate = new Date(pageContext.startDate)
  const endDate = new Date(pageContext.endDate)
  // Ok, this has gone too far!
  endDate.setHours(23)
  endDate.setMinutes(59)
  endDate.setSeconds(59)

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
      if (e.published >= startDate && e.published <= endDate) {
        episodes.push(e)
      }
    })
  })
  episodes.sort((a, b) => b.published - a.published)

  const previousStart = new Date(startDate)
  const previousEnd = new Date(endDate)
  previousStart.setDate(startDate.getDate() - 7)
  previousEnd.setDate(endDate.getDate() - 7)

  const previousSlug = `/episodes/for-week/${formatDate(
    previousStart
  )}-${formatDate(previousEnd)}/`
  const hidePreviousLink = previousStart < earliestDate
  episodes.forEach(e => {
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

  return (
    <Layout>
      <section class='section'>
        <div class='container'>
          <div>
            <p>
              {episodes.length} podcasts released between{' '}
              {startDate.toLocaleDateString()} and{' '}
              {endDate.toLocaleDateString()}
            </p>
          </div>
          <Chart episodes={episodes} />
          <div className='table-responsive'>
            <table className='table'>
              <caption>
                {episodes.length} podcasts released between{' '}
                {startDate.toLocaleDateString()} and{' '}
                {endDate.toLocaleDateString()}
              </caption>
              <thead class='thead-dark'>
                <tr>
                  <th scope='col'>Episode Name</th>
                  <th scope='col'>Podcast Show</th>
                  <th scope='col'>Tags</th>
                  <th scope='col'>Date</th>
                </tr>
              </thead>
              <tbody>
                {episodes.map(e => (
                  <tr key={e.audioUrl}>
                    <td nowrap='true'>
                      <a
                        href={e.audioUrl}
                        title={`Listen to e.${e.podcastTitle}`}
                      >
                        {e.episodeTitle}
                      </a>
                    </td>
                    <td nowrap='true'>
                      <Link to={`/shows/${e.slug}`}>{e.podcastTitle}</Link>
                    </td>
                    <td
                      nowrap='true'
                      dangerouslySetInnerHTML={{ __html: e.tagLinks }}
                    />
                    <td nowrap='true'>{e.published.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to={previousSlug} hidden={hidePreviousLink}>
            Previous week
          </Link>
        </div>
      </section>
    </Layout>
  )
}

let earliestDate = new Date()
earliestDate.setDate(earliestDate.getDate() - 90)

const formatDate = d => {
  const year = d.getFullYear()
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d
    .getDate()
    .toString()
    .padStart(2, '0')
  return `${year}${month}${day}`
}

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
