// actions type constants

export const SET_USER_DATA = 'SET_USER_DATA';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

// Set User data

export const setUserProfile = user => ({
  type: SET_USER_DATA,
  username: user.displayName,
  email: user.email,
});

// Update User profile

export const handleUpdateUserProfile = (prop, val) => ({
  type: UPDATE_USER_DATA,
  propToUpdate: prop,
  valueToSet: val,
});

// Clear User data

export const clearUserProfile = () => ({
  type: CLEAR_USER_DATA,
});
