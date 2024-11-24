import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAJcthVOhEq6z_RHk7vHLa8sOGePpZVeSw",
    authDomain: "photo-app-66b71.firebaseapp.com",
    projectId: "photo-app-66b71",
    storageBucket: "photo-app-66b71.appspot.com",
    messagingSenderId: "446818748597",
    appId: "1:446818748597:web:f1923b071142728a2156fc",
    databaseURL:'https://photo-app-66b71-default-rtdb.firebaseio.com/'
  };
  const app=initializeApp(firebaseConfig);
  const imgDB=getStorage(app)
  const hashDB=getFirestore(app)
  const suggestionsDB=getFirestore(app)
  export {imgDB, hashDB, app,suggestionsDB};
  export default imgDB;