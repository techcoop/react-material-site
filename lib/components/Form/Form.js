function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames'; // TODO refactor, include form elements individually

import { FormField } from '@rmwc/formfield';
import { TextField, TextFieldHelperText } from '@rmwc/textfield';
import { Checkbox } from '@rmwc/checkbox';
import { Switch } from '@rmwc/switch';
import { Radio } from '@rmwc/radio';
import { Select } from '@rmwc/select';
import { Slider } from '@rmwc/slider';
import { Button } from '@rmwc/button';
import Message from '../Message';
import { LinearProgress } from '@rmwc/linear-progress';
import { getLabel } from '../../utils/content';
import './Form.scss'; // TODO fix warning from error on missing label (only on text, textarea, select)
// TODO warning: MDCFormField failed to initialize because of the following error: TypeError: Cannot read property 'addEventListener' of null
// TODO implement helpertext is undefined TextFieldHelperText
// TODO fix textarea disabled state doesn't work?
// TODO fix slider
// TODO slider doesn't drag
// TODO fix FormField styles for not displaying inline
// TODO implement icon for textfields
// TODO fix bit of a weird case with loading, a form can't be loading if it's disabled? way this is setup it could invert a disabled field?
// TODO improve loading indicator, configurable position?
// TODO fullwidth seems to mess up the position of text, fixing with css for now
// TODO add hardcoded hidden field for language to any forms that have it?
// TODO reconsider adding form action as data, need to be able to override config, but needs to work with default
// TODO make method passing with native attribute?
// TODO migrate to local component Button
// TODO support for field icons

export const Form = props => React.createElement("form", {
  "data-form-id": props.id,
  "data-method": props.method,
  method: props.method,
  "data-action": props.action,
  action: props.action,
  onSubmit: props.onSubmit ? props.onSubmit : e => {
    e.preventDefault();
  },
  className: cN('tc-form', props.className),
  style: props.style
}, props.message && props.message.location === 'top' && React.createElement(Message, props.message), !props.hide && Object.keys(props.fields).map(name => {
  const type = props.fields[name].type;
  const helper = getLabel(props.fields[name].helper, props.language);
  const label = getLabel(props.fields[name].label, props.language);
  const value = props.data[name] ? props.data[name] : '';
  const field = Object.assign({}, props.fields[name], {
    type: undefined,
    helper: undefined,
    label: label
  });
  return React.createElement(FormField, {
    key: name,
    style: props.fieldStyle,
    className: props.fieldClassName
  }, (type === 'radio' || type === 'slider') && React.createElement("label", null, label), type === 'text' && React.createElement(TextField, _extends({
    "data-form-id": props.id,
    name: name,
    value: value,
    onChange: props.onChange
  }, field, {
    disabled: props.loading,
    onInvalid: e => {
      if (field.error) {
        e.target.setCustomValidity(getLabel(field.error, props.language));
      }
    }
  })), type === 'textarea' && React.createElement(TextField, _extends({
    "data-form-id": props.id,
    textarea: true,
    name: name,
    value: value,
    onChange: props.onChange,
    fullwidth: true
  }, field, {
    disabled: props.loading,
    onInvalid: e => {
      if (field.error) {
        e.target.setCustomValidity(getLabel(field.error, props.language));
      }
    }
  })), type === 'checkbox' && React.createElement(Checkbox, _extends({
    "data-form-id": props.id,
    name: name,
    checked: value,
    onChange: props.onChange
  }, field, {
    disabled: props.loading
  })), type === 'switch' && React.createElement(Switch, _extends({
    "data-form-id": props.id,
    name: name,
    checked: value,
    onChange: props.onChange
  }, field, {
    disabled: props.loading
  })), type === 'radio' && field.options && Object.keys(field.options).map((option, index) => React.createElement(Radio, {
    "data-form-id": props.id,
    key: index,
    label: field.options[option],
    name: name,
    value: option,
    onChange: props.onChange,
    checked: option === value,
    style: field.style,
    className: field.className,
    disabled: props.loading
  })), type === 'select' && React.createElement(Select, _extends({
    "data-form-id": props.id,
    name: name,
    onChange: props.onChange,
    value: value
  }, field, {
    disabled: props.loading
  })), type === 'slider' && React.createElement(Slider, _extends({
    "data-form-id": props.id,
    name: name,
    onChange: props.onChange,
    value: value
  }, field, {
    disabled: props.loading
  })), type === 'file' && React.createElement("input", {
    type: "file",
    "data-form-id": props.id,
    name: name,
    onChange: props.onChange,
    value: value,
    disabled: props.loading
  }), helper && React.createElement(TextFieldHelperText, {
    persistent: true,
    validationMsg: true
  }, helper), (type === 'hidden' || type === 'text' || type === 'file' || type === 'textarea' || type === 'select') && React.createElement("label", {
    style: {
      display: 'none'
    }
  }));
}), props.message && props.message.location === 'bottom' && React.createElement(Message, props.message), !props.hide && props.submitShow && React.createElement(Button, _extends({}, props.submitProps, {
  disabled: props.loading
}), getLabel(props.submitLabel, props.language)), props.loading && React.createElement(LinearProgress, {
  determinate: false
}), !props.loading && React.createElement("div", {
  style: {
    height: '5px'
  }
}));
Form.propTypes = {
  // Required form values
  id: PropTypes.string,
  action: PropTypes.string,
  method: PropTypes.string,
  // Optional form styling
  className: PropTypes.string,
  style: PropTypes.object,
  // Function handlers
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  // Data, field, and language settings
  data: PropTypes.object,
  fields: PropTypes.object,
  language: PropTypes.string,
  // Submit button configuration
  submitShow: PropTypes.bool,
  submitLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  submitProps: PropTypes.object,
  submitIndicator: PropTypes.bool,
  // Form fields styling
  fieldClassName: PropTypes.string,
  fieldStyle: PropTypes.object,
  loading: PropTypes.bool,
  message: PropTypes.object,
  error: PropTypes.string,
  errors: PropTypes.array
};
Form.defaultProps = {
  // Submit button configuration
  submitShow: true,
  submitLabel: 'Submit',
  submitProps: {
    raised: true
  },
  submitIndicator: true,
  // Form fields styling
  fieldClassName: 'tc-form__field',
  fieldStyle: {
    display: 'block'
  },
  // Data, field, and language settings
  data: {},
  fields: {},
  language: '',
  loading: false,
  error: '',
  errors: []
};
export default Form;