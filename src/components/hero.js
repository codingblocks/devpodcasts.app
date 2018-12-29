import React from 'react'
import { Link } from 'gatsby'

const Hero = () => (
  <section id='intro'>
    <div className='intro-content'>
      <h2>DEV?</h2>
      <h3>Listen to podcast episodes on tags you care about</h3>
      <ul className='discovery-list'>
        <li>
          <a href='https://qit.cloud'>search</a>
        </li>
        <li className='discovery-list-spacer'>|</li>
        <li>
          <Link to='/tags'>tags</Link>
        </li>
        <li className='discovery-list-spacer'>|</li>
        <li>
          <Link to='latest'>latest</Link>
        </li>
      </ul>
    </div>
  </section>
)

export default Hero
