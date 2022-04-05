import React from 'react';

const Error = (props) =>{
       return( <div className={`alert ${props.alertType} `} role="alert">
          {props.Text}
        </div>
       )
}

export default Error;