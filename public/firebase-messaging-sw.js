importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAIj-ju2-DvFXSYO-kY4WQkVgrji_L-vRQ',
  projectId: 'hyppeapp-297310',
  messagingSenderId: '590985523606',
  appId: '1:590985523606:web:20f2f241574e7fdea92db7',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
