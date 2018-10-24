// ------------------------------------
// Constants
// ------------------------------------
export const CONTENT_CHANGE = 'CONTENT_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function contentChange (params) {
  return {
    type    : CONTENT_CHANGE,
    payload : params
  }
}

export const updateContent = (content) => {
  return (dispatch) => {
    dispatch(contentChange(content))
  }
}


export const actions = {
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
}

export default function contentReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
