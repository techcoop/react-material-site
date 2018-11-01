import { replace } from 'react-router-redux';
import { globalMessage } from './ui';
import { getFormConfig, getFormData } from '../utils/form';
import { Xhr } from '../utils/xhr'; // ------------------------------------
// Constants
// ------------------------------------

export const FORM_UPDATE = 'FORM_UPDATE'; // ------------------------------------
// Actions
// ------------------------------------

export const formUpdate = params => {
  return {
    type: FORM_UPDATE,
    payload: params
  };
};
export const formSubmit = event => {
  return (dispatch, getState) => {
    event.preventDefault();
    const form = event.target;
    const formId = form.getAttribute('data-form-id');
    const action = form.getAttribute('data-action');
    const method = form.getAttribute('data-method'); // Check that this form is valid
    // TODO determine cases where getting to this function is actually possible in submit handler
    // TODO decide what should happen in browser does not support checkValidity

    if (!form.checkValidity && !form.checkValidity()) {
      console.error('actions/form :: formSubmit your form is not valid');
      return;
    }

    if (!formId) {
      console.error('actions/form :: formSubmit requires a form id to function, check your <Form /> component');
      return;
    } // TODO make success and error actions available with form props


    const formConfig = {};

    if (action) {
      formConfig.action = action;
    }

    if (method) {
      formConfig.method = method;
    }

    const state = getState();
    const config = Object.assign({
      method: 'POST'
    }, getFormConfig(formId, state.ui.language, state.content.forms), formConfig);

    if (!config.action) {
      console.error('actions/form :: formSubmit requires an action to perform');
      return;
    } // TODO find better solution for handle case of posting a form as an object
    // TODO consider using redux state, but then how to create form for endpoints requiring it? or uncontrolled forms?


    let data = form;

    if (config.type === 'object') {
      data = getFormData(data);
      config.type = 'form';
    }

    if (config.type === 'json') {
      data = getFormData(data);
    }

    let formState;

    if (state.form[formId] && state.form[formId].data) {
      formState = state.form[formId].data;
    }

    dispatch(formUpdate({
      [formId]: {
        loading: true,
        data: formState
      }
    }));
    const promise = Xhr(config.action, data, {
      type: config.type,
      method: config.method
    });
    let actions, result; // TODO need way to handle custom errors that return 200

    promise.then(resolve => {
      // If no success config, reset loading bool and form state
      if (!config.success) {
        dispatch(formUpdate({
          [formId]: {
            loading: false
          }
        }));
      }

      result = 'success';
      actions = config.success;
    }, error => {
      // Catch and output error to console
      console.error('actions/form :: formSubmit had an error while submitting');
      console.error(error); // If no error config, reset loading bool but keep form state

      if (!config.error) {
        dispatch(formUpdate({
          [formId]: {
            loading: false,
            data: formState
          }
        }));
      }

      result = 'error';
      actions = config.error;
    }).then(() => {
      // Handle success actions from config
      if (!actions || !result) {
        return;
      }

      const formState = {
        loading: false // Handle clearing form or not by putting form data back into state

      };

      if (!actions.clear) {
        formState.data = formState;
      } // Hide form is this action is set
      // TODO can improve handling here, setting bool directly allows setting a string in json or something, but weird?


      if (actions.hide) {
        formState.hide = true;
      } // Handle redirect if set
      // TODO detect if redirect is offsite and window.href instead?


      if (actions.redirect) {
        dispatch(replace(actions.redirect));
      } // Display global message


      if (actions.global) {
        dispatch(globalMessage(actions.global));
      } // TODO fix presently can't use both top and bottom message


      if (actions.top) {
        formState.message = {
          location: 'top',
          value: actions.top,
          className: `tc-message_${result}`
        };
      }

      if (actions.bottom) {
        formState.message = {
          location: 'bottom',
          value: actions.bottom,
          className: `tc-message_${result}`
        };
      } // Resets message state


      if (!formState.message) {
        formState.message = {};
      } // Update form state with all actions handled


      dispatch(formUpdate({
        [formId]: formState
      }));
    });
  };
};
export const formChange = event => {
  return (dispatch, getState) => {
    const state = getState().form;
    const formId = event.target.getAttribute('data-form-id');

    if (!formId) {
      console.error('actions/form :: formChange requires a form id to function, check your <Form /> component');
      return;
    }

    let formState = state[formId];

    if (!formState) {
      formState = newFormState();
    }

    if (event.type === 'MDCSlider:change' && event.detail.props.name) {
      formState.data[event.detail.props.name] = event.detail.props.value;
    } else if (event.target.type === 'checkbox') {
      if (event.target.checked) {
        formState.data[event.target.name] = event.target.value;
      } else {
        formState.data[event.target.name] = undefined;
      }
    } else {
      formState.data[event.target.name] = event.target.value;
    }

    dispatch(formUpdate({
      [formId]: formState
    }));
  };
};
export const actions = {
  formSubmit,
  formChange // ------------------------------------
  // Action Handlers
  // ------------------------------------

};
const ACTION_HANDLERS = {
  [FORM_UPDATE]: (state, action) => Object.assign({}, state, action.payload) // ------------------------------------
  // Reducer
  // ------------------------------------

};

const newFormState = () => {
  return {
    loading: false,
    hide: false,
    message: {},
    data: {}
  };
};

const initialState = {};
export default function formReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}