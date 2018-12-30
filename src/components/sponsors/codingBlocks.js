import React from 'react'
import Source from '../static/img/codingblocks-170x170bb.jpg'

export default () => {
  return (
    <div className='sponsor text-center'>
      <img className='sponsor-image' src={Source} />
      <p>
        Are you into clean code, pragmatism, and computer science fundamentals?
      </p>
      <h3>US TOO!</h3>
      <p>
        Check us out the{' '}
        <a href='https://www.codingblocks.net'>Coding Blocks</a> podcast.
      </p>
    </div>
  )
}
