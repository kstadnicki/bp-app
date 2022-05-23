import React, {useEffect, useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, deleteDoc, query, orderBy, limit, getDoc, Timestamp, onSnapshot, where } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'
import Modal from './Modal'
import NewCarForm from './NewCarForm.js';

const CarsAdminPanel = ({imie, rola, userid}) =>{

    const [newLogin, setNewLogin] = useState('');

    const userRef = collection(db, "cars");
    // const q = query(usersRef, orderBy("createdAt"), limit(25));
    // const [users] = useCollectionData(q, { idField: "id" });

    const [cars, setCars] = useState([]); // all users ordered by date

    const refresh = () =>{ // set or refresh all users
        const getData = async () => {
            const q = query(userRef);
            const data = await getDocs(q, orderBy("Model"));
            console.log(data);
            console.log(cars);
            setCars(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
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

    const delCar = async (id) => {
        if(window.confirm("Czy na pewno chcesz usunąć auto o loginie "+ id)){
            console.log(id);
            await deleteDoc(doc(db, "cars", id));
            refresh();
        }

    }

    const listOfcars = cars.map((msg) =>(
        <div className='text-light'>{msg.id} <button onClick={() => delCar(msg.id)} >X</button></div>
    ))

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal=()=>{
        setIsModalOpen(!isModalOpen);
    }

    const modalSubmit=()=>{
        refresh();
    }

    return(
        <div className="container-md">
            <button className="btn btn-primary" onClick={toggleModal}>Dodaj</button>
            {isModalOpen &&
                <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title="Dodaj samochód">
                    <NewCarForm submitFunc={modalSubmit} toggleModal={toggleModal} />
                </Modal>
            }
            {listOfcars}
            {/* <ListOfChatusers userid={userid} users={users}></ListOfChatusers> */}
        </div>
    )
}

export default CarsAdminPanel;