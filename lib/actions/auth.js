import { replace } from 'react-router-redux';
import { interfaceMessage } from './ui';
import auth from '../utils/auth'; // ------------------------------------
// Constants
// ------------------------------------

export const AUTH_CHANGE = 'AUTH_CHANGE'; // ------------------------------------
// Actions
// ------------------------------------

export function authChange(params) {
  return {
    type: AUTH_CHANGE,
    payload: params
  };
} // Checks if authentication is enabled

export const authEnabled = (dispatch, getState) => {
  const state = getState();

  if (!state.auth.enabled) {
    console.error('actions/auth :: Auth not configured, check your .env file and ensure all AUTH variables are configured correctly.');
    dispatch(interfaceMessage('AUTH_NOT_ENABLED'));
  }

  return state.auth.enabled;
}; // Fetches profile information from IDP with access_token

export const fetchProfile = () => {
  return (dispatch, getState) => {
    if (!authEnabled(dispatch, getState)) {
      return;
    }

    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.error('actions/auth :: A profile fetch was attempted, but there was no access_token in localStorage.');
      return dispatch(interfaceMessage('AUTH_PROFILE_FAILED'));
    } // Fetch user profile from IDP


    auth.client.userInfo(accessToken, function (err, profile) {
      if (err) {
        clearSession();
        console.error('actions/auth :: IDP fetch profile failed with "' + err.errorDescription + '"');
        return dispatch(interfaceMessage('AUTH_PROFILE_FAILED'));
      }

      if (profile) {
        dispatch(authChange({
          profile: profile
        }));
      }
    });
  };
}; // Triggers authorize workflow with IDP

export const login = () => {
  return (dispatch, getState) => {
    if (!authEnabled(dispatch, getState)) {
      return;
    }

    if (getState().auth.isAuthenticated()) {
      return dispatch(interfaceMessage('AUTH_PROFILE_EXISTING_AUTH'));
    }

    auth.authorize();
    return authChange({});
  };
}; // Handle callback for authentication response from IDP

export const callback = () => {
  return (dispatch, getState) => {
    if (!authEnabled(dispatch, getState)) {
      return;
    }

    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('picture', authResult.idTokenPayload.picture);

        if (process.env.AUTH_HOME_ROUTE) {
          dispatch(replace(process.env.AUTH_HOME_ROUTE));
        } else {
          dispatch(replace('/'));
        }

        dispatch(authChange({
          profile: authResult.idTokenPayload
        }));
      } else if (err) {
        console.error('actions/auth :: IDP callback failed with "' + err.errorDescription + '"');
        dispatch(replace('/'));
        return dispatch(interfaceMessage('AUTH_LOGIN_FAILED'));
      }
    });
  };
}; // Handle logout request by clearing localStorage and removing session state from redux

export const logout = () => {
  return (dispatch, getState) => {
    clearSession();
    dispatch(replace('/'));
    dispatch(authChange({
      profile: {},
      settings: {}
    }));
  };
}; // Clears session by removing variables from localStorage
// TODO make configurable?
// TODO support other variables?
// TODO Support for cookie fallback?

const clearSession = () => {
  localStorage.removeItem('expires_at');
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('picture');
}; // Checks if the users session has expired


export const authenticated = () => {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
};
export const actions = {
  login,
  logout,
  callback // ------------------------------------
  // Action Handlers
  // ------------------------------------

};
const ACTION_HANDLERS = {
  [AUTH_CHANGE]: (state, action) => Object.assign({}, state, action.payload) // ------------------------------------
  // Reducer
  // ------------------------------------

};
const initialState = {
  enabled: auth !== undefined,
  isAuthenticated: authenticated,
  profile: {
    picture: localStorage.getItem('picture')
  }
};
export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}