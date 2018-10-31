import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

export default ({ pageContext }) => {
  return (
    <Layout>
      <h1 class='podcast-title'>{pageContext.podcastTitle}</h1>
      <p className='small'>{pageContext.episodeCount} Episodes</p>

      <div className='todo'>
        <p>TODO:</p>
        <ul>
          <li>Image</li>
          <li>Description</li>
          <li>Links (website, feed, podchaser etc)</li>
          <li>Tags</li>
        </ul>
      </div>

      <table>
        <thead>
          <tr>
            <th>Episode</th>
            <th>Publish date</th>
          </tr>
        </thead>
        <tbody>
          {pageContext.episodes.map(e => (
            <tr>
              <td>{e.episodeTitle}</td>
              <td>{e.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/'>back</Link>
    </Layout>
  )
}
