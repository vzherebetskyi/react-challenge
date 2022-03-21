import React from 'react';
import renderer from 'react-test-renderer';

import NotFoundPage from '../../components/NotFoundPage';

test('should render NotFoundPage correctly', () => {
  const elem = renderer.create(<NotFoundPage />).toJSON();
  expect(elem).toMatchSnapshot();
});
