import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../firebase/firebase';
import { handleShowNotification } from './notifications';
import { setUserProfile, clearUserProfile } from './userProfile';

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
