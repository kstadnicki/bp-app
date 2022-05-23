import React from "react";
import {useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'

const NewCarForm = (props) =>{

    const [model, setModel] = useState('');
    const [wersja, setWersja] = useState('');
    const [rok, setRok] = useState('');


    const addCar = async(e) => {
        e.preventDefault();
        await addDoc(collection(db, "cars"), {
          model: model,
          wersja: wersja,
          rok: rok
        });

        // await addDoc(collection(db, "msg", newLogin), {
        //   imie: imie,
        //   nazwisko: nazwisko,
        //   password: password,
        //   rola: newRola
        // });

        setModel('');
        setWersja('');
        setRok('');
        Array.from(document.querySelectorAll('input')).forEach(input => (input.value = ''));
        props.submitFunc();
        props.toggleModal()
      }

    return(
        <div style={{padding:"5rem", backgroundColor:"#222", maxWidth:"500px", borderRadius:"5rem"}} className="d-flex justify-content-center container-sm shadow">
        <form style={{width:"100%"}} onSubmit={addCar}>
        <div>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Model:
          <input className="form-control shadow-sm" type="text" name="model" onChange={ e => setModel(e.target.value)} required/>
        </label>
        </div>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Wersja:
          <input className="form-control shadow-sm" type="text" name="wersja" onChange={ e => setWersja(e.target.value)} required/>
        </label>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Rok:
          <input className="form-control shadow-sm" type="text" name="rok" onChange={ e => setRok(e.target.value)} required/>
        </label>
        <br />
        <button style={{width:"100%", marginTop:"3rem"}} type="submit" value="Wyślij" className="btn btn-primary shadow" >Dodaj</button>
      </form>
      </div>
    )
}

export default NewCarForm;