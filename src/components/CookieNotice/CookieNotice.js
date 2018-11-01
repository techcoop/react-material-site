import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import Content from '../Content'
import Button from '../Button'

import './CookieNotice.scss'

const showNotice = (key) => {
  return document.cookie.indexOf(`${key}=1`) === -1
}

const acceptNotice = (key, days) => {
  const date = new Date()
  date.setTime(date.getTime() + (86400000 * days))
  document.cookie = `${key}=1; expires=${date.toUTCString()}; path=/`
}

// TODO would nice to animate close
export const CookieNotice = props => (
  showNotice(props.acceptKey) ?
    <div id={props.acceptKey} className={cN('tc-cookie-notice', props.className)} style={props.style}>
      <Content
        header={props.title}
        headerType='headline6'
        body={props.message}
        bodyType='body2'
        bodyStyle={{padding: '10px 0'}}
      />

      <div className='tc-cookie-notice__toolbar'>
        {props.policyText && props.policyUrL && 
          <Button text={props.policyText} to={props.policyUrL} style={props.policyStyle} />}
        
        <Button 
          text={props.acceptText}
          style={props.acceptStyle}
          onClick={() => {
            // TODO add state to component instead of this
            const element = window.document.getElementById(props.acceptKey)
            element.style.display = 'none'
            acceptNotice(props.acceptKey, props.acceptDays)
          }}
          />
      </div>
    </div> : null
)

CookieNotice.defaultProps = {
  title: 'Cookie Notice',
  message: 'We use cookies for analytics and to improve our site, and by continuing to use this site, you agree to our use of cookies. You can read more information on our cookie policy.',
  
  acceptText: 'Accept',
  acceptStyle: {color: 'white', position: 'absolute', right: '0.5em'},
  acceptKey: '__cookie_policy_accept',
  acceptDays: 365,

  policyText: 'Read More',
  policyStyle: {color: 'white'},
  policyUrL: '/cookies'
}

CookieNotice.propTypes = {
  title: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  message: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  
  acceptText: PropTypes.string,
  acceptStyle: PropTypes.object,
  acceptKey: PropTypes.string,
  acceptDays: PropTypes.number,
  
  policyText: PropTypes.string,
  policyStyle: PropTypes.object,
  policyUrL: PropTypes.string,

  style: PropTypes.object,
  className: PropTypes.string,
}

export default CookieNotice
