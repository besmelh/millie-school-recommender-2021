import React, { useState, Component } from 'react'
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import LinearProgress from '@material-ui/core/LinearProgress';
import Popper from '@material-ui/core/Popper';
import './RelevanceBar.css';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(0.5),
    //backgroundColor:
  },
}));


function RelevanceBar(props){

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    

    return (
        <div style={{width: '90%'}} className= {`RelevanceBarDiv`}> 

            <LinearProgress 
                className= {`RelevanceBar ${statusClass(props.status)}`}
                variant="determinate"
                value={parseFloat(props.relevance) * 100} 
                style={{
                    width: '90%',
                    height: '16px'
                }}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            />
            
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <p style={{padding:0, margin:0}}>{props.status ? props.status : 'Unknown'}</p>
            </Popover>
       

        </div>
    )


    function statusClass(status){
        if (status) {
            switch(status.toLowerCase()){
                case 'prospect': {
                    return 'prospect'
                }
                case 'interested': {
                    return 'interested'
                }
                case 'in progress': {
                    return 'inProgress'
                }
                case 'engaged': {
                    return 'engaged'
                }
                case 'partner': {
                    return 'partner'
                }
                case 'not interested': {
                    return 'notInterested'
                } 
                default: {
                    return 'unknown'
                }
            }
        } else {
            return 'unknown'
        }

    }

}


export default RelevanceBar;
