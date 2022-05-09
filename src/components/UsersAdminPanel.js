import React, {useEffect, useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc, Timestamp, onSnapshot, where } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'
import ListOfChatMessages from './ListOfChatMessages';
import ListOfChatButtons from './ListOfChatButtons.js';
import Modal from './Modal'

const UsersAdminPanel = ({imie, rola, userid}) =>{

    const [newLogin, setNewLogin] = useState('');

    const userRef = collection(db, "users");
    // const q = query(messagesRef, orderBy("createdAt"), limit(25));
    // const [messages] = useCollectionData(q, { idField: "id" });

    const [messages, setMessages] = useState([]); // all messages ordered by date

    const refresh = () =>{ // set or refresh all messages
        const getData = async () => {
          const q = query(userRef);
          const data = await getDocs(q, orderBy("nazwisko"));
          setMessages(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
            //   onSnapshot(messagesRef,(snapshot)=>{
            //   setMessages(snapshot.docs.map((msg)=>({...msg.data(), id: msg.id})));
            //   console.log(messages)
            // })
        };
        getData();
    } 

    useEffect(() => {
      const q = query(userRef ,orderBy("createdAt"));
      onSnapshot(q,(snapshot)=>{
        setMessages(snapshot.docs.map((user)=>({...user.data(), id: user.id})));
      });
      refresh();
      console.log(messages);
    }, [userid])

    // var listOfMessages= messages.map((msg)=>{
    //   return(<div>{msg.login}</div>)
    // })

    var listOfMessages = messages.map((msg) =>(
      <div>{msg.login}</div>
    ))

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal=()=>{
      setIsModalOpen(!isModalOpen);
    }
  
    const modalSubmit=()=>{
      alert("MODAL SUBMITED");
    }

    return(
      <div className="container-md">
        <button className="btn btn-primary" onClick={toggleModal}>Dodaj</button>
        {isModalOpen &&
          <Modal toggleModal={toggleModal} modalSubmit={modalSubmit}>
            <p>Dodaj użytkownika</p>  
          </Modal>
        } 
        {listOfMessages}
        {/* <ListOfChatMessages userid={userid} messages={messages}></ListOfChatMessages> */}
      </div>
    )
}

export default UsersAdminPanel;