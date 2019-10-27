import * as actionTypes from '../actions/actionTypes';

let owner = JSON.parse(localStorage.getItem('owner'));
const initialState = owner ? { loggedIn: true, owner } : {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        owner: action.owner
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        owner: action.owner
      };
    case actionTypes.LOGIN_FAILURE:
      return {};
    case actionTypes.LOGOUT:
      return {};
    default:
      return state
  }
}

export default reducer;