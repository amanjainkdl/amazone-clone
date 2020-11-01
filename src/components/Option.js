import React, { useState, useEffect } from 'react'
import myData from './CountriesData.json';

//sort country data
let compare = (a, b) => {
    if (a.country < b.country) {
        return -1;
    }
    if (a.country > b.country) {
        return 1;
    }
    return 0;
}

function Option({countryName, handleCountryName}) {
    myData.sort(compare);
    
    useEffect(() => {
        if (countryName && countryName.length === 0) {
          fetch("https://api.ipdata.co?api-key=test").then(response => response.json()).then(data => {
            console.log("App.js wala", data);
            handleCountryName(data.country_code);
          }
          );
        }
      });

    return (
        <>
            {
                myData.map(data => {
                    if(countryName === data.abbrevation){
                        return <option key={data.abbrevation} value={data.abbrevation} selected>
                        {data.country + ' ' + `${data.calling_code.charAt(0) === '+' ? data.calling_code : '+' + data.calling_code}`}
                    </option>
                    }else{
                        return <option key={data.abbrevation} value={data.abbrevation}>
                        {data.country + ' ' + `${data.calling_code.charAt(0) === '+' ? data.calling_code : '+' + data.calling_code}`}
                    </option>
                    }
                    
                })
            }
        </>
    )
}

export default Option
