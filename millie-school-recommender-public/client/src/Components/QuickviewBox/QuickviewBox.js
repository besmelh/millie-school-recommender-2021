import React from 'react';
import Box from '@material-ui/core/Box';
import './QuickviewBox.css';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function QuickviewBox(props){

    const menuItems = [{onClickAction: 'handleClose', label:'Save to another Folder'},
    {onClickAction: 'handleClose', label:'Export to CSV'},
    {onClickAction: 'handleClose', label:'Overwrite with CSV'},];
  
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    return (
        <div className={props.className}>
            <Box className={'QuickviewBox'}>
                {props.children}
                <IconButton aria-label="more" size="large" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MoreVertIcon fontSize="inherit" />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >

                    {menuItems.map((item)=>{
                    return (
                        <MenuItem onClick={item.onClickEvent}>{item.label}</MenuItem>
                    )
                    })}
                    <MenuItem style={{backgroundColor:'#ff5757',}} onClick={handleClose}>Delete</MenuItem>       
                
                </Menu>
            </Box>  
        </div>
    )
}

export default QuickviewBox;