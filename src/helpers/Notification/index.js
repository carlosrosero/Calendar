// Notification polyfill
import 'html5-notification/dist/Notification';

/* eslint-disable no-alert */
function isNotificationAvailable() {
  return ('Notification' in window);
}

export function requestPermission() {
  if (isNotificationAvailable() && (Notification.permission !== 'granted')) {
    Notification.requestPermission();
  }
}

export function show(title, body) {
  const showNotification = () => {
    /* eslint-disable no-unused-vars */
    const notification = new Notification(title, {
      icon: 'http://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/16/marker-small-icon.png',
      body,
    });
    /* eslint-enable no-unused-vars */
  };

  if (!isNotificationAvailable()) {
    alert(body);
  } else if (Notification.permission === 'granted') {
    showNotification();
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        showNotification();
      }
    });
  }
}
