import React, {useEffect, useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, deleteDoc, query, orderBy, limit, getDoc, Timestamp, onSnapshot, where } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'
import Modal from './Modal'
import NewUserForm from './NewUserForm.js';
import UserDetails from "./userDetails";
import EditUserForm from "./EditUserForm";
import ludzik from "../imgs/ludzik.png";


const UsersAdminPanel = ({imie, rola, userid}) =>{

    const [newLogin, setNewLogin] = useState('');

    const userRef = collection(db, "users");
    // const q = query(usersRef, orderBy("createdAt"), limit(25));
    // const [users] = useCollectionData(q, { idField: "id" });

    const [users, setUsers] = useState([]); // all users ordered by date
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalName, setModalName] = useState('addUser')
    const [userDetails, setUserDetails] = useState([])

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

    const toggleModal=()=>{
        setModalName('addUser');
        setIsModalOpen(!isModalOpen);
    }

    const toggleModalUserDetails=(abc)=>{
        setModalName('userDetails');
        let user = users.filter(function(element){return element.id === abc});
        setUserDetails(user[0]);
        setIsModalOpen(!isModalOpen);
    }
    const toggleModalUserEdit=(abc)=>{
        setModalName('editUser');
        let user = users.filter(function(element){return element.id === abc});
        setUserDetails(user[0]);
        setIsModalOpen(!isModalOpen);
    }

    const listOfusers = users.map((usr) =>(
      <div className='text-light'>{usr.id} - {usr.imie} {usr.nazwisko} - {usr.rola} <button className="btn btn-info" onClick={() => toggleModalUserDetails(usr.id)} >Więcej</button> <button className="btn btn-primary" onClick={() => toggleModalUserEdit(usr.id)} >Edytuj</button> <button className="btn btn-danger" onClick={() => delUser(usr.id)} >X</button></div>
    ))


    const modalSubmit=()=>{
        refresh();
    }

    return(
      <div className="container-md">
        <img src={ludzik} alt="Ludzik <3" width="300" height="300"/> 
        <h1>Lista wszystkich użytkowników</h1>
        <button className="btn btn-primary" onClick={toggleModal}>Dodaj</button>
        {(isModalOpen && modalName === 'addUser') &&
          <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title="Dodaj użytkownika">
            <NewUserForm submitFunc={modalSubmit} toggleModal={toggleModal} />
          </Modal>
        }
        {(isModalOpen && modalName === 'userDetails') &&
              <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title={"Dane użytkownika " + userDetails.id}>
                  <UserDetails users={users} userToOpen={userDetails}></UserDetails>
              </Modal>
        }
          {(isModalOpen && modalName === 'editUser') &&
              <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title="Dodaj użytkownika">
                  <EditUserForm submitFunc={modalSubmit} toggleModal={toggleModal} userToOpen={userDetails} />
              </Modal>
          }
          {listOfusers}
        {/* <ListOfChatusers userid={userid} users={users}></ListOfChatusers> */}
      </div>
    )
}

export default UsersAdminPanel;