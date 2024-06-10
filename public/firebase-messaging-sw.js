importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);


const firebaseConfig = {
  apiKey: "AIzaSyASu9PvMcAc0refWhraPwQc5K8hH4Qgpc4",
  authDomain: "amg-pwa-notification.firebaseapp.com",
  projectId: "amg-pwa-notification",
  storageBucket: "amg-pwa-notification.appspot.com",
  messagingSenderId: "995495715568",
  appId: "1:995495715568:web:217cd8f076cd70883a9835",
  measurementId: "G-X4PDFZ90TP",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/loghi-03.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
