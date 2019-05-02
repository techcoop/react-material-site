import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'

import Center from 'react-material-site/lib/components/Center'

import { Typography } from '@rmwc/typography'
import { CircularProgress } from '@rmwc/circular-progress'

import '@rmwc/circular-progress/circular-progress.css'
import './LogoLoader.scss'

export const LogoLoader = props => (
  <Center className={cN('tc-logo-loader', props.className)} style={Object.assign({}, props.style, {height: '300px', width: '300px'})}>
    <Typography use='headline5' tag='div' style={{textAlign: 'center'}}>{props.label}</Typography>
    <div style={{textAlign: 'center', paddingTop: '15px'}}>
      <CircularProgress size={72} />
    </div>
  </Center>
)

LogoLoader.defaultProps = {
  label: 'Loading...'
}

LogoLoader.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string
}

export default LogoLoader
