import React from 'react';
import './Table.css'

function Table({ countries }) {
   // const countryCodeLowerCase = iso2.toLowerCase();
   // TODO: Make a iso2 param
   return (
      <div className="table">
         {countries.map(({ country, cases }) => (
            <tr>
               {/* <img src={`https://disease.sh/v3/covid-19/countries/${countryCode}`} alt={country}` /> */}
               <td> {country} </td>
               <td>
                  <strong>{cases}</strong>
               </td>
            </tr>
         ))}
      </div>
   )
}

export default Table
