// Zoekbalk component

import React, { useState } from 'react';
import './SearchBarComponent.scss';
import {ReactComponent as SearchIcon} from '../../assets/misc/search.svg';

export default function SearchBar (  {
    onEnter,
    ...props 
}) {

    const [inputValue, setInputValue] = useState('')

    function handleEnter (event) {
        if (event.code === "Enter" || event.code === "NumPAdEnter") {
            if(inputValue.length !== 0) {
                onEnter(inputValue)
                setInputValue('')
            }
            
        }  
    }

    function handleInputChange (event) {
        setInputValue(event.target.value)
    }

    return (
        <>
        <div className="searchbar_container">
            <input
             type="text" 
             placeholder="Search term" 
             className="searchbar_input"
             onKeyDown={handleEnter}
             onChange={handleInputChange}
             value={inputValue}
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