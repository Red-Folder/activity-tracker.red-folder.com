import firebase from 'firebase';
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "940564303570"
  });
}

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('Token received:', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}