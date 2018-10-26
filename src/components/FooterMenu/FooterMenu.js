import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import Socials from '../Socials'
import { Grid, GridCell } from '../Grid'
import Content from '../Content'

import './FooterMenu.scss'

// TODO make extensible with support for passing child elements?
// TODO display site URLs from menu items in columns of links, configurable
export const FooterMenu = (props) => (
  <footer className={cN('tc-footer', props.className)} style={props.style}>
    <div className='tc-footer__bottom'>
      <Grid>
        <GridCell span='4' className='tc-footer__socials'>
          {props.socials && <Socials items={props.socials} />}
        </GridCell>
        <GridCell span='4' className='tc-footer__caption'>
          <Content use='caption' tag='span'>
            Copyright &copy; {props.name} {props.year}
          </Content>
        </GridCell>
      </Grid>
    </div>
  </footer>
)

FooterMenu.defaultProps = {
  name: (window && window.location ? window.location.hostname : ''),
  year: (new Date()).getFullYear()
}

FooterMenu.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  socials: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

export default FooterMenu
