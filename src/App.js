import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from './Map';
import Table from "./Table";
import LineGraph from './LineGraph'
import { sortData } from "./util"
import './App.css';
import "leaflet/dist/leaflet.css"

function App() {
   const [countries, setCountries] = useState([]); // For getting all countries in the dropdown
   const [country, setCountry] = useState('worldwide'); // Remebering the countries
   const [tableData, setTableData] = useState([])
   const [countryInfo, setCountryInfo] = useState({});
   const [mapCenter, setMapCenter] = useState({
      lat: 34.80746,
      lng: -40.4796,
   });
   const [mapZoom, setMapZoom] = useState(3);
   const [mapCountries, setMapCountries] = useState([])

   useEffect(() => {
      fetch('https://disease.sh/v3/covid-19/all')
         .then((response) => response.json())
         .then((data) => {
            setCountryInfo(data);
            console.log(data);
         })
   }, []);

   useEffect(() => {
      //  Getting DATA from an URL
      const getCountriesData = (async () => {
         await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
               const countries = data.map((country) => ({
                  name: country.country,
                  value: country.countryInfo.iso2
               }));
               const sortedData = sortData(data);
               setTableData(sortedData);
               setCountries(countries);
               setMapCountries(data);
            });
      });

      getCountriesData();
   }, []);

   const onCountryChange = async (event) => {
      const countryCode = event.target.value;
      setCountry(countryCode);
      const url =
         countryCode === 'worldwide'
            ? '​https://disease.sh/v3/covid-19/all'
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url)
         .then((response) => response.json())
         .then((data) => {
            setCountryInfo(data);
            setCountry(countryCode);
            console.log(data.countryInfo)

            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            setMapZoom(4);
         })
   };

   return (
      <div className="app">
         <div className="app__left">
            <div className="app__header">
               <h1> COVID-19 Tracker</h1>

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

            <div className="app__stats">
               <InfoBox
                  title="Coronavirus Cases"
                  total={countryInfo.cases}
                  cases={countryInfo.todayCases} />
               <InfoBox
                  title="Recovered"
                  total={countryInfo.recovered}
                  cases={countryInfo.todayRecovered}
               />
               <InfoBox
                  title="Deaths"
                  total={countryInfo.deaths}
                  cases={countryInfo.todayDeaths}
               />
            </div>

            <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
         </div>

         <Card className="app__right">
            <CardContent>
               {/* Table */}
               <h3> Live Cases by Country</h3>
               <Table countries={tableData} />

               {/* GRAPH */}
               <h3> Worldwide New Cases</h3>
               <LineGraph />
            </CardContent>
         </Card>

      </div>

   );
}

export default App;
