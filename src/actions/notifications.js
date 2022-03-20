// actions type constants

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

// Show a notification

export const handleShowNotification = notification => ({
  type: SHOW_NOTIFICATION,
  notification,
});

// Hide a notification

export const handleHideNotification = () => ({
  type: HIDE_NOTIFICATION,
});
