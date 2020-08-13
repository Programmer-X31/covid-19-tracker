import React from 'react';
import numeral from 'numeral';
import './Table.css';


function Table({ countries }) {
   return (
      <div className="table">
         {
            countries.map(({ country, countryInfo, cases }) => (
               <tr key={countryInfo.iso2}>
                  <img className="table__flag" src={countryInfo.flag} alt="" />
                  <td> {country} </td>
                  <td>
                     <strong>{numeral(cases).format("0,0")}</strong>
                  </td>
               </tr>
            ))
         }

      </div>
   )
}

export default Table
