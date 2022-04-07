import React, {useEffect, useState} from 'react';
import db from '../firebase/firebase.js';
import firebase from 'firebase/compat/app';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc, Timestamp } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore'
import { async } from '@firebase/util';


const Chat = ({imie, rola, userid})=>{
    
    const msgRef = collection(db, "msg");

    // const query = msgRef.orderBy('createdAt').limit(25);

    // const [messages] = useCollectionData(query, {idField: 'id'});

    const messagesRef = collection(db, "msg");
    // const q = query(messagesRef, orderBy("createdAt"), limit(25));
    // const [messages] = useCollectionData(q, { idField: "id" });

    const [messages, setMessages] = useState([]);

    const refresh = () =>{
        const getData = async () => {
            const data = await getDocs(messagesRef);
            setMessages(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };
        getData();
    } 

    useEffect( refresh, []
    );

    console.log(messages);
    // const q = query(collection(db, "msg"), orderBy('createdAt'), limit(25));

    // // const [messages] = async() => { await getDocs(collection(db, "msg"))};

    

    // getDocs(q).then( (querySnapshot) => {querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     });}
    // )
    

    const [formValue, setFormValue] = useState('');

    const sendMsg = async(e) => {
        e.preventDefault();
        await addDoc(collection(db, "msg"), {
          text: formValue,
          createdAt: Timestamp.fromDate(new Date()),
          userid
        });
        refresh();
        setFormValue('');
      }

    return (
        <>
        <div>
          {messages && messages.map(msg => <ChatMessage key ={msg.id} message={msg} userid={userid} />)}
        </div>
        <form onSubmit={sendMsg}>
          <input value={formValue} onChange={ e => setFormValue(e.target.value)}/>
          <button type="submit">Send</button>
        </form>
      </>
    );
}

function ChatMessage(props){
    const {text, uid} = props.message;
  
    const messageClass = uid === props.userid ? 'sent' : 'received';
  
    return( 
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    )
  }

export default Chat;