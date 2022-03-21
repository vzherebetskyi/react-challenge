import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import notificationsReducer from '../reducers/notifications';
import userProfileReducer from '../reducers/userProfile';

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      notif: notificationsReducer,
      userProf: userProfileReducer,
    }),
    applyMiddleware(thunk)
  );

  return store;
};
