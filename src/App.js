import './App.css';
import './styles/_main.scss'
import jobListings from './data.json';
import JobListingComponent from './_components/JobListingComponent/JobListingComponent';
import { useEffect, useState } from 'react';
import FilterComponent from './_components/FilteringComponent/FilterComponent';
import StringHelpers from './_helpers/StringHelpers'
import SearchBar from './_components/SearchBarComponent/SearchBarComponent';

function App() {
  const [selectedFilters, updateFilter] = useState([])
  // Voegt een nieuw filter aan de lijst toe
  function addToFilter(filterName) {
    let isSelected = selectedFilters.includes(filterName)
    if(isSelected !== true) {
      let tempArray = [...selectedFilters];
      tempArray.push(filterName)
      console.log(filterName + ' added')
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
    console.log(filterName + ' removed')
  }

  useEffect(() => {
  
  }, [selectedFilters])

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
        { jobListings.map(listing => {
          
          const IMG = (imgName) => {
            return require(`./assets${StringHelpers.removeFirstPointLogoURL(imgName)}`)
          }
          if(selectedFilters >= 0 ) {
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
                />
            )}
          else {
            selectedFilters.forEach(filter => {
              jobListings.forEach(jobListing => {
                let listingCategories = [ 
                  ...jobListing.languages, 
                  ...jobListing.tools, 
                  jobListing.level,
                  jobListing.role]
                  // Todo: Compare the two arrays to find mathes
                console.log(listingCategories)
              })
            })
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
