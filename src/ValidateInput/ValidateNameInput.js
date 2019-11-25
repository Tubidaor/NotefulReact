import React from 'react';
import "./ValidateNameInput.css"


export default function ValidateNameInput(props) {
    if(props.message) {
      return (
        <div id="nameInputError" className='error'> {props.message} </div>
      );
    }
    return <></>;
}