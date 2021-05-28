// Zoekbalk component

import React from 'react';
import './SearchBarComponent.scss';
import {ReactComponent as SearchIcon} from '../../assets/misc/search.svg';

export default function SearchBar (  {
    ...props 
}) {

    return (
        <>
        <div className="searchbar_container">
            <input
             type="text" 
             placeholder="Search term" 
             className="searchbar_input"
             />
             <div className="searchbar_underline">
             </div>
             <div className="searchbar_iconContainer">
                <SearchIcon />
             </div>
        </div>
        </>
    )
}