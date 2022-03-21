import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import PasswordInput from '../../components/reusedComponents/PasswordInput';

test('should render PasswordInput with correct props', () => {
  render(
    <PasswordInput
      inputPlaceholder="Password"
      inputName="password"
      inputValue="password"
      handleChangeInput={() => {}}
      errors={{}}
    />
  );
  const input = screen.getByTestId('password-input');

  expect(input.value).toBe('password');
  expect(input.placeholder).toBe('Password');
  expect(input.name).toBe('password');
  expect(input.type).toBe('password');
});

test('should change type to text on click', () => {
  const { container } = render(
    <PasswordInput
      inputPlaceholder="Password"
      inputName="password"
      inputValue="password"
      handleChangeInput={() => {}}
      errors={{}}
    />
  );
  const imgs = container.querySelectorAll('img');
  fireEvent.click(imgs[1]);
  const input = screen.getByTestId('password-input');
  expect(input.type).toBe('text');
});

test('error message should be present', () => {
  const { getByText } = render(
    <PasswordInput
      inputPlaceholder="Password"
      inputName="password"
      inputValue="password"
      handleChangeInput={() => {}}
      errors={{
        password: 'Should be at least 8 characters length',
      }}
    />
  );
  expect(getByText('Should be at least 8 characters length'));
});
