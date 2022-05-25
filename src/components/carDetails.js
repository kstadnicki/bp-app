import React from 'react';

const carDetails = ({carToOpen}) =>{

    return(
        <div className="text-light">
            <p><b>Model:</b> {carToOpen.model}</p>
            <p><b>Wersja:</b> {carToOpen.wersja}</p>
            <p><b>Rok produkcji:</b> {carToOpen.rok}</p>
        </div>
    )
}

export default carDetails;