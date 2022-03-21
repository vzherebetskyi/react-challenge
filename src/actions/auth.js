import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { auth } from '../firebase/firebase';
import { handleShowNotification } from './notifications';
import {
  handleUpdateUserProfile,
  setUserProfile,
  clearUserProfile,
} from './userProfile';

// actions type constants

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const CHANGE_EMAIL = 'CHANGE_EMAIL';

// Login User

export const loginUser = userId => ({
  type: LOGIN_USER,
  userId,
});

export const startLoginUser = (email, password) => {
  return dispatch => {
    return () => {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          console.log('success', userCredential);
          dispatch(loginUser(userCredential.user.uid));
          dispatch(setUserProfile(userCredential.user));
        })
        .catch(error => {
          console.log(error.message);
          dispatch(handleShowNotification(error.message));
        });
    };
  };
};

// Sign up user

export const startUserSignup = (username, email, password) => {
  return dispatch => {
    return () => {
      dispatch(handleShowNotification('Pls wait you are being signed up'));
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          console.log('success', userCredential);
          dispatch(handleShowNotification('Signed up successfully'));

          return updateProfile(auth.currentUser, {
            displayName: username,
          });
        })
        .then(() => {
          console.log('User profile successfully updated');
          dispatch(
            handleUpdateUserProfile('username', auth.currentUser.displayName)
          );
        })
        .catch(error => {
          console.log(error.message);
          dispatch(handleShowNotification(error.message));
        });
    };
  };
};

// Logout User

export const startLogoutUser = () => {
  return dispatch => {
    return () => {
      signOut(auth)
        .then(() => {
          console.log('logout success');
          dispatch(clearUserProfile);
          dispatch(logoutUser());
        })
        .catch(error => {
          console.log(error.message);
          dispatch(handleShowNotification(error.message));
        });
    };
  };
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

// Change email

export const handleChangeEmail = email => {
  return {
    type: CHANGE_EMAIL,
    email,
  };
};
