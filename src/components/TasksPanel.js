import React, {useEffect, useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, deleteDoc, query, orderBy, limit, getDoc, Timestamp, onSnapshot, where } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'
import Modal from './Modal'
import TaskDetails from "./TaskDetails.js";
import EditTaskForm from "./EditTaskForm";
import NewTaskForm from './NewTaskForm.js';

const TasksPanel = ({imie, rola, userid}) =>{

    const [newLogin, setNewLogin] = useState('');

    const userRef = collection(db, "tasks");
    // const q = query(usersRef, orderBy("createdAt"), limit(25));
    // const [users] = useCollectionData(q, { idField: "id" });

    const [tasks, setTasks] = useState([]); // all users ordered by date
    const [modalName, setModalName] = useState('addtask')
    const [taskDetails, settaskDetails] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refresh = () =>{ // set or refresh all users
        const getData = async () => {
            const q = query(userRef, where("status", "==", "Open"));
            const data = await getDocs(q);
            console.log(data);

            // setTasks([]);
            setTasks(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
            console.log(tasks);
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

    const deltask = async (id) => {
        if(window.confirm("Czy na pewno chcesz usunąć auto o loginie "+ id)){
            console.log(id);
            await deleteDoc(doc(db, "tasks", id));
            refresh();
        }

    }
    const toggleModal=()=>{
        setModalName('addtask');
        setIsModalOpen(!isModalOpen);
    }

    const toggleModaltaskDetails=(abc)=>{
        setModalName('taskDetails');
        let task = tasks.filter(function(element){return element.id === abc});
        settaskDetails(task[0]);
        setIsModalOpen(!isModalOpen);
    }

    const toggleModaltaskEdit=(abc)=>{
        setModalName('taskEdit');
        let task = tasks.filter(function(element){return element.id === abc});
        settaskDetails(task[0]);
        setIsModalOpen(!isModalOpen);
    }


    const listOftasks = tasks.map((task) =>(
        <div className='text-light'>{task.id} <button onClick={() => toggleModaltaskDetails(task.id)} >Więcej</button> {rola === 'admin' ? <><button onClick={() => toggleModaltaskEdit(task.id)} >Edytuj</button><button onClick={() => deltask(task.id)} >X</button></>: ''}</div>
    ))



    const modalSubmit=()=>{
        refresh();
    }

    return(
        <div className="container-md">
             <button className="btn btn-primary" onClick={toggleModal}>Dodaj</button>
            {(isModalOpen && modalName === 'addtask') &&
                <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title="Dodaj zadanie">
                    <NewTaskForm submitFunc={modalSubmit} toggleModal={toggleModal} />
                </Modal>
            }
            {(isModalOpen && modalName === 'taskDetails') &&
                <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title={"Dane zadania: " + taskDetails.id}>
                    <TaskDetails users={tasks} taskToOpen={taskDetails} />
                </Modal>
            }
            {(isModalOpen && modalName === 'taskEdit') &&
                <Modal toggleModal={toggleModal} modalSubmit={modalSubmit} title={"Edytujesz zadanie: " + taskDetails.id}>
                    <EditTaskForm toggleModal={toggleModal} submitFunc={modalSubmit} task={taskDetails}></EditTaskForm>
                </Modal>
            }
            {listOftasks}
            {/* <ListOfChatusers userid={userid} users={users}></ListOfChatusers> */}
        </div>
    )
}

export default TasksPanel;