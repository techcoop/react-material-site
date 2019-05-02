import { interfaceMessage } from './ui'
import auth, { getUserInfo, createAuthClient } from '../utils/auth'

// ------------------------------------
// Constants
// ------------------------------------
export const AUTH_CHANGE = 'AUTH_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function authChange (params) {
  return {
    type    : AUTH_CHANGE,
    payload : params
  }
}

// Checks if authentication is enabled
export const authEnabled = (dispatch, getState) => {
  const state = getState()
  return state.auth.enabled
}

// Fetches profile information from IDP with access_token
export const fetchProfile = () => {
  return async (dispatch, getState) => {
    if (!authEnabled(dispatch, getState)) {
      return
    }
    
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      clearSession()
      return
    }
    
    await getUserInfo(auth.client, accessToken).then((profile) => {
      dispatch(authChange({ profile }))
    }, (error) => {
      clearSession()
      console.error(error)
      console.error('modules/auth :: IDP fetch profile failed with "' + error.errorDescription + '"')
      dispatch(interfaceMessage('AUTH_PROFILE_FAILED'))
    })
  }
}

// TODO need to fix the way this is implemented, does a full refresh of application
export const refreshProfile = (callback) => {
  return async (dispatch, getState) => {
    if (!authEnabled(dispatch, getState)) {
      return
    }
    
    createAuthClient({ prompt: 'none' }).authorize()
  }
}

// Triggers authorize workflow with IDP
export const login = () => {
  return (dispatch, getState) => {
    if (!authEnabled(dispatch, getState)) {
      return
    }

    if (getState().auth.isAuthenticated()) {
      return dispatch(interfaceMessage('AUTH_PROFILE_EXISTING_AUTH'))
    }
    
    auth.authorize()
    return authChange({})
  }
}

// Handle callback for authentication response from IDP
export const callback = (cb) => {
  return async (dispatch, getState) => {
    if (!authEnabled(dispatch, getState)) {
      return
    }

    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('expires_at', expiresAt)
        localStorage.setItem('picture', authResult.idTokenPayload.picture)
        dispatch(authChange({profile: authResult.idTokenPayload}))
        if (cb) {
          cb(authResult.idTokenPayload)
        }
      } else if (err) {
        console.error('modules/auth :: IDP callback failed with "' + err.errorDescription + '"')
        clearSession()
        if (cb) {
          cb()
        }
      }
    })
  }
}

// Handle logout request
export const logout = () => {
  return async () => {
    clearSession()
    const PUBLIC_HOME_ROUTE = process.env.PUBLIC_HOME_ROUTE ? process.env.PUBLIC_HOME_ROUTE : '/'
    const returnTo = `${window.location.protocol}//${window.location.host}${PUBLIC_HOME_ROUTE}`
    auth.logout({ returnTo })
  }
}

// Clears session by removing variables from localStorage
// TODO make configurable?
// TODO support other variables?
// TODO Support for cookie fallback?
const clearSession = () => {
  localStorage.removeItem('expires_at')
  localStorage.removeItem('access_token')
  localStorage.removeItem('id_token')
  localStorage.removeItem('expires_at')
  localStorage.removeItem('picture')
}

// Checks if the users session has expired
export const authenticated = () => {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}

export const actions = {
  login,
  logout,
  callback
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [AUTH_CHANGE] : (state, action) => Object.assign({}, state, action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  enabled: auth !== undefined,
  isAuthenticated: authenticated,
  settings: {},
  profile: {
    picture: localStorage.getItem('picture')
  }
}

export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
