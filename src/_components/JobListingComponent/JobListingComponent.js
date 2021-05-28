// Job listing componeent, rendert de job listing met de juiste data
import React, { useState } from 'react'; 
import './JobListingComponent.scss';
//Componenten
import FilterButton from '../FilterButtonComponent/FilterButtonComponent';


export default function JobListingComponent ({
    // Database data
    companyName,
    companyLogo,
    functionTitle,
    functionLevel,
    functionRole,
    contractType,
    isFeatured,
    isNew,
    location,
    languages,
    tools,
    postedAt,
    addToFilterfunction,
    selectedFilters,
    removeFromFilters,
    ...props 
}) {
    
    const [isActive, setActive] = useState(false)
    const categories = [functionRole, functionLevel, ...tools, ...languages];
    
    // Toggle functie om de stijl van de listing aan te passen als deze geclickt is 
    function toggleActive() {
        setActive(!isActive);
    }

    return (
        <>
        <article 
        className={`listingContainer ${isActive ?'listing_isActive' : '' } responsiveFrame`} >
           <div className="listing_logoContainer">
                <picture>
                    <img src={companyLogo.default} alt={`${companyName} logo`} />
                </picture>
            </div>
            <div className="listingInfo">
           
            <div className="listing_companyName">
                <h4>{companyName}</h4> 
                <div className='listing_tagsContainer'> 
                    {isNew && <NewTag/>}
                    {isFeatured && <FeaturedTag/>}
                </div> 
            </div>
            <div className="listing_jobFunction" onClick={() => toggleActive()}>
                <h3>{functionTitle}</h3>
            </div>
            <div className="listing_jobInformation">
                <ul>
                    <li key="postedAt">{postedAt}</li>
                    <li key="contractType">{contractType}</li>
                    <li key="location">{location}</li>
                </ul>
            </div>
            </div>
            <div className="listing_filtersWrapper">
                {categories.map( (cat, index) => {
                    return (<FilterButton 
                        key={`${cat}-${index}`}
                        text={cat} 
                        addToFilterFunction={addToFilterfunction}
                        selectedFilters={selectedFilters}
                        removeFromFilters={removeFromFilters}/>)
                })}
            </div>
        </article>
        </>
    )
}

function NewTag () {
    return (
        <div className="listing_newTag listing_tag">
            <p>New!</p>
        </div>
    )
}

function FeaturedTag () {
    return (
        <div className="listing_featuredTag listing_tag">
            <p>Featured</p>
        </div>
    )
}