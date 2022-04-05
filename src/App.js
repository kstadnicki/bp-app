import './App.css';
import LoginForm from './components/LoginForm.js';
import React, {useState} from 'react';
import WelcomeScreen from "./components/WelcomeScreen.js";
import db from './firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';
import Error from './components/error.js'

const App = ()=> {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);
    const [role,setRole]= useState(null);
    const [isError,setIsError] = useState(false);
    const [errorText, setErrorText] = useState("")

    const Login = async(login,password)=>{
      const response = await getDoc(doc(db,"users",login));
     
      if(response._document===null || response._document.data.value.mapValue.fields.password.stringValue !== password){
        setIsError(true);
        setErrorText("Niepoprawny login lub hasło")
        return 0
      }
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
    {isError === true &&
       <Error Text={errorText} alertType="alert-danger"></Error>
      }
    <LoginForm onSubmit={Login}></LoginForm>  
  </h1>
  );
  if(isLoggedIn === true)
  return(<WelcomeScreen imie={userName} rola={role}/>)
  
}

export default App;
