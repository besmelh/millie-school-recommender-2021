import React from "react";

export default function HorizontalLine() {
    return(
        <div style={
            {display: 'flex',
            justifyContent: 'center',
            padding: '15px 0'}}>
            <div style={
                {
                    backgroundColor: '#FEC9B3',
                    width: '80%',
                    height: '2px',
                }
            }/>
        </div>
    )
}