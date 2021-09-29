import React from 'react';
import './ButtonBar.css'

function ButtonBar(props){
    return (
        <div className={`${props.className} ButtonBar`}>
            {props.children}
        </div>
    )
}

export default ButtonBar;