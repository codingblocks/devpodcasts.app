import React from 'react'
import Source from '../static/img/codingblocks-170x170bb.jpg'

export default () => {
  return (
    <div className='sponsor text-center'>
      <a href='https://www.codingblocks.net'>
        <img className='sponsor-image' src={Source} />
      </a>
      <br />
      <br />
      <p>
        Are you into clean code, pragmatism, and computer science fundamentals?
      </p>
      <h3>US TOO!</h3>
      <p>
        Check out the <a href='https://www.codingblocks.net'>Coding Blocks</a>{' '}
        podcast.
      </p>
      <br />
    </div>
  )
}
