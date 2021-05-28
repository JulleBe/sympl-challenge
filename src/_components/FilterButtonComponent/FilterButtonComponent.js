import React, { useEffect, useState } from 'react';

import './FilterButtonComponent.scss';

export default function FilterButton ({
    text, 
    addToFilterFunction, 
    selectedFilters, 
    removeFromFilters,
    ...props}) {
    
    const [isActive, setActive] = useState(false)
    
    const [tempArray] = useState(selectedFilters)
    
    // Verandert de stijl van de knop en voegt/verwijdert de filter toe in/uit de selectedFilters array van de parent.
    function toggleActiveFilter () {
        let isSelected = checkIfAlreadySelected(text)
        if(isActive === false && isSelected === false) {   
            addToFilterFunction(text)
            setActive(true)
        } else {
            removeFromFilters(text)
            setActive(false)
        }
       
    }
    // Doet een check op de selectedFilters array of een bepaalde filter wel of niet de array staat. 
    // Return = isSelected: Boolean
    function checkIfAlreadySelected () {
        let isSelected = selectedFilters.includes(text);
        return isSelected;
    }
    
    useEffect(() => {
        setActive(checkIfAlreadySelected())
    }, [tempArray, selectedFilters, checkIfAlreadySelected])

    return (
        <>
            <button 
            className={`filterBtn_container ${isActive ? 'filterBtn_active': ''}`} 
            onClick={() => toggleActiveFilter()}>
                <p className="filterBtn_text">{text}</p>
            </button>
        </>
    )
}