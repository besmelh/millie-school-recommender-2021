import React, { useState, useEffect } from "react";



function Customers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('/api/customers/')
            .then(res => {
                if (res.ok){
                    return res.json();
                }
            })
            .then(jsonResponse => setCustomers(jsonResponse))
    }, []);

    console.log("customers:" + JSON.stringify(customers))
    return (
        <>
        <ul>
           {

           } 
        </ul>
        </>
    );
   
}

export default Customers;