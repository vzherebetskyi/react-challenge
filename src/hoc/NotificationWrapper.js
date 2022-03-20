import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleHideNotification } from '../actions/notifications';

const NotificationWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notif.notification);
  const [closeTimer, setCloseTimer] = useState(undefined);

  useEffect(() => {
    if (notification.length > 0) {
      setCloseTimer(
        setTimeout(() => {
          dispatch(handleHideNotification());
        }, 3000)
      );
    }
  }, [notification]);

  return (
    <div>
      {notification && <div>{notification}</div>}
      {children}
    </div>
  );
};

export default NotificationWrapper;
