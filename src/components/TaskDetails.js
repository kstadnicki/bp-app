import React from 'react';

const TaskDetails = ({taskToOpen}) =>{

    return(
        <div className="text-light">
            <p><b>Nazwa:</b> {taskToOpen.Name}</p>
            <p><b>Opis:</b> {taskToOpen.Description}</p>
            <p><b>Auto:</b> {taskToOpen.car}</p>
        </div>
    )
}

export default TaskDetails;