import { LOGIN_USER, LOGOUT_USER, CHANGE_EMAIL } from '../actions/auth';

const initialState = {
  userEmail: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userId: action.userId,
      };
    case LOGOUT_USER:
      return initialState;
    case CHANGE_EMAIL:
      return {
        ...state,
        userEmail: action.email,
      };
    default:
      return state;
  }
};
