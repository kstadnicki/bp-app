import React, {useState, useEffect} from 'react';
import db from '../firebase/firebase';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';

const Chat = ({imie, rola, userid})=>{

    const [Messages,setMessages]=useState([])
    const [messagesCount,setMessagesCount]=useState([])

    const onLoginChange =(event)=>{
        //setLogin(event.target.value);
    }

    const onFormSubmit = (event)=>{
        event.preventDefault();

    }

    const getMsgs =async()=>{
        const response = await getDocs(collection(db,"msg"));
        setMessagesCount(response.docs.length);
        setMessages(response);             
    }

    const listOfMsgs=()=>{
        let MSGS =[];     
            Messages.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots                     
                MSGS.push(
                    <li className="card" key={doc.id}>
                        <h5>{doc.data().id}:</h5> 
                        {doc.data().text}                    
                    </li>
                    
                ); 
                console.log(doc.id +" -> "+ doc.data().text)              
            });
          return(
          <div className="container-lg">   
            <div className="card">
                <div className="card-header">
                    <h3 className="text-center">Najlepszy czatek bulwo</h3>
                </div>
                    <ul className="list-group list-group-flush">
                    {MSGS}
                    </ul>
            </div>
        </div> 
        )
           
    }

    useEffect(() =>{  
      getMsgs();    
      //console.log(messagesCount); 
    },[messagesCount])

     
    //const response = getDoc(doc(db,"msg","1"));

    
    return (
        <div>
            {/* <div>
            {isError === true &&
                <Error Text={errorText} alertType="alert-warning"></Error>
            }
            </div > */}
            <div id="messenger">
            {listOfMsgs()}
            </div>

            <form onSubmit={onFormSubmit}>
                <label>
                Wiadomość:
                <input onChange={onLoginChange} type="text" name="login" />
                </label>
                <input type="submit" value="Wyślij" />
            </form>
        </div>
    );
}

export default Chat;