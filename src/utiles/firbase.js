import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCKy3u2KVCwGb0b0DQP-h-VWC-lyGJcf0c",
    authDomain: "react-django-2ed41.firebaseapp.com",
    projectId: "react-django-2ed41",
    storageBucket: "react-django-2ed41.appspot.com",
    messagingSenderId: "274479534608",
    appId: "1:274479534608:web:ef165bec8a7a6492cf7095"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };