/* eslint-disable no-alert */
export function requestPermission() {
  if (Notification && (Notification.permission !== 'granted')) {
    Notification.requestPermission();
  }
}

export function show(title, body) {
  if (!Notification) {
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
