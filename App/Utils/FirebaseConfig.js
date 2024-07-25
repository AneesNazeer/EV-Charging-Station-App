import { initializeApp } from "firebase/app";
import GlobalApi from "./GlobalApi";

const firebaseConfig = {
  apiKey: GlobalApi.FIREBASE_API,
  authDomain: "ev-charging-station-d8517.firebaseapp.com",
  projectId: "ev-charging-station-d8517",
  storageBucket: "ev-charging-station-d8517.appspot.com",
  messagingSenderId: "642360767800",
  appId: "1:642360767800:web:e55a9345bba91cb23c3dcd",
};

export const app = initializeApp(firebaseConfig);
