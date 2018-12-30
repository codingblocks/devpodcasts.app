import React from 'react'
import { Link } from 'gatsby'
import phoneImage from './static/img/qit-phone.png'

const Hero = () => (
  <section id='section-about' className='section clearfix'>
    <div className='container'>
      <div className='section-header'>
        <h2>Here's the scoop</h2>
      </div>
      <p>
        Most podcast apps focus on a subscription model. You subscribe to a{' '}
        <b>show</b> that looks interesting to recieve future episodes. But what
        if you want to hone in on a particular <Link to='/tags'>tags</Link> to
        research a particular tech?
      </p>
      <br />
      <p>That is where we come in!</p>
      <br />
      <p>
        <Link to='https://qit.cloud'>QIT</Link> lets you search for narrow tech
        tags so that you can easily find the content you care the most about,
        right now, and it's all{' '}
        <a href='https://github.com/codingblocks/podcast-app'>open-source</a>.
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

export default Hero
