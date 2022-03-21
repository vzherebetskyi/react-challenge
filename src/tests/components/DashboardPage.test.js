import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import DashboardPage from '../../components/DashboardPage';

// afterEach(cleanup);

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

test('should render DashboardPage correctly', () => {
  const elem = renderer.create(<DashboardPage />).toJSON();
  expect(elem).toMatchSnapshot();
});

test('dispatch is called on Log out button click', () => {
  const { container } = render(<DashboardPage />);
  const button = container.querySelector('button');
  fireEvent.click(button);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
