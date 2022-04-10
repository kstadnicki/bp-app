import React, {useEffect, useState} from 'react';
import db from '../firebase/firebase.js';
import firebase from 'firebase/compat/app';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc, Timestamp, onSnapshot, where } from 'firebase/firestore';
import ChatMessage from './ChatMessage.js';
import ListOfChatMessages from './ListOfChatMessages';


const Chat = ({imie, rola, userid})=>{    

    // const query = msgRef.orderBy('createdAt').limit(25);

    // const [messages] = useCollectionData(query, {idField: 'id'});

    const messagesRef = collection(db, "msg");
    const chatsRef = collection(db, "rooms");
    // const q = query(messagesRef, orderBy("createdAt"), limit(25));
    // const [messages] = useCollectionData(q, { idField: "id" });

    const [messages, setMessages] = useState([]); // all messages ordered by date

    const [listOfMessages, setList] = useState([]); // chat specific messages

    const [currentChat, setCurrentChat] = useState("all"); // current chat id

    const [chats, setChats] = useState([]); // all chats

    const refresh = () =>{ // set or refresh all messages
        const getData = async () => {
          const q = query(messagesRef, where("chat", "==", currentChat) ,orderBy("createdAt"));
          const data = await getDocs(q);
          setMessages(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
            //   onSnapshot(messagesRef,(snapshot)=>{
            //   setMessages(snapshot.docs.map((msg)=>({...msg.data(), id: msg.id})));
            //   console.log(messages)
            // })
        };
        getData();
    } 

    const getChats = () =>{ // set or refresh all messages
      const getData = async () => {
        const q = query(chatsRef);
        const data = await getDocs(q);
        setChats(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
      };
      getData();
  } 

    useEffect(() => {
      const q = query(messagesRef, orderBy("createdAt"));
      refresh();
      getChats();
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
          chat: currentChat,
          text: formValue,
          createdAt: Timestamp.fromDate(new Date()),
          userid
        });
        refresh();
        setFormValue('');
      }

      const changeChatRoom = async(e) => {
        e.preventDefault();
        setCurrentChat(e.target.value);
        refresh();
        setFormValue('');
      }

      const addButton = (el) => {
        return (
          <button value={el.id} onClick={changeChatRoom}>{el.id}</button>
        );
      }

    return (
        <div>
          {/* <script>chats.forEach(addButton);</script>  TODO: loop button creation from chats*/}
          <button value="all" onClick={changeChatRoom}>all</button>
          <button value="admin" onClick={changeChatRoom}>admin</button>
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