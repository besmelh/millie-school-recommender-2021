//Forms a row where the elements all have equal widths

import React from 'react';
import './FormRow_EqualWidth.css';
import Grid from '@material-ui/core/Grid';


function FormRow_EqualWidth(props) {
    return (
      <React.Fragment>
         { props.children.map((x)=>{
            return (
              <Grid item xs={props.xs} >
                {x}
              </Grid>    
            )
            })}
      </React.Fragment>
    );
  }

  export default FormRow_EqualWidth;