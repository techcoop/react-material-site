import React from 'react'
import { Link } from 'react-router-dom'
import CoreLayout from '../layouts/CoreLayout'
import { openChat } from '../utils/chat'

import './NotFound.scss'

export const NotFound = props => (
  <CoreLayout {...props}>
    <div>
      <div>We're sorry, we couldn't find this page.</div>
      <br />
      <div>Here are your options:</div>
      <br />
      <div>
        <Link to='/'>Go to Home</Link>
      </div>
      <div>
        or
      </div>
      <div>
        <button onClick={openChat}>Chat with our support</button>
      </div>
      <div>
        or
      </div>
      <div>
        <Link to='/contact'>Send us an Email</Link>
      </div>
    </div>
  </CoreLayout>
)

export default NotFound
