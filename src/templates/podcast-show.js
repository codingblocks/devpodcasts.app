import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

export default ({ pageContext }) => {
  const feed = pageContext.feed.data
  return (
    <Layout>
      <section class='section'>
        <div class='container'>
          <div>
            <img
              src={feed.image}
              alt={feed.description.short}
              className='img-fluid show-image'
            />
            <div className='show-details'>
              <p>
                <a href={feed.link}>{feed.title}</a>
              </p>
              <p>
                Last Episode:{' '}
                {new Date(pageContext.lastEpisodeDate).toLocaleDateString()}
              </p>
              <p>{feed.episodes.length} Episodes</p>
            </div>
          </div>
          <p>{feed.description.long}</p>
          <div className='table-responsive'>
            <table className='table'>
              <caption>Episodes</caption>
              <thead class='thead-dark'>
                <tr>
                  <th>Episode</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feed.episodes.slice(0, 10).map(e => (
                  <tr key={e.enclosure.url}>
                    <td nowrap='true'>
                      <a href={e.enclosure.url}>{e.title}</a>
                    </td>
                    <td nowrap='true'>
                      {new Date(e.published).toLocaleDateString()}
                    </td>
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
