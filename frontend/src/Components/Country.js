import React from "react";
export default function CountryDesc(country, city, description,img, long, lat){
    return(
        <div className="Country">
            <img src={img} alt='Country Img' style={{ width: '200px', height: '150px' }} />
            <h1>{country}, {city}</h1>
            <p>{description}</p>
            <button onClick={() => {window.open(`https://www.google.com/maps/@${lat},${long},8z`, "_blank")}} >View on Google Maps</button>
        </div>
    )
}