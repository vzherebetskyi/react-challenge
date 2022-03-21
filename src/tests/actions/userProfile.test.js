import {
  setUserProfile,
  handleUpdateUserProfile,
  clearUserProfile,
} from '../../actions/userProfile';

test('should set up setuserprofile object', () => {
  const action = setUserProfile({
    displayName: 'test',
    email: 'test@test.com',
  });
  expect(action).toEqual({
    type: 'SET_USER_DATA',
    username: 'test',
    email: 'test@test.com',
  });
});

test('should set up updateuserprofile object', () => {
  const action = handleUpdateUserProfile('email', 'test2@test.com');
  expect(action).toEqual({
    type: 'UPDATE_USER_DATA',
    propToUpdate: 'email',
    valueToSet: 'test2@test.com',
  });
});

test('should set up clearuserprofile object', () => {
  const action = clearUserProfile();
  expect(action).toEqual({
    type: 'CLEAR_USER_DATA',
  });
});
