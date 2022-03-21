import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import LoginPage from '../../components/AuthComponents/LoginPage';

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(),
  };
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
  };
});

const mockDispatch = jest.fn(() => jest.fn());
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

const history = { push: jest.fn() };

test('should render LoginPage correctly', () => {
  const elem = renderer.create(<LoginPage history={history} />).toJSON();
  expect(elem).toMatchSnapshot();
});

test('login button click should not trigger dispatch and errors should appear', () => {
  const { getAllByText } = render(<LoginPage history={history} />);
  const loginBtn = screen.getByTestId('login-btn');
  fireEvent.click(loginBtn);
  expect(mockDispatch).toHaveBeenCalledTimes(0);
  expect(getAllByText('This field should not be empty'));
});

// test('login button click should trigger dispatch and login via firebase (second dispatch)', () => {
//   const { container } = render(<LoginPage history={history} />);
//   const loginBtn = screen.getByTestId('login-btn');
//   const checkboxFirebase = screen.getByTestId('usefirebase-checkbox');
//   fireEvent.click(checkboxFirebase);
//   const inputs = container.querySelectorAll('input');
//   fireEvent.change(inputs[0], { target: { value: 'testtest@test.com' } });
//   fireEvent.change(inputs[1], { target: { value: 'Test!1234' } });
//   fireEvent.click(loginBtn);
//   // first dispatch call for changing email, second dispatch call for login via firebase
//   expect(mockDispatch).toHaveBeenCalledTimes(2);
// });
