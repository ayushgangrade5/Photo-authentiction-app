import { useState } from 'react';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import UserProfile from './UserProfile';

import { app } from './firebase';

const auth= getAuth(app);
function SignIN() {
const [Email,setEmail]= useState("");
const [Password,setPassword]= useState("");
const signINuser= ()=> {
    signInWithEmailAndPassword(auth,Email,Password)
    .then((value)=> console.log("logged in"))
    .catch((error)=> console.log(error));
        
};
  
  return (
    <div>
      <h2>About Page</h2>
      <p>lorem-ipsum
 
      </p>
    </div>
  );
}

export default SignIN;
