import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCM6yHZgLAAVMDFBXtnxepM8u-UJsKpS7I",
    authDomain: "ezenbank.firebaseapp.com",
    databaseURL: "https://ezenbank.firebaseio.com",
    projectId: "ezenbank",
    storageBucket: "ezenbank.appspot.com",
    messagingSenderId: "257080629676",
    appId: "1:257080629676:web:7f99ec723f1813e6964209"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchImages() {
  const imagesRef = collection(db, 'images');
  const imageSnapshot = await getDocs(query(imagesRef, orderBy('order', 'asc')));
  const imageList = imageSnapshot.docs.map(doc => doc.data());
  return imageList.slice(0, 10);
}

export async function fetchVideos() {
  const videosRef = collection(db, 'video');
  const videosSnapshot = await getDocs(query(videosRef, orderBy('order', 'asc')));
  const videosList = videosSnapshot.docs.map(doc => doc.data());
  return videosList;
}

export async function fetchShorts() {
  const shortsRef = collection(db, 'shorts');
  const shortsSnapshot = await getDocs(query(shortsRef, orderBy('order', 'asc')));
  const shortsList = shortsSnapshot.docs.map(doc => doc.data());
  return shortsList.slice(0, 3);
}