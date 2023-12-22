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
