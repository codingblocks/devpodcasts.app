import React from 'react'
import { Link } from 'gatsby'

const Overview = () => (
  <section id='section-about' className='section clearfix'>
    <div className='container'>
      <div className='section-header'>
        <h2>Here's the scoop</h2>
      </div>
      <p>
        Most podcast apps focus on a subscription model. You subscribe to a{' '}
        <b>show</b> that looks interesting to recieve future episodes. But what
        if you want to hone in on a particular topics to research a particular
        tech?
      </p>
      <br />
      <p>That's where we come in!</p>
      <br />
      <p>
        This site lets you browse podcasts in a few different ways, most notably
        via browsing <Link to='/tags'>tags</Link> but you can also view the{' '}
        <Link to='/latest'>most recent episodes</Link> or browse by{' '}
        <Link to='/shows'>show title</Link>.
      </p>
      <p>
        Oh yeah, and it's all{' '}
        <a href='https://github.com/codingblocks/tech-podcasts'>open-source</a>{' '}
        and we gladly accept PRs, issues, or{' '}
        <a href='https://twitter.com/codingblocks'>tweets</a> about it.
      </p>
    </div>
  </section>
)

export default Overview
