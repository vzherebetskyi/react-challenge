import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import RegisterPage from '../../components/AuthComponents/RegisterPage';

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

test('should render RegisterPage correctly', () => {
  const elem = renderer.create(<RegisterPage history={history} />).toJSON();
  expect(elem).toMatchSnapshot();
});

test('sign up button should be disabled', () => {
  render(<RegisterPage history={history} />);
  const signupBtn = screen.getByTestId('signup-btn');
  expect(signupBtn.disabled).toBe(true);
});

test('sign up button should be disabled', () => {
  render(<RegisterPage history={history} />);
  const checkboxTermsOfService = screen.getByTestId('terms-of-service');
  fireEvent.click(checkboxTermsOfService);
  const signupBtn = screen.getByTestId('signup-btn');
  expect(signupBtn.disabled).toBe(false);
});

test('sign up button click should not trigger dispatch and errors should appear (basic validation)', () => {
  const { getAllByText } = render(<RegisterPage history={history} />);
  const checkboxTermsOfService = screen.getByTestId('terms-of-service');
  fireEvent.click(checkboxTermsOfService);
  const signupBtn = screen.getByTestId('signup-btn');
  fireEvent.click(signupBtn);
  expect(mockDispatch).toHaveBeenCalledTimes(0);
  expect(getAllByText('This field should not be empty'));
});

test('errors should appear (more complex validation)', () => {
  const { container, getByText } = render(<RegisterPage history={history} />);
  const loginBtn = screen.getByTestId('signup-btn');
  const inputs = container.querySelectorAll('input');
  fireEvent.change(inputs[0], { target: { value: 'tes' } });
  fireEvent.change(inputs[1], { target: { value: 'test' } });
  fireEvent.change(inputs[2], { target: { value: 'testtest' } });
  fireEvent.change(inputs[3], { target: { value: 'testtest' } });
  const checkboxTermsOfService = screen.getByTestId('terms-of-service');
  fireEvent.click(checkboxTermsOfService);
  fireEvent.click(loginBtn);
  expect(getByText('Username should be at least 4 characters length'));
  expect(getByText('Please enter a valid email'));
});

test('passwords equality error should appear', () => {
  const { container, getByText } = render(<RegisterPage history={history} />);
  const inputs = container.querySelectorAll('input');
  fireEvent.change(inputs[2], { target: { value: 'a' } });
  fireEvent.change(inputs[3], { target: { value: 'b' } });
  expect(getByText('Password confirmation should be equal to password'));
});
