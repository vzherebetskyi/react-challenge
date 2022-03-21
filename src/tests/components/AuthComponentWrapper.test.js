import React from 'react';
import renderer from 'react-test-renderer';

import AuthComponentWrapper from '../../components/AuthComponents/AuthComponentWrapper';

const history = { push: jest.fn() };

test('should render AuthComponentWrapper correctly', () => {
  const elem = renderer
    .create(
      <AuthComponentWrapper title="LOGIN" history={history}>
        <div />
      </AuthComponentWrapper>
    )
    .toJSON();
  expect(elem).toMatchSnapshot();
});
