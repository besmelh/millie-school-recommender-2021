import React from 'react';
import MillieButton from '../MillieButton/MillieButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './MillieMenu.css';

export default function MillieMenu(props) {
  const menuItems = props.menuItems;
  const label = props.label;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <div className={'MillieMenu'}>
      <MillieButton className={`MillieMenuButton ${props.className}`} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {label}
      </MillieButton>
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
        <MenuItem onClick={handleClose}>Overwrite with CSV</MenuItem>       
      
      </Menu>
    </div>
  );
}