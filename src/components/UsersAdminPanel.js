import React, {useEffect, useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, deleteDoc, query, orderBy, limit, getDoc, Timestamp, onSnapshot, where } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'
import Modal from './Modal'
import NewUserForm from './NewUserForm.js';

const UsersAdminPanel = ({imie, rola, userid}) =>{

    const [newLogin, setNewLogin] = useState('');

    const userRef = collection(db, "users");
    // const q = query(usersRef, orderBy("createdAt"), limit(25));
    // const [users] = useCollectionData(q, { idField: "id" });

    const [users, setUsers] = useState([]); // all users ordered by date

    const refresh = () =>{ // set or refresh all users
        const getData = async () => {
          const q = query(userRef);
          const data = await getDocs(q, orderBy("nazwisko"));
          console.log(data);
          console.log(users);
          setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
            //   onSnapshot(usersRef,(snapshot)=>{
            //   setUsers(snapshot.docs.map((msg)=>({...msg.data(), id: msg.id})));
            //   console.log(users)
            // })
        };
        getData();
    } 

    useEffect(() => {
      refresh();
    }, [])

    // refresh();

    // useEffect(() => {
    //   const q = query(userRef ,orderBy("nazwisko"));
    //   onSnapshot(q,(snapshot)=>{
    //     setUsers(snapshot.docs.map((user)=>({...user.data(), id: user.id})));
    //   });
    //   refresh();
    //   console.log(users);
    // })

    // var listOfusers= users.map((msg)=>{
    //   return(<div>{msg.login}</div>)
    // })

    const delUser = async (id) => {
      if(window.confirm("Czy napewno chcesz usunąć użytkownika o loginie "+ id)){
        console.log(id);
        await deleteDoc(doc(db, "users", id));
        refresh();
      }
      
    } 

    var listOfusers = users.map((msg) =>(
      <div className='text-light'>{msg.id} <button onClick={() => delUser(msg.id)} >X</button></div>
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
          <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title="Dodaj użytkownika">
            <NewUserForm /> 
          </Modal>
        } 
        {listOfusers}
        {/* <ListOfChatusers userid={userid} users={users}></ListOfChatusers> */}
      </div>
    )
}

export default UsersAdminPanel;