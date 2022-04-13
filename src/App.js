import './App.css';
import LoginForm from './components/LoginForm.js';
import React, {useState} from 'react';
import WelcomeScreen from "./components/WelcomeScreen.js";
import db from './firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';
import Error from './components/error.js'
import './global.css';
import logo from './logo.png'
import ListOfChatButtons from './components/ListOfChatButtons.js';
import Chat from './components/Chat';
import Header from './components/header.js'

const App = ()=> {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);
    const [role,setRole]= useState(null);
    const [isError,setIsError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [userid, setUserID] = useState(null);
    const [currentView, setCurrentView] = useState("home");
    const [chats] = useState([{ home: "home", id: "home"}, {home: "chat", id:"chat"} ]); // all chats

    const changeView = (view) => {
      setCurrentView(view);
      // console.log(view)
    }

    const Login = async(login,password)=>{
      const response = await getDoc(doc(db,"users",login));
     
      if(response._document===null || response._document.data.value.mapValue.fields.password.stringValue !== password){
        setIsError(true);
        setErrorText("Niepoprawny login lub hasło")
        return 0
      }
      if(response._document.data.value.mapValue.fields.password.stringValue === password){
          setUserName(response._document.data.value.mapValue.fields.imie.stringValue);
          //console.log(response._document.data.value);
          // console.log("id " + login);
          setUserID(login);
          // console.log("id " + userid);
          setRole(response._document.data.value.mapValue.fields.rola.stringValue);
          // console.log(role);
          setIsLoggedIn(true);
      }
      if(response._document.data.value.mapValue.fields.password.stringValue !== password)
          setIsLoggedIn(false);
  }
  if(isLoggedIn === false)
  return (
  <div>
    {isError === true &&
       <Error Text={errorText} alertType="alert-danger"></Error>
      }
    <LoginForm onSubmit={Login}></LoginForm>  
  </div>
  );
  if(isLoggedIn === true)
  switch (currentView) {
    case "chat":
      return(
        <div>
          <Header activeChat={currentView} chats={chats} changeView={changeView}></Header>
          <WelcomeScreen imie={userName} rola={role} userid = {userid}/>
        {/* <ListOfChatButtons activeChat={currentView} chats={chats} changeChatRoom={changeView}></ListOfChatButtons> */}
          <Chat imie={userName} rola={role} userid = {userid}></Chat>  
       
        </div>
        ) 
      break;
  
    default:
      return(
        <div>
          <Header activeChat={currentView} chats={chats} changeView={changeView}></Header>
          <WelcomeScreen imie={userName} rola={role} userid = {userid}/>
        </div>
        ) 
      break;
  }
 
}

export default App;
