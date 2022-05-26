import React from "react";
import {useState, useEffect} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'

const EditCarForm = (props) =>{

    const [model, setModel] = useState(props.carToOpen.model);
    const [wersja, setWersja] = useState(props.carToOpen.wersja);
    const [rok, setRok] = useState(props.carToOpen.rok);

    const editCar = async(e) => {
        e.preventDefault();
        await setDoc(doc(db, "cars",props.carToOpen.id), {
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
            <form style={{width:"100%"}} onSubmit={editCar}>
                <div>
                    <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
                        Model:
                        <input className="form-control shadow-sm" type="text" name="model" value={model} onChange={ e => setModel(e.target.value)} required/>
                    </label>
                </div>
                <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
                    Wersja:
                    <input className="form-control shadow-sm" type="text" name="wersja" value={wersja} onChange={ e => setWersja(e.target.value)} required/>
                </label>
                <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
                    Rok:
                    <input className="form-control shadow-sm" type="text" name="rok" value={rok} onChange={ e => setRok(e.target.value)} required/>
                </label>
                <br />
                <button style={{width:"100%", marginTop:"3rem"}} type="submit" value="Wyślij" className="btn btn-primary shadow" >Dodaj</button>
            </form>
        </div>
    )
}

export default EditCarForm;