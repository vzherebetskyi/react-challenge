import { loginUser, logoutUser, handleChangeEmail } from '../../actions/auth';

test('should set up login object', () => {
  const action = loginUser('sdfkj12NddsMM234HjkLpp9i');
  expect(action).toEqual({
    type: 'LOGIN_USER',
    userId: 'sdfkj12NddsMM234HjkLpp9i',
  });
});

test('should set up logout object', () => {
  const action = logoutUser();
  expect(action).toEqual({
    type: 'LOGOUT_USER',
  });
});

test('should set up changeemail object', () => {
  const action = handleChangeEmail('testemail@test.com');
  expect(action).toEqual({
    type: 'CHANGE_EMAIL',
    email: 'testemail@test.com',
  });
});
