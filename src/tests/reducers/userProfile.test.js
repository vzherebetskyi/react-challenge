import userProfileReducer from '../../reducers/userProfile';

test('should set user data', () => {
  const user = {
    username: 'test',
    email: 'test@test.com',
  };
  const action = {
    type: 'SET_USER_DATA',
    ...user,
  };
  const state = userProfileReducer({}, action);
  expect(state).toEqual({ ...user });
});

test('should clear user data', () => {
  const user = {
    username: 'test',
    email: 'test@test.com',
  };
  const action = {
    type: 'CLEAR_USER_DATA',
  };
  const state = userProfileReducer({ ...user }, action);
  expect(state).toEqual({ username: '', email: '' });
});

test('should update user data', () => {
  const action = {
    type: 'UPDATE_USER_DATA',
    propToUpdate: 'username',
    valueToSet: 'Test2',
  };
  const state = userProfileReducer(
    { username: 'test', email: 'test@test.com' },
    action
  );
  expect(state).toEqual({ username: 'Test2', email: 'test@test.com' });
});
