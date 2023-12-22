export const isValidObjField = (obj) =>{
    return Object.values(obj).every(value => value.trim());
}

export const updateError = (error, stateUpdater) =>{
    stateUpdater(error);
    setTimeout(()=>{
        stateUpdater('')
    }, 2500);
}

export const isValidEmail = (value) =>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}


export function getDistance(coord1, coord2){
    const R = 6371; // Radius of the Earth in kilometers    
    // Convert latitude and longitude from degrees to radians
    const [lat1, lon1] = coord1.map((coord) => (coord * Math.PI) / 180);
    const [lat2, lon2] = coord2.map((coord) => (coord * Math.PI) / 180);
    // Differences in coordinates
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    
    // Haversine formula
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    // Distance in kilometers
    const distance = R * c;
    return parseInt(distance);
}
