import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import AppRouter, { history } from './router/AppRouter';
import NotificationWrapper from './hoc/NotificationWrapper';
import configureStore from './store/configureStore';
import { loginUser, logoutUser } from './actions/auth';
import { setUserProfile, clearUserProfile } from './actions/userProfile';
import LoadingPage from './components/LoadingPage';
import { auth } from './firebase/firebase';
import './styles/styles.scss';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <NotificationWrapper>
      <AppRouter />
    </NotificationWrapper>
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(<App />, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

onAuthStateChanged(auth, user => {
  if (user) {
    store.dispatch(loginUser(user.uid));
    store.dispatch(setUserProfile(user));
    renderApp();
    if (history.location.pathname !== '/dashboard') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logoutUser(auth));
    store.dispatch(clearUserProfile());
    renderApp();
  }
});

//refactor codebase
// add tests
