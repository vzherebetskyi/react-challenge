import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from '../actions/notifications';

const initialState = {
  notification: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: action.notification,
      };
    case HIDE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};
