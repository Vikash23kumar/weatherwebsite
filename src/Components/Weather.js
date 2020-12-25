import React, { useEffect, useState } from "react";

const Weather = () => {
  let date = new Date().toDateString();
  let time = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(time);
  const [city, setCity] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [search, setSearch] = useState();
  const [country, setCountry] = useState(null);
  const [visibility, setVisibility] = useState();
  const [isAllow, setIsAllow] = useState(true);
  const [submit, setSubmit] = useState("");
  // const [sunrise, setSunrise] = useState(null);
  // const [sunset, setSunset] = useState(null);
  // console.log("Location", currentLocation);
  navigator.geolocation.getCurrentPosition((position) => {
    if (position) {
      setIsAllow(true);
    }
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    // console.log("Position", position);
  });

  useEffect(() => {
    const fetchLocationApi = async () => {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      const response = await fetch(url);
      const responseLocation = await response.json();
      setCurrentLocation(responseLocation.locality);
    };
    fetchLocationApi();
  }, [isAllow]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=1be3ada851b2e15493b2e7fefda37188`;
    const response = await fetch(searchUrl);
    const resJson = await response.json();
    setCity(resJson.main);
    setCountry(resJson.sys);
    setVisibility(resJson.visibility);
    // setSearch(search);
    setSubmit(search);
  };

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  };

  setInterval(UpdateTime, 1000);

  useEffect(() => {
    const fetchByLocation = async () => {
      const currentLocationUrl = `http://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=metric&appid=1be3ada851b2e15493b2e7fefda37188`;
      const response = await fetch(currentLocationUrl);
      const resJson = await response.json();
      setCity(resJson.main);
      setCountry(resJson.sys);
      setVisibility(resJson.visibility);
    };
    fetchByLocation();
  }, [currentLocation]);

  let curDate = new Date();
  let currDate = curDate.getHours();
  let greeting = "";

  const cssStyle = {};

  if (currDate >= 1 && currDate < 12) {
    greeting = "Good Morning";
    cssStyle.color = "green";
  } else if (currDate >= 12 && currDate < 16) {
    greeting = "Good Afternoon";
    cssStyle.color = "orange";
  } else {
    greeting = "Good Evening";
    cssStyle.color = "black";
  }

  return (
    <>
      <div className="row">
        <div className="col-auto m-auto">
          <div className="box">
            <div className="inputData">
              <form
                class="d-flex mt-2"
                onSubmit={(e) => {
                  onSubmit(e);
                }}
              >
                <input
                  type="search"
                  className="inputField text-center"
                  placeholder="Enter City Name"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
                <button className="btn btn-primary col-auto m-auto">
                  Search
                </button>
              </form>
            </div>

            {/* <div>Latitude is {latitude}</div>
            <div>Longitude is {longitude}</div>
            <div>Current Location is {currentLocation}</div> */}

            <div className="mt-2">
              <h4 className="atert alert-warning text-center">
                <span style={cssStyle}>{greeting}</span>
              </h4>
            </div>

            <div className="text-center">
              <h3>{date}</h3>
              <h3>{ctime}</h3>
            </div>

            {!city || !country ? (
              <p className="alert text-center" style={{ color: "red" }}>
                <b>No Data Found</b>
              </p>
            ) : (
              <>
                <div className="info">
                  <h6 className="location">
                    <i className="fas fa-street-view"></i>
                    {!search ? (
                      <>
                        <div>
                          {currentLocation}, {country.country}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          {submit}, {country.country}
                        </div>
                      </>
                    )}
                  </h6>
                  <h1 className="temp">{city.temp}°Cel</h1>
                  <h3 className="tempmin_max">
                    Min Temp : {city.temp_min}°Cel | Max Temp : {city.temp_max}
                    °Cel
                  </h3>
                  <h3 className="tempmin_max">
                    Temp feel : {city.feels_like}°Cel
                  </h3>
                  <h3 className="tempmin_max">Pressure : {city.pressure} mb</h3>
                  <h3 className="tempmin_max">Humidity : {city.humidity}%</h3>
                  <h3 className="tempmin_max">Visibility : {visibility} m</h3>
                  {/* <h3 className="tempmin_max">
                    Sunrise: {sunrise} AM | Sunset: {sunset} PM
                  </h3> */}
                </div>
                <div className="wave -one"></div>
                <div className="wave -two"></div>
                <div className="wave -three"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
