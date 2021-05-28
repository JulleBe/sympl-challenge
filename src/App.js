// Main app component
import './App.css';
import './styles/_main.scss'
import { useEffect, useState } from 'react';
// Componenten
import JobListingComponent from './_components/JobListingComponent/JobListingComponent';
import FilterComponent from './_components/FilteringComponent/FilterComponent';
import SearchBar from './_components/SearchBarComponent/SearchBarComponent';
// Data
import jobListings from './data.json';
function App() {
  var _ = require('lodash');
  const [selectedFilters, updateFilter] = useState([])
  // Voegt een nieuw filter aan de lijst toe
  function addToFilter(filterName) {
    // Check of de filter wel of niet aangeduid is.
    let isSelected = selectedFilters.includes(filterName);
    // Indien deze niet aangeduid is, wordt deze toegevoegd aan de lijst
    if(isSelected !== true) {
      let tempArray = [...selectedFilters];
      tempArray.push(filterName)
      updateFilter(tempArray)
    }
    else {
      // Waarde al geselecteerd, niks moet gedaan worden
     
    }
    
  }
  
  // Verwijderd een geselecteerd filter uit de array
  function removeFilter(filterName) {
    let tempArray = [...selectedFilters];
    let indexOfFilter = tempArray.indexOf(filterName)
    tempArray.splice(indexOfFilter, 1)
    updateFilter(tempArray)
  }

  // Functie dat de eerste punt van de Logo URL string verwijderd voor de require
  function removeFirstPointLogoURL(logoURL) {
    return  logoURL.substring(1);
 }
  // Houd de geselecteerde filters in het oog
  useEffect(() => {

  }, [selectedFilters ])
  // Vergelijkt 2 arrayen om te checken of job listing wel past bij de aangeduidde filter
  function compareFilters (selFilters, jobFilters) {
    let tempArray = [];    
    // Sorteren van beide arrays
    selFilters.sort()
    jobFilters.sort()
  
    tempArray = selFilters.filter(e => jobFilters.indexOf(e) !== -1)
    // 2 arrays vergelijken 
    tempArray.sort()
    // Matchen van filters 
    let matchedFilters = _.intersection(selFilters, jobFilters);
    // Als beiden arrays gelijkstaan -> true returnen
    if(matchedFilters.length === selFilters.length) {
        return true
    }else {
      return false;
    }
  }

  return (

    <div className="App">
      <header>
        <div className="header_contentWrapper">
          <div className="header_title">
            <h2>Sympl job search</h2>
            <h4>By Julien Menten</h4>
          </div>
          <div className="header_searchBarWrapper">
              <SearchBar />
          </div>
        </div>
      </header>
      <main>
      {selectedFilters.length > 0 && 
        <div className="filter_wrapper">
            <FilterComponent 
              addToFilter={addToFilter}
              removeFilter={removeFilter}
              selectedFilters={selectedFilters}
              key={'Filter component'}
              updateArray={updateFilter}/>
        </div>
        }
        <div className="jobListing_wrapper">  
          {   // Loopt over de job listings en rendert deze binnen de DOM
              jobListings.map(listing => {
              // Laad de afbeeldingen binnen vanuit de assets folder met een dynamische link
              const IMG = (imgName) => {
                return require(`./assets${removeFirstPointLogoURL(imgName)}`)
              }
              // Verzamelt alle mogelijke filters
              const listingCategories = [
                listing.level,
                listing.role,
                ...listing.tools,
                ...listing.languages
              ]
              // Indien er geen filters aangeduid zijn, worden de listings normaal gerenderd
              if(selectedFilters.length !== 0 ){
                // Enkel wanneer de filters aangeduid zijn, worden deze gefilterd
                if((compareFilters(selectedFilters, listingCategories) === true)){
                  return ( 
                    <JobListingComponent 
                      key={`${listing.li}-${listing.company}`}
                      companyName={listing.company}
                      companyLogo={IMG(listing.logo)}
                      isNew={listing.new}
                      isFeatured={listing.featured}
                      functionTitle={listing.position}
                      functionLevel={listing.level}
                      functionRole={listing.role}
                      contractType={listing.contract}
                      location={listing.location}
                      tools={listing.tools}
                      languages={listing.languages}
                      postedAt={listing.postedAt}
                      addToFilterfunction={addToFilter} 
                      selectedFilters={selectedFilters}
                      removeFromFilters={removeFilter}
                      />)
                  }
              }else {
                // Geen filter aangeduid, dus worden ze allemaal gerenderd
                return (
                  <JobListingComponent 
                    key={`${listing.li}-${listing.company}`}
                    companyName={listing.company}
                    companyLogo={IMG(listing.logo)}
                    isNew={listing.new}
                    isFeatured={listing.featured}
                    functionTitle={listing.position}
                    functionLevel={listing.level}
                    functionRole={listing.role}
                    contractType={listing.contract}
                    location={listing.location}
                    tools={listing.tools}
                    languages={listing.languages}
                    postedAt={listing.postedAt}
                    addToFilterfunction={addToFilter} 
                    selectedFilters={selectedFilters}
                    removeFromFilters={removeFilter}
                    />)
              }
            })}
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
