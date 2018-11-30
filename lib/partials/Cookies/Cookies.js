import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames';
import Content from '../../components/Content';
import Table from '../../components/Table';
import { getLabel } from '../../utils/content';
import './Cookies.scss'; // ********** WARNING
// The use of this partial does not constitute legal advice but instead is intended as a starting place and placeholder

export const Cookies = props => React.createElement("div", {
  className: cN('tc-cookies', props.className),
  style: props.style
}, props.content['page title'] && React.createElement(Content, {
  className: "tc-cookies__title",
  headerType: "headline4",
  header: getLabel(props.content['page title'], props.language)
}), props.content['introduction'] && React.createElement(Content, {
  className: "tc-cookies__text",
  body: getLabel(props.content['introduction'], props.language)
}), props.content['cookie title'] && React.createElement(Content, {
  className: "tc-cookies__header",
  headerType: "headline6",
  header: getLabel(props.content['cookie title'], props.language)
}), props.content['cookies'] && React.createElement(Table, {
  wrap: true,
  className: "tc-cookies__table",
  fields: {
    name: {
      label: 'Name',
      style: {
        width: '100px'
      }
    },
    description: {
      label: 'Description',
      style: {
        width: '150px'
      }
    },
    duration: {
      label: 'Duration',
      style: {
        width: '50px'
      }
    }
  },
  data: getLabel(props.content['cookies'], props.language)
}), props.content['storage title'] && React.createElement(Content, {
  className: "tc-cookies__header",
  headerType: "headline6",
  header: getLabel(props.content['storage title'], props.language)
}), props.content['storage'] && React.createElement(Table, {
  wrap: true,
  className: "tc-cookies__table",
  fields: {
    name: {
      label: 'Name',
      style: {
        width: '100px'
      }
    },
    description: {
      label: 'Description',
      style: {
        width: '150px'
      }
    },
    duration: {
      label: 'Duration',
      style: {
        width: '50px'
      }
    }
  },
  data: getLabel(props.content['storage'], props.language)
}), props.content['privacy'] && React.createElement(Content, {
  className: "tc-cookies__text",
  body: getLabel(props.content['privacy'], props.language)
}));
Cookies.defaultProps = {
  language: 'en',
  content: {}
};
Cookies.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  language: PropTypes.string,
  content: PropTypes.object
};
export default Cookies;