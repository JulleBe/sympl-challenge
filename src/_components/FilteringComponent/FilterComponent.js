import React, { useEffect } from 'react';
import './FilterComponent.scss';

import FilterTag from './FilterTagComponent/FilterTagComponent';

export default function FilterComponent ( {
    addToFilter,
    removeFilter,
    selectedFilters,
    updateArray,
    ...props
}) {

    useEffect(()=>  { 
        // Rendert dit component opnieuw elke keer dat de array in de parent component verandert
    }, [selectedFilters]);


    return (
        <>
            <div className="filter_container responsiveFrame">
                <div className="filter_selectedOverview">
                    {selectedFilters.map((filter, index) => {
                        return (
                        <FilterTag 
                            filterName={filter}
                            removeFilter={removeFilter}
                            key={index}
                        />)
                    })}
                </div>
                <div className="filter_clearBtnWrapper">
                    <button className="filter_clearBtn"
                    onClick={() => updateArray([])}>
                        <p>Clear</p>
                    </button>
                </div>
            </div>
        </>
    )
}