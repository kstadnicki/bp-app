import React from 'react';

const carDetails = ({carToOpen}) =>{

    return(
        <div className="text-light">
            <p><b>Model:</b> {carToOpen.Model}</p>
            <p><b>Wersja:</b> {carToOpen.Wersja}</p>
            <p><b>Rok produkcji:</b> {carToOpen.Rok}</p>
        </div>
    )
}

export default carDetails;