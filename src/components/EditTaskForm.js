import React from "react";
import {useState, useEffect} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'

const EditTaskForm = (props) =>{

    const [task, setTask] = useState(props.task);

    const editCar = async(e) => {
        e.preventDefault();
        await setDoc(doc(db, "tasks",props.task.id), {
            Description: task.Description,
            Name: task.Name,
            car: task.car,
            Status: 'closed'
        });

        // await addDoc(collection(db, "msg", newLogin), {
        //   imie: imie,
        //   nazwisko: nazwisko,
        //   password: password,
        //   rola: newRola
        // });

        setTask('');
        Array.from(document.querySelectorAll('input')).forEach(input => (input.value = ''));
        props.submitFunc();
        props.toggleModal()
    }

    return(
        <div style={{padding:"5rem", backgroundColor:"#222", maxWidth:"500px", borderRadius:"5rem"}} className="d-flex justify-content-center container-sm shadow">
            <form style={{width:"100%"}} onSubmit={editCar}>
                <div>
                    <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
                        Nazwa:
                        <input className="form-control shadow-sm" type="text" name="model" value={task.Name} readonly/>
                    </label>
                </div>
                <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
                    Opis:
                    <input className="form-control shadow-sm" type="text" name="wersja" value={task.Description} readonly/>
                </label>
                <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
                    Auto:
                    <input className="form-control shadow-sm" type="text" name="rok" value={task.car} readonly/>
                </label>
                <br />
                <button style={{width:"100%", marginTop:"3rem"}} type="submit" value="Wyślij" className="btn btn-primary shadow" >Zakończ</button>
            </form>
        </div>
    )
}

export default EditTaskForm;