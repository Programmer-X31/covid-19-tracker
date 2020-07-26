import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from "@material-ui/core"
import './App.css';

function App() {
   const [countries, setCountries] = useState([]); // For getting all countries in the dropdown
   const [country, setCountry] = useState('worldwide'); // Remebering the countries


   useEffect(() => {
      // Getting DATA from an URL
      const getCountriesData = (async () => {
         await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
               const countries = data.map((country) => ({
                  name: country.country,
                  value: country.countryInfo.iso2
               }));

               setCountries(countries);
            });
      });

      getCountriesData();
   }, []);

   const onCountryChange = (async (event) => {
      const countryCode = event.target.value;
      // console.log('Hello', countryCode);
      setCountry(countryCode);
   });

   return (
      <div className="app">
         <div className="app__header">
            <h1> COVID-19 Tracker </h1>
            <FormControl>
               <Select variant="outlined" value={country} onChange={onCountryChange}>
                  <MenuItem value="worldwide"> Worldwide </MenuItem>
                  {
                     countries.map((country) => (
                        <MenuItem value={country.value}> {country.name} </MenuItem>
                     ))
                  }
               </Select>
            </FormControl>
         </div>

      </div>
   );
}

export default App;
