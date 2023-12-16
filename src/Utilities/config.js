import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { v4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyB61qe1gdYR-1Se7VB4EQW3fMsR8VgRwXY",
  authDomain: "witak-app.firebaseapp.com",
  projectId: "witak-app",
  storageBucket: "witak-app.appspot.com",
  messagingSenderId: "522842947655",
  appId: "1:522842947655:web:96430bcbafdec821067162",
  measurementId: "G-5NDC0N5SMQ"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}

