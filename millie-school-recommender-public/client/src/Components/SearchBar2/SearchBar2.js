import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css';

function SearchBar2(props){
    return(
        <div className={'SearchBar'}>
            <InputBase
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': 'search' }}
                className={'inputBase'}
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon />
            </IconButton>
        </div>
    )
}

export default SearchBar2;