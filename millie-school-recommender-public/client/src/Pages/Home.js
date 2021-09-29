import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
// import axios from 'axios';

import LargeContainer from '../Components/LargeContainer/LargeContainer';
import ComboBox from '../Components/ComboBox/ComboBox';
import MillieButton from '../Components/MillieButton/MillieButton';
import QuickviewBox from '../Components/QuickviewBox/QuickviewBox';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import '../Components/Other.css'

import school_recommender_logo from '../Images/school-recommender-logo.svg';


//mainly to convert the users choice of filter into a query string to fetch from the server
//it will change [{country: 'canada'}, {school_name: 'abc'}]
//to be "?country=Canada&school_name=abc" which will be passed as part of the fetch url
function objectArray_To_QueryString (objArr){
    var str = '';
    for (var i = 0; i < objArr.length; i++){
        let obj = objArr[i];
        let key = Object.keys(obj);
        let value = obj[key];
        if (i === 0){
            str = str + '?';
        } else {
            str = str + '&';
        }
        str = str + key + '=' + value;
    }

    return str;
}


function Home(){

    
    //add based on the name of the parameter in 'mini_master'
    //if you want to change mini_master to master, check server.js and adjust the routes
    const searchFilters = ['school_name', 'country','city', 'website'];

    //form is: [country: 'Canada', school_name: 'abc', ...]
    const [queries, setQueries] =  useState([]);

    const history = useHistory();
    
    function searchButton(){
        let query = objectArray_To_QueryString(queries);
        history.push(`/browse/${query}`);
    }

    return (
        <div>
            <img src={school_recommender_logo}/>
            <LargeContainer>
                <h2>Begin your search</h2>
                <div className={'margin-5-bottom'}>
                    
                    <Grid container spacing={3}>
                        
                        {/* combobox for country */}
                        <Grid item xs={4} style={{justifyContent: 'center'}}>
                            <div style={{width: '100%'}}>
                                <ComboBox 
                                    style={{width: '100%'}}
                                    label={"country"}
                                    url={`/all-options/country`}
                                    width={100}
                                    onChange={(event, newValue) => {
                                        setQueries(oldArray => [...oldArray, newValue]);
                                    }}/>
                            </div> 
                        </Grid>

                        {/* combobox for status */}
                        <Grid item xs={4} style={{justifyContent: 'center'}}>
                            <div style={{width: '100%'}}>
                                <ComboBox 
                                    style={{width: '100%'}}
                                    label={"status"}
                                    url={`/all-options/status`}
                                    width={100}
                                    onChange={(event, newValue) => {
                                        setQueries(oldArray => [...oldArray, newValue]);
                                    }}/>
                            </div> 
                        </Grid>

                        {/* combobox for source (curriculum) */}
                        <Grid item xs={4} style={{justifyContent: 'center'}}>
                            <div style={{width: '100%'}}>
                                <ComboBox 
                                    style={{width: '100%'}}
                                    label={"source"}
                                    url={`/all-sources`}
                                    width={100}
                                    onChange={(event, newValue) => {
                                        setQueries(oldArray => [...oldArray, newValue]);
                                    }}/>
                            </div> 
                        </Grid>

                        {/* combobox for number of existing sources */}
                        <Grid item xs={4} style={{justifyContent: 'center'}}>
                            <div style={{width: '100%'}}>
                                <ComboBox 
                                    style={{width: '100%'}}
                                    label={"source_count"}
                                    url={`/source_count`}
                                    width={100}
                                    onChange={(event, newValue) => {
                                        setQueries(oldArray => [...oldArray, newValue]);
                                    }}/>
                            </div> 
                        </Grid>





                        
                        <Grid item xs={4}>
                            <MillieButton 
                                style={{minHeight: '56px', fontSize:'40px'}}
                                className={'fullWidthAndHeight'}
                                onClick={searchButton}>
                                Search
                            </MillieButton>
                        </Grid>
                    </Grid>
                </div>
            </LargeContainer>

            <LargeContainer>
                <h2>Browse Saved Folders</h2>
                <Grid container xs>
                    <Grid item xs>
                        <QuickviewBox>
                            <h3>Folder1 Name</h3>
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                            <h5>10 Schools</h5>
                        </QuickviewBox>
                    </Grid>
                    <Grid item xs>
                        <QuickviewBox>
                            <h3>Folder1 Name</h3>
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                            <h5>10 Schools</h5>
                        </QuickviewBox>
                    </Grid>
                    <Grid item xs>
                        <QuickviewBox>
                            <h3>Folder1 Name</h3>
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                            <h5>10 Schools</h5>
                        </QuickviewBox>
                    </Grid>
                    <Grid item className={'flex'}>
                        <IconButton className={''} aria-label="more" size="large">
                            <AddCircleOutlineRoundedIcon  className={'orange scale200'} fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>
            </LargeContainer>
 
        </div>
    )
}

export default Home;