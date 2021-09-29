import React from 'react';
import {Link} from 'react-router-dom';

import './NavBar.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import millie_logo from '../../Images/millie-group-icon.svg';
import school_recommender_logo from '../../Images/school-recommender-logo.svg';



function NavBar(){
    return (
        <div className='NavBar'>
            <ul>
                <li><Link to="/" className={'logo'}><img src={millie_logo}/></Link></li>
                <li><Link to="/browse" activeClassName={"active"}>Browse Schools</Link></li>
                <li><Link to="/folders" activeClassName={"active"}>Saved Folders</Link></li>
                <li><Link to="/admin" activeClassName={"active"}>Admin</Link></li>
            </ul>
       </div>    
    )
}

export default NavBar;