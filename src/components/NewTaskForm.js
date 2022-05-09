import React from "react";
import {useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc, Timestamp, onSnapshot, where } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'

const NewTaskForm = () =>{



    const [newLogin, setNewLogin] = useState('');
    const [password, setPassword] = useState('');
    const [imie, setImie] = useState('');
    const [nazwisko, setNazwisko] = useState('');
    const [newRola, setNewRola] = useState('');


    const addTask = async(e) => {
        e.preventDefault();
        if(newRola !== "non"){
          await addDoc(collection(db, "tasks"), {
            Description: password,
            Name: newLogin,
            car: imie,
            createdAt: Timestamp.fromDate(new Date()),
            login: newRola,
            status: "Open"
          });
          formReset();
        }
      }

      const formReset = () => {
        setNewLogin('');
        setPassword('');
        setImie('');
        setNazwisko('');
        setNewRola('');
      }

    return(
        <div style={{padding:"5rem", backgroundColor:"#222", maxWidth:"500px", borderRadius:"5rem"}} className="d-flex justify-content-center container-sm shadow">
        <form style={{width:"100%"}} >
        <div>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Nazwa:
          <input className="form-control shadow-sm" type="text" name="nazwa" onChange={ e => setNewLogin(e.target.value)} required/>
        </label>
        </div>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Opis:
          <input className="form-control shadow-sm" type="text" name="Description" onChange={ e => setPassword(e.target.value)} required/>
        </label>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Auto:
          <input className="form-control shadow-sm" type="text" name="imie" onChange={ e => setImie(e.target.value)} required/>
        </label>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Pracownik:
          <input className="form-control shadow-sm" type="text" name="login" onChange={ e => setNewRola(e.target.value)} required/>
        </label>
        <button style={{width:"100%", marginTop:"3rem"}} type="submit" value="Wyślij" className="btn btn-primary shadow" onClick={addTask}>Dodaj</button>
      </form>
      </div>
    )
}

export default NewTaskForm;