import notificationsReducer from '../../reducers/notifications';

test('should show a notification', () => {
  const notification = 'Notification';
  const action = {
    type: 'SHOW_NOTIFICATION',
    notification,
  };
  const state = notificationsReducer({ notification: '' }, action);
  expect(state).toEqual({ notification: 'Notification' });
});

test('should hide a notification', () => {
  const action = {
    type: 'HIDE_NOTIFICATION',
  };
  const state = notificationsReducer(
    { notification: 'rt23Tjbnb56Qgfjk78MMjjh' },
    action
  );
  expect(state).toEqual({ notification: '' });
});
