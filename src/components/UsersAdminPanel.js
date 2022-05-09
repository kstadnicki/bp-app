import React from "react";
import {useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'

const UsersAdminPanel = () =>{

    const [newLogin, setNewLogin] = useState('');

    return(
        <div style={{padding:"5rem", backgroundColor:"#222", maxWidth:"500px", borderRadius:"5rem"}} className="d-flex justify-content-center container-sm shadow">
          XD
      </div>
    )
}

export default UsersAdminPanel;