import React from 'react';

const userDetails = ({userToOpen}) =>{

    return(
        <div className="text-light">
            <p><b>Imie:</b> {userToOpen.imie}</p>
            <p><b>Nazwisko:</b> {userToOpen.nazwisko}</p>
            <p><b>Rola:</b> {userToOpen.rola}</p>
        </div>
    )
}

export default userDetails;