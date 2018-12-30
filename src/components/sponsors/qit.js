import React from 'react'
import { Link } from 'gatsby'

export default () => {
  return (
    <div className='sponsor text-center'>
      <p>
        <a href='https://qit.cloud'>QIT</a> lets find the programming podcasts
        that are right for you. It's a progressive web app, doesn't require
        login, and there are no ads like this one to get in your way.
      </p>
      <p>
        Read more about how <Link to='/qit'>QIT</Link> works, it's pretty cool
        if we do say so ourselves!
      </p>
    </div>
  )
}
