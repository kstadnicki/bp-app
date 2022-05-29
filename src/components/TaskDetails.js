import React from 'react';

const TaskDetails = ({taskToOpen}) =>{

    console.log(taskToOpen)
    return(
        <div className="text-light">
            <p><b>Nazwa:</b> {taskToOpen.Name}</p>
            <p><b>Opis:</b> {taskToOpen.Description}</p>
            <p><b>Auto:</b> {taskToOpen.car}</p>
            <p><b>Pracownik:</b> {taskToOpen.login}</p>
        </div>
    )
}

export default TaskDetails;