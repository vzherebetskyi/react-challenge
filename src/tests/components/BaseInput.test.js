import React from 'react';
import { render, screen } from '@testing-library/react';

import BaseInput from '../../components/reusedComponents/BaseInput';

test('should render BaseInput with correct props', () => {
  render(
    <BaseInput
      inputPlaceholder="E-mail"
      inputName="email"
      inputValue="email@test.com"
      handleChangeInput={() => {}}
      errors={{}}
    />
  );
  const input = screen.getByTestId('base-input');

  expect(input.value).toBe('email@test.com');
  expect(input.placeholder).toBe('E-mail');
  expect(input.name).toBe('email');
  expect(input.type).toBe('text');
});

test('error message should be present', () => {
  const { getByText } = render(
    <BaseInput
      inputPlaceholder="E-mail"
      inputName="email"
      inputValue="email@test.com"
      handleChangeInput={() => {}}
      errors={{
        email: 'Should be at least 8 characters length',
      }}
    />
  );
  expect(getByText('Should be at least 8 characters length'));
});
