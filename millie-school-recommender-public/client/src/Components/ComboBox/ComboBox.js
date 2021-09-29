import React, {useEffect, useState} from 'react';
//import axios from 'axios';
import { axiosAPI } from '../../Axios/axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './ComboBox.css';
import {cleanFieldName} from '../../HelperFiles/helperFunctions';

function ComboBox(props) {

    const [options, setOptions] = useState([]);

    useEffect(() => {

        async function fetchData(){
            const request = await axiosAPI.get(`${props.url}`);
            setOptions(request.data);
            return request;
        }
        fetchData();

        }, [])
    

    return (
        <Autocomplete
          id="combo-box"
          options={options} //takes data in the form of an array
          getOptionLabel={(option) => option[props.label]} //if options is an object array, this will be the key of the object you wnat to retrieve
          onChange= {props.onChange}
          renderInput={(params) => 
              <TextField 
                  {...params}
                  label={cleanFieldName(props.label)}
                  variant="outlined"

              />
          }
        />
    );

    
  }

export default ComboBox;
