import { getLabel } from './content'

// Returns an object of form values from a form
// TODO browser support for FormData object is awful, have to do this by hand for now
// TODO improve test coverage
// Original source: https://codepen.io/jlengstorf/pen/YWJLwz?editors=0010#0
export const getFormData = (form) => [].reduce.call(form.elements, (data, element) => {
  // Check if element has a name and value
  if (element.name && element.value) {
    // If element is a checkbox
    if (element.type === 'checkbox') {
      if (element.checked) {
        data[element.name] = true 
      } else {
        data[element.name] = false
      }
      // TODO re-examine, returns an array
      //data[element.name] = (data[element.name] || []).concat(element.value)
    } else if (element.type === 'radio') {
      if (element.checked) {
        data[element.name] = element.value 
      }
    } else if (element.options && element.multiple) {
      // If element is a multiselect, extract selected options
      data[element.name] = [].reduce.call(element.options, (values, option) => {
        return option.selected ? values.concat(option.value) : values
      }, [])
    } else {
      // All other field types just assign
      data[element.name] = element.value
    }
  }

  const explode = element.getAttribute('data-explode')
  if (data[element.name] && explode) {
    data[element.name] = data[element.name].split(explode)
  }

  return data
}, {})

// Gets a form action for an id
export const getFormConfig = (id, language, forms = {}) => {
  if (!id) {
    throw new TypeError('You must pass an id to get form action')
  }
  
  if (!forms[id]) {
    throw new RangeError('Could not find a form for id: ' + id)
  }
  
  let form = {}
  if (forms[id].success) {
    form.success = Object.assign({}, forms[id].success, getFormMessages(forms[id].success, language))
  }

  if (forms[id].error) {
    form.error = Object.assign({}, forms[id].error, getFormMessages(forms[id].error, language))
  }

  return Object.assign({type: 'form'}, forms[id], {action: forms[id].action ? forms[id].action.replace('%%API_URL%%', process.env.API_URL) : undefined}, form)
}

export const getFormMessages = (data, language, types = ['global', 'top', 'bottom']) => {
  if (!data) {
    return undefined
  }

  const messages = {}
  types.forEach((item) => {
    if (data[item]) {
      messages[item] = getLabel(data[item], language)
    }
  })

  return messages
}