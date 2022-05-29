import React, {useEffect, useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, deleteDoc, query, orderBy, limit, getDoc, Timestamp, onSnapshot, where } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'
import Modal from './Modal'
import NewCarForm from './NewCarForm.js';
import NewUserForm from "./NewUserForm";
import CarDetails from "./carDetails";
import EditCarForm from "./EditCarForm";

const CarsAdminPanel = ({imie, rola, userid}) =>{

    const [newLogin, setNewLogin] = useState('');

    const userRef = collection(db, "cars");
    // const q = query(usersRef, orderBy("createdAt"), limit(25));
    // const [users] = useCollectionData(q, { idField: "id" });

    const [cars, setCars] = useState([]); // all users ordered by date
    const [modalName, setModalName] = useState('addCar')
    const [carDetails, setCarDetails] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    const toggleModal=()=>{
        setModalName('addCar');
        setIsModalOpen(!isModalOpen);
    }

    const toggleModalCarDetails=(abc)=>{
        setModalName('carDetails');
        let car = cars.filter(function(element){return element.id === abc});
        setCarDetails(car[0]);
        setIsModalOpen(!isModalOpen);
    }

    const toggleModalCarEdit=(abc)=>{
        setModalName('carEdit');
        let car = cars.filter(function(element){return element.id === abc});
        setCarDetails(car[0]);
        setIsModalOpen(!isModalOpen);
    }


    const listOfcars = cars.map((car) =>(
        <div className='text-light'>{car.id} - {car.model} {car.wersja}  <button onClick={() => toggleModalCarDetails(car.id)} >Więcej</button> {rola === 'admin' ? <><button onClick={() => toggleModalCarEdit(car.id)} >Edytuj</button><button onClick={() => delCar(car.id)} >X</button></>: ''}</div>
    ))



    const modalSubmit=()=>{
        refresh();
    }

    return(
        <div className="container-md">
            {rola === 'admin' ? <button className="btn btn-primary" onClick={toggleModal}>Dodaj</button>: ''}
            {(isModalOpen && modalName === 'addCar') &&
                <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title="Dodaj auto">
                    <NewCarForm submitFunc={modalSubmit} toggleModal={toggleModal} />
                </Modal>
            }
            {(isModalOpen && modalName === 'carDetails') &&
                <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title={"Dane auta: " + carDetails.id}>
                    <CarDetails users={cars} carToOpen={carDetails}></CarDetails>
                </Modal>
            }
            {(isModalOpen && modalName === 'carEdit') &&
                <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title={"Edytujesz auto: " + carDetails.id}>
                    <EditCarForm toggleModal={toggleModal} submitFunc={modalSubmit} users={cars} carToOpen={carDetails}></EditCarForm>
                </Modal>
            }
            {listOfcars}
            {/* <ListOfChatusers userid={userid} users={users}></ListOfChatusers> */}
        </div>
    )
}

export default CarsAdminPanel;