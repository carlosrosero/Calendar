/* eslint-disable no-alert */
function isNotificationAvailable() {
  return typeof Notification !== 'undefined';
}

export function requestPermission() {
  if (isNotificationAvailable() && (Notification.permission !== 'granted')) {
    Notification.requestPermission();
  }
}

export function show(title, body) {
  if (!isNotificationAvailable()) {
    // fallback for old browsers
    alert(body);
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  } else {
    /* eslint-disable no-unused-vars */
    const notification = new Notification(title, {
      icon: 'http://iconizer.net/files/Simplicio/orig/notification_warning.png',
      body,
    });
    /* eslint-enable no-unused-vars */
  }
}
