import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export const query = graphql`
  query {
    allPodcastShow(sort: { fields: [lastEpisodeDate], order: DESC }) {
      edges {
        node {
          episodeCount
          podcastTitle
          slug
          lastEpisodeDate
        }
      }
    }
  }
`

export default ({ data }) => {
  // Not the most efficient way to add things up, but it's convinient!
  const shows = data.allPodcastShow.edges.map(s => Object.assign({}, s.node))
  const meta = augmentShows(shows)

  return (
    <Layout>
      <section class='section'>
        <div class='container'>
          <h2>Shows</h2>
          <p>
            Here is a list of tech podcasts, ordered by the number of episodes
            indexed by the <a href='https://qit.cloud'>qit</a> search engine.
          </p>
          <p>
            If you assume an average of 45 minutes per episode, on average, then
            that's roughly <em>{meta.estimatedHours} hours</em> worth of
            content.
          </p>
          <div className='table-responsive'>
            <table className='table'>
              <caption>Podcast show listing</caption>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Show</th>
                  <th scope='col' nowrap='true'>
                    Last Episode
                  </th>
                  <th scope='col' nowrap='true'>
                    Episode Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {shows.map(node => (
                  <tr nowrap='true' key={node.podcastTitle}>
                    <td>
                      <Link to={`/shows/${node.slug}`}>
                        {node.podcastTitle}
                      </Link>
                    </td>
                    <td nowrap='true'>
                      {node.lastEpisodeDate.toLocaleDateString()}
                    </td>
                    <td nowrap='true'>{node.episodeCount}</td>
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

const augmentShows = shows => {
  const meta = {
    showCount: 0,
    episodeCount: 0,
    estimatedHours: 0
  }

  shows.forEach(s => {
    s.lastEpisodeDate = new Date(s.lastEpisodeDate)
    meta.showCount = meta.showCount + 1
    meta.episodeCount = meta.episodeCount + s.episodeCount
    meta.estimatedHours = (meta.episodeCount + s.episodeCount) * 0.75
  })

  return meta
}
