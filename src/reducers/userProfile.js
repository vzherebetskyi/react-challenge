import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  UPDATE_USER_DATA,
} from '../actions/userProfile';

const initialState = {
  username: '',
  email: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        username: action.username,
        email: action.email,
      };
    case CLEAR_USER_DATA:
      return initialState;
    case UPDATE_USER_DATA:
      return {
        ...state,
        [action.propToUpdate]: action.valueToSet,
      };
    default:
      return state;
  }
};
