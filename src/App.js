import './App.css';
import LoginForm from './components/LoginForm.js';
import React, {useState} from 'react';
import WelcomeScreen from "./components/WelcomeScreen.js";
import db from './firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';

const App = ()=> {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);
    const [role,setRole]= useState(null);

    const Login = async(login,password)=>{
      const response = await getDoc(doc(db,"users",login));
      if(response._document.data.value.mapValue.fields.password.stringValue === password){
          setUserName(response._document.data.value.mapValue.fields.imie.stringValue);
          setRole(response._document.data.value.mapValue.fields.rola.stringValue);
          setIsLoggedIn(true);
      }
      if(response._document.data.value.mapValue.fields.password.stringValue !== password)
      setIsLoggedIn(false);
  }

  if(isLoggedIn === false)
  return (
  <h1>
    Hello World!  
    <LoginForm onSubmit={Login}></LoginForm>  
  </h1>
  );
  if(isLoggedIn === true)
  return(<WelcomeScreen imie={userName} rola={role}/>)
}

export default App;
