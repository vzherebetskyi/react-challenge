import React from 'react';
import renderer from 'react-test-renderer';

import LoadingPage from '../../components/LoadingPage';

test('should render LoadingPage correctly', () => {
  const elem = renderer.create(<LoadingPage />).toJSON();
  expect(elem).toMatchSnapshot();
});
