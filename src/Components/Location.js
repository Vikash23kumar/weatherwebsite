// import React, { useEffect, useState } from "react";

// const Location = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState(null);

//   navigator.geolocation.getCurrentPosition((position) => {
//     setLatitude(position.coords.latitude);
//     setLongitude(position.coords.longitude);
//   });

//   useEffect(() => {
//     const fetchLocationApi = async () => {
//       const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
//       const response = await fetch(url);
//       const responseLocation = await response.json();
//       console.log("Location", responseLocation);
//       setCurrentLocation(responseLocation.locality);
//     };
//     fetchLocationApi();
//   });

//   return (
//     <>
//       <div>Latitude is {latitude}</div>
//       <div>Longitude is {longitude}</div>
//       <div>Current Location is {currentLocation}</div>
//     </>
//   );
// };

// export default Location;

// var GEOCODING =
//   "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
//   position.coords.latitude +
//   "%2C" +
//   position.coords.longitude +
//   "&language=en";
