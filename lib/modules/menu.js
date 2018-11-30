// ------------------------------------
// Constants
// ------------------------------------
export const MENU_CHANGE = 'MENU_CHANGE'; // ------------------------------------
// Actions
// ------------------------------------

export function menuChange(params) {
  return {
    type: MENU_CHANGE,
    payload: params
  };
}
export const updateMenu = menu => {
  return dispatch => {
    dispatch(menuChange(menu));
  };
};
export const actions = {}; // ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {}; // ------------------------------------
// Reducer
// ------------------------------------

const initialState = {};
export default function menuReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}