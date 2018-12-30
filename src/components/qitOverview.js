import React from 'react'
import { Link } from 'gatsby'
import phoneImage from './static/img/qit-phone.png'

const Overview = () => (
  <section id='section-about' className='section clearfix'>
    <div className='container'>
      <div className='section-header'>
        <h2>What is QIT?</h2>
      </div>
      <p>
        <Link to='https://qit.cloud'>QIT</Link> lets you search for narrow tech
        tags so that you can easily find the content you care the most about,
        right now, and it's all{' '}
        <a href='https://github.com/codingblocks/podcast-app'>open-source</a>.
      </p>
      <p>
        Even better you can queue those episodes up and chew through them at
        high speed.
      </p>
      <div className='qit-phone'>
        <a
          href='https://qit.cloud/search/graphql'
          title='Listen to episodes about GrpahQL'
        >
          <img src={phoneImage} />
        </a>
      </div>
    </div>
  </section>
)

export default Overview
