import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import AuthReducer from '../reducers/auth';
import NotificationsReducer from '../reducers/notifications';
import UserProfileReducer from '../reducers/userProfile';

export default () => {
  const store = createStore(
    combineReducers({
      auth: AuthReducer,
      notif: NotificationsReducer,
      userProf: UserProfileReducer,
    }),
    applyMiddleware(thunk)
  );

  return store;
};
