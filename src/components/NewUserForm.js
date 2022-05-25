import React from "react";
import {useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'

const NewUserForm = (props) =>{



    const [newLogin, setNewLogin] = useState('');
    const [password, setPassword] = useState('');
    const [imie, setImie] = useState('');
    const [nazwisko, setNazwisko] = useState('');
    const [newRola, setNewRola] = useState('mechanik');


    const addUsr = async(e) => {
        e.preventDefault();
        if(newRola !== "non"){
        await setDoc(doc(db, "users", newLogin), {
          imie: imie,
          nazwisko: nazwisko,
          password: password,
          rola: newRola
        });

        // await addDoc(collection(db, "msg", newLogin), {
        //   imie: imie,
        //   nazwisko: nazwisko,
        //   password: password,
        //   rola: newRola
        // });

        setNewLogin('');
        setPassword('');
        setImie('');
        setNazwisko('');
        setNewRola('');
        Array.from(document.querySelectorAll('input')).forEach(input => (input.value = ''));
        props.submitFunc();
        props.toggleModal();
      }
      }

    return(
        <div style={{padding:"5rem", backgroundColor:"#222", maxWidth:"500px", borderRadius:"5rem"}} className="d-flex justify-content-center container-sm shadow">
        <form style={{width:"100%"}} onSubmit={addUsr}>
        <div>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Login:
          <input className="form-control shadow-sm" type="text" name="login" onChange={ e => setNewLogin(e.target.value)} required/>
        </label>
        </div>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Hasło:
          <input className="form-control shadow-sm" type="password" name="password" onChange={ e => setPassword(e.target.value)} required/>
        </label>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Imie:
          <input className="form-control shadow-sm" type="text" name="imie" onChange={ e => setImie(e.target.value)} required/>
        </label>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Nazwisko:
          <input className="form-control shadow-sm" type="text" name="imie" onChange={ e => setNazwisko(e.target.value)} required/>
        </label>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"100%"}}>
          Rola:<br></br>
          <select id="rola" name="rola" onChange={ e => setNewRola(e.target.value)} >
            <option value="mechanik" selected>Mechanik</option>
            <option value="admin">Administrator</option>

            {/* <option value="fiat" selected>Fiat</option>
            <option value="audi">Audi</option> */}
          </select>
        </label>
        <br />
        <button style={{width:"100%", marginTop:"3rem"}} type="submit" value="Wyślij" className="btn btn-primary shadow" >Dodaj</button>
      </form>
      </div>
    )
}

export default NewUserForm;