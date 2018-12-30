import React from 'react'
import Layout from '../components/layout'

export default ({ pageContext }) => {
  const feed = pageContext.feed.data

  return (
    <Layout>
      <section class='section'>
        <div class='container'>
          <div>
            <div className='section-header'>
              <h2>{feed.title}</h2>
            </div>
            <div class='text-center'>
              <img
                src={feed.image}
                alt={feed.description.short}
                className='img-fluid show-image center'
              />

              <div className='show-details'>
                <p class='smaller'>
                  Last Episode:{' '}
                  {new Date(pageContext.lastEpisodeDate).toLocaleDateString()}
                  <br />
                  {feed.episodes.length} episodes in RSS feed:{' '}
                  <a href={feed.link}>{feed.link}</a>
                </p>
              </div>
            </div>
          </div>
          <h4 class='show-description-title'>Show Description</h4>
          <p>{feed.description.long}</p>
          <div className='table-responsive'>
            <table className='table'>
              <caption>Episode listing for {feed.title}</caption>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Episode</th>
                  <th scope='col'>Date</th>
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
