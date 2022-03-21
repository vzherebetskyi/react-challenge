import React from 'react';
import renderer from 'react-test-renderer';

import FAQPage from '../../components/FAQPage';

test('should render FAQPage correctly', () => {
  const elem = renderer.create(<FAQPage />).toJSON();
  expect(elem).toMatchSnapshot();
});
