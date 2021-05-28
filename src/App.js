import './App.css';
import './styles/_main.scss'
import jobListings from './data.json';
import JobListingComponent from './_components/JobListingComponent/JobListingComponent';
import { useEffect, useState } from 'react';
import FilterComponent from './_components/FilteringComponent/FilterComponent';
import SearchBar from './_components/SearchBarComponent/SearchBarComponent';
import {map} from 'underscore/modules/map.js';

function App() {
  var _ = require('lodash');
  const [selectedFilters, updateFilter] = useState([])
  // Voegt een nieuw filter aan de lijst toe
  function addToFilter(filterName) {
    let isSelected = selectedFilters.includes(filterName);
  

    if(isSelected !== true) {
      let tempArray = [...selectedFilters];
      tempArray.push(filterName)
      updateFilter(tempArray)
    
    }
    else {
      // Waarde al geselecteerd
     
    }
    
  }
  
  // Verwijderd een geselecteerd filter uit de array
  function removeFilter(filterName) {
    let tempArray = [...selectedFilters];
    let indexOfFilter = tempArray.indexOf(filterName)
    tempArray.splice(indexOfFilter, 1)
    updateFilter(tempArray)
  
  }

  function removeFirstPointLogoURL(logoURL) {
    return  logoURL.substring(1);
 }

 

  useEffect(() => {

  }, [selectedFilters ])


  function compareFilters (selFilters, jobFilters) {
    let tempArray = [];
    let matches = false;
    
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
          
        {  
            jobListings.map(listing => {
             
            const IMG = (imgName) => {
              return require(`./assets${removeFirstPointLogoURL(imgName)}`)
            }

            const listingCategories = [
              listing.level,
              listing.role,
              ...listing.tools,
              ...listing.languages
            ]
            if(selectedFilters.length !== 0 ){

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
          }) 
          }
        </div>
     
      </main>
        
      <footer>

      </footer>
    </div>
  );
}

export default App;
