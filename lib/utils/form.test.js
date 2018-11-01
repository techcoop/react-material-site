import { getFormData, getFormConfig, getFormMessages } from './form';
describe('form :: getFormData', () => {
  it('should return a value for a text input', () => {
    let form = document.createElement('form');
    let input = document.createElement('input');
    input.type = 'text';
    input.name = 'text-input';
    input.value = 'text-value';
    form.appendChild(input);
    const data = getFormData(form);
    expect(data[input.name]).toEqual(input.value);
  });
  it('should return a value for a checkbox when checked', () => {
    let form = document.createElement('form');
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'checkbox-input';
    input.value = 'checkbox-value';
    input.checked = true;
    form.appendChild(input);
    const data = getFormData(form);
    expect(data[input.name]).toEqual(input.value);
  });
  it('should return undefined for a checkbox when unchecked', () => {
    let form = document.createElement('form');
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'checkbox-input';
    input.value = 'checkbox-value';
    input.checked = false;
    form.appendChild(input);
    const data = getFormData(form);
    expect(data[input.name]).toEqual(undefined);
  });
  it('should return the selected item for a radio', () => {
    let form = document.createElement('form');
    let input1 = document.createElement('input');
    input1.type = 'radio';
    input1.name = 'checkbox-input';
    input1.value = 'checkbox-value1';
    form.appendChild(input1);
    let input2 = document.createElement('input');
    input2.type = 'radio';
    input2.name = 'checkbox-input';
    input2.value = 'checkbox-value2';
    input2.checked = true;
    form.appendChild(input2);
    const data = getFormData(form);
    expect(data[input1.name]).toEqual(input2.value);
  });
  it('should return the selected item for a radio', () => {
    let form = document.createElement('form');
    let input1 = document.createElement('input');
    input1.type = 'radio';
    input1.name = 'radio-input';
    input1.value = 'radio-value1';
    form.appendChild(input1);
    let input2 = document.createElement('input');
    input2.type = 'radio';
    input2.name = 'radio-input';
    input2.value = 'radio-value2';
    input2.checked = true;
    form.appendChild(input2);
    const data = getFormData(form);
    expect(data[input1.name]).toEqual(input2.value);
  });
  it('should return the selected item for a select', () => {
    let form = document.createElement('form');
    let select = document.createElement('select');
    select.name = 'select-input';
    let option1 = document.createElement('option');
    option1.value = 'select-value1';
    option1.innerText = 'Select Value 1';
    select.appendChild(option1);
    let option2 = document.createElement('option');
    option2.value = 'select-value2';
    option2.innerText = 'Select Value 2';
    option2.selected = true;
    select.appendChild(option2);
    form.appendChild(select);
    const data = getFormData(form);
    expect(data[select.name]).toEqual(option2.value);
  });
  it('should return the selected items for a multi-select', () => {
    let form = document.createElement('form');
    let select = document.createElement('select');
    select.name = 'select-multiple-input';
    select.multiple = true;
    let option1 = document.createElement('option');
    option1.value = 'select-value1';
    option1.innerText = 'Select Value 1';
    select.appendChild(option1);
    let option2 = document.createElement('option');
    option2.value = 'select-value2';
    option2.innerText = 'Select Value 2';
    option2.selected = true;
    select.appendChild(option2);
    let option3 = document.createElement('option');
    option3.value = 'select-value3';
    option3.innerText = 'Select Value 3';
    option3.selected = true;
    select.appendChild(option3);
    form.appendChild(select);
    const data = getFormData(form);
    expect(data[select.name]).toEqual([option2.value, option3.value]);
  });
});
describe('form :: getFormConfig', () => {
  it('should throw a TypeError if there is no id passed', () => {
    expect(() => getFormConfig().toThrow(TypeError));
  });
  it('should throw a RangeError if the id passed does not exist', () => {
    expect(() => getFormConfig('form', undefined, {}).toThrow(RangeError));
  });
  it('should throw a RangeError if the form contains no action', () => {
    expect(() => getFormConfig('form', undefined, {
      form: {}
    }).toThrow(RangeError));
  });
  it('should return a form config containing an action and default type of form', () => {
    const action = 'http://test';
    const config = getFormConfig('form', undefined, {
      form: {
        action: action
      }
    });
    expect(config.action).toEqual(action);
    expect(config.type).toEqual('form');
  });
  it('should return a form config containing with overridden type', () => {
    const config = getFormConfig('form', undefined, {
      form: {
        action: 'http://test',
        type: 'json'
      }
    });
    expect(config.type).toEqual('json');
  });
  it('should return a form config with global success and error messages translated', () => {
    const form = {
      action: 'http://test',
      success: {
        global: {
          en: 'English Success'
        }
      },
      error: {
        global: {
          en: 'English Error'
        }
      }
    };
    const config = getFormConfig('form', 'en', {
      form: form
    });
    expect(config.success.global).toEqual('English Success');
    expect(config.error.global).toEqual('English Error');
  });
  it('should return config messages along with other values', () => {
    const form = {
      action: 'http://test',
      success: {
        global: {
          en: 'English Success'
        },
        hide: true
      },
      error: {
        global: {
          en: 'English Error'
        },
        hide: true
      }
    };
    const config = getFormConfig('form', 'en', {
      form: form
    });
    expect(config.success.global).toEqual('English Success');
    expect(config.success.hide).toEqual(true);
    expect(config.error.global).toEqual('English Error'); //expect(config.error.hide).toEqual(true)
  });
});
describe('form :: getFormMessages', () => {
  it('should return undefined when passed no data', () => {
    const messages = getFormMessages(undefined);
    expect(messages).toEqual(undefined);
  });
  it('should return a translated message when passed data for global, top, and bottom', () => {
    const data = {
      global: {
        en: 'global-en',
        fr: 'global-fr'
      },
      top: {
        en: 'top-en',
        fr: 'top-fr'
      },
      bottom: {
        en: 'bottom-en',
        fr: 'bottom-fr'
      }
    };
    const messages = getFormMessages(data, 'fr');
    expect(messages.global).toEqual(data.global.fr);
    expect(messages.top).toEqual(data.top.fr);
    expect(messages.bottom).toEqual(data.bottom.fr);
  });
  it('should return a translated message when passed data for custom type', () => {
    const data = {
      custom: {
        en: 'custom-en',
        fr: 'custom-fr'
      }
    };
    const messages = getFormMessages(data, 'fr', ['custom']);
    expect(messages.custom).toEqual(data.custom.fr);
  });
});