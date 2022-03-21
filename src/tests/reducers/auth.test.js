import authReducer from '../../reducers/auth';

test('should login a user', () => {
  const userId = 'rt23Tjbnb56Qgfjk78MMjjh';
  const action = {
    type: 'LOGIN_USER',
    userId,
  };
  const state = authReducer({}, action);
  expect(state).toEqual({ userId });
});

test('should logout a user', () => {
  const action = {
    type: 'LOGOUT_USER',
  };
  const state = authReducer(
    { userId: 'rt23Tjbnb56Qgfjk78MMjjh', userEmail: 'testemail@test.com' },
    action
  );
  expect(state).toEqual({ userEmail: '' });
});

test('should change an email', () => {
  const email = 'testemail@test.com';
  const action = {
    type: 'CHANGE_EMAIL',
    email,
  };
  const state = authReducer({ userEmail: '' }, action);
  expect(state).toEqual({ userEmail: 'testemail@test.com' });
});
