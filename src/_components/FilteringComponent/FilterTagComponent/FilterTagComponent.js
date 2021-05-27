// Dit component is gemaakt voor de filter tags zelf in de de grotere filter component. 
// Deze tags geven een overzicht van de geselcteerde 'tags', maar kunnen ook eenvoudig een tag verwijdere  uit de lijst.

import React from 'react';
import './FilterTagComponent.scss'
import {ReactComponent as IconRemove} from '../../../assets/misc/icon-remove.svg';

export default function FilterTag({
    filterName,
    removeFilter,
    ...props
}) {

    return (
        <>
            <div className="filterTag">
                <p className="filterTag_text">
                    {filterName}
                </p>
                <button 
                className="filterTag_deleteBtn"
                onClick={()=> removeFilter(filterName)}>
                    <IconRemove />
                </button>
            </div>
        </>
    )
}