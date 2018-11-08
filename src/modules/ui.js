import { getSupportedLanguages, getLanguage, getMessage } from '../utils/content'

// ------------------------------------
// Constants
// ------------------------------------
export const UI_CHANGE = 'UI_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------

// Adds an message to redux for display on the UI
export function messageChange (message) {
  return {
    type    : UI_CHANGE,
    payload : {message: message ? message : ''}
  }
}

// Resets the message to empty
export const messageReset = () => {
  return {
    type    : UI_CHANGE,
    payload : {message: ''}
  }
}

// Loading handling
export function loadingChange (loading) {
  return {
    type    : UI_CHANGE,
    payload : {loading: loading}
  }
}

// Changes UI state
export function uiChange (params) {
  return {
    type    : UI_CHANGE,
    payload : params
  }
}

// Creates an interface message by key
export const interfaceMessage = (key) => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(globalMessage(getMessage(key, getState().ui.language, state.content.ui)))
  }
}

// Creates a global message
export const globalMessage = (message) => {
  return (dispatch) => {
    dispatch(messageChange(message))
  }
}

// Reset a global message
export const globalMessageReset = () => {
  return (dispatch) => {
    dispatch(messageReset())
  }
}

// Changes UI language
export const languageUpdate = (language) => {
  return (dispatch) => {
    localStorage.setItem('language', language)
    dispatch(uiChange({language: language }))
  }
}

// Toggles drawer menu state
export const drawerToggle = () => {
  return (dispatch, getState) => {
    dispatch(uiChange({drawerOpen: !getState().ui.drawerOpen}))
  }
}

// Opens drawer menu
export const drawerOpen = () => {
  return uiChange({drawerOpen: true})
}

// Closes drawer menu
export const drawerClose = () => {
  return uiChange({drawerOpen: false})
}

// Updates state of drawer menu
export const drawerUpdate = (params) => {
  return uiChange(params)
}

export const actions = {
  languageUpdate,
  drawerUpdate,
  drawerToggle,
  drawerOpen,
  drawerClose
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UI_CHANGE] : (state, action) => Object.assign({}, state, action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
const supportedLanguages = getSupportedLanguages()
const language = localStorage.getItem('language')
const initialState = {
  languages: supportedLanguages,
  language: language ? language : getLanguage(supportedLanguages),
  loading: false,
  message: '',
  drawerOpen: false,
  drawerMaximized: false
}

export default function uiReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  
  // TODO refactor this handling at some point
  if (action.type === '@@router/LOCATION_CHANGE' && state.drawerOpen && !state.drawerMaximized) {
    state.drawerOpen = false
  }

  return handler ? handler(state, action) : state
}
