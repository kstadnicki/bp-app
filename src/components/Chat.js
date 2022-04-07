import React, {useEffect, useState} from 'react';
import db from '../firebase/firebase.js';
import firebase from 'firebase/compat/app';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import ChatMessage from './ChatMessage.js';
import ListOfChatMessages from './ListOfChatMessages';


const Chat = ({imie, rola, userid})=>{    

    // const query = msgRef.orderBy('createdAt').limit(25);

    // const [messages] = useCollectionData(query, {idField: 'id'});

    const messagesRef = collection(db, "msg");
    // const q = query(messagesRef, orderBy("createdAt"), limit(25));
    // const [messages] = useCollectionData(q, { idField: "id" });

    const [messages, setMessages] = useState([]);

    const refresh = () =>{
        const getData = async () => {
            const q = query(messagesRef, orderBy("createdAt"));
            const data = await getDocs(q);
            setMessages(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
            //   onSnapshot(messagesRef,(snapshot)=>{
            //   setMessages(snapshot.docs.map((msg)=>({...msg.data(), id: msg.id})));
            //   console.log(messages)
            // })
        };
        getData();
    } 

    useEffect(() => {
      const q = query(messagesRef, orderBy("createdAt"));
      refresh();
      onSnapshot(q,(snapshot)=>{
        setMessages(snapshot.docs.map((msg)=>({...msg.data(), id: msg.id})));
      });
    },[])
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
        <div>
          {/* <ChatMessage userid={userid} messages={messages}/>
          {messages && messages.map(msg => <ChatMessage key ={msg.id} message={msg} userid={userid} />)} */}
          <ListOfChatMessages userid={userid} messages={messages}></ListOfChatMessages>
        <form onSubmit={sendMsg}>
          <input value={formValue} onChange={ e => setFormValue(e.target.value)}/>
          <button type="submit">Send</button>
        </form>
        </div>
    );
}

// function ChatMessage(props){
//     const {text, uid} = props.message;
  
//     const messageClass = uid === props.userid ? 'sent' : 'received';
  
//     return( 
//       <div className={`message ${messageClass}`}>
//         <p>{text}</p>
//       </div>
//     )
//   }

export default Chat;