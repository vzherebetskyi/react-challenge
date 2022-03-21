import {
  handleShowNotification,
  handleHideNotification,
} from '../../actions/notifications';

test('should set up shownotification object', () => {
  const action = handleShowNotification('Notification');
  expect(action).toEqual({
    type: 'SHOW_NOTIFICATION',
    notification: 'Notification',
  });
});

test('should set up hidenotification object', () => {
  const action = handleHideNotification();
  expect(action).toEqual({
    type: 'HIDE_NOTIFICATION',
  });
});
