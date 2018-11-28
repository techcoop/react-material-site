import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import Socials from '../Socials'
import { Grid, GridCell } from '../Grid'
import Content from '../Content'
import { getLabel } from '../../utils/content'
import Link from '../Link'

import './FooterMenu.scss'

const menuItems = (sections, language) => {
  let items = []
  
  if (sections) {
    sections.forEach((section, index) => {
      if ((section.show && !section.show()) || section.items.length === 0) {
        items.push(<div key={index} />)
        return
      }
      
      items.push(
        <div key={index} className='tc-footer__menu-section'>
          {section.items.map((item, index) => (
            <div key={index}><Link to={item.route}>{getLabel(item.label, language)}</Link></div>
          ))}
        </div>
      )
    })
  }
  
  return items
}

// TODO make extensible with support for passing child elements?
// TODO display site URLs from menu items in columns of links, configurable
export const FooterMenu = props => (
  <footer className={cN('tc-footer', props.className)} style={props.style}>
    <div className='tc-footer__bottom'>
      <Grid>
        <GridCell span='4' className='tc-footer__left'>
          {(props.socials && props.socialsLocation === 'left' && props.socialsAlignment === 'top') && <Socials items={props.socials} />}
    
          {props.leftSections && <div className='tc-footer__menu-section'>{menuItems(props.leftSections, props.language)}</div>}
          
          {(props.socials && props.socialsLocation === 'left' && props.socialsAlignment === 'bottom') && <Socials items={props.socials} />}
        </GridCell>

        <GridCell span='4' className='tc-footer__middle'>
          {(props.socials && props.socialsLocation === 'middle' && props.socialsAlignment === 'top') && <Socials items={props.socials} />}

          {props.middleSections && <div className='tc-footer__menu-section'>{menuItems(props.middleSections, props.language)}</div>}

          {(props.socials && props.socialsLocation === 'middle' && props.socialsAlignment === 'bottom') && <Socials items={props.socials} />}
        </GridCell>

        <GridCell span='4' className='tc-footer__right'>
          {(props.socials && props.socialsLocation === 'right' && props.socialsAlignment === 'top') && <Socials items={props.socials} />}
          
          {props.rightSections && <div className='tc-footer__menu-section'>{menuItems(props.rightSections, props.language)}</div>}

          <Content use='caption' tag='span' className='tc-footer__copyright'>
            Copyright &copy; {props.name} {props.year}
          </Content>

          {(props.socials && props.socialsLocation === 'right' && props.socialsAlignment === 'bottom') && <Socials items={props.socials} />}
        </GridCell>
      </Grid>
    </div>
  </footer>
)

FooterMenu.defaultProps = {
  language: 'en',
  name: (window && window.location ? window.location.hostname : ''),
  year: (new Date()).getFullYear(),
  socialsLocation: 'left',
  socialsAlignment: 'top'
}

FooterMenu.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  leftSections: PropTypes.array,
  middleSections: PropTypes.array,
  rightSections: PropTypes.array,
  socials: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  socialsLocation: PropTypes.oneOf(['left', 'middle', 'right']),
  socialsAlignment: PropTypes.oneOf(['top', 'bottom'])
}

export default FooterMenu
