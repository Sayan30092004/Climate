// src/App.js
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./App.css"; // Include your styles

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const firstYear = 1901;
const lastYear = 2020;

function App() {
  const [tempData, setTempData] = useState(null);     // Data from temp-1901-2020-all.csv
  const [anomalyData, setAnomalyData] = useState(null); // Data from HadCRUT4.csv
  const [topoData, setTopoData] = useState(null);       // GeoJSON from world.geo.json
  const [country, setCountry] = useState("RUS");
  const [year, setYear] = useState(firstYear);
  const [month, setMonth] = useState(0);
  const [moving, setMoving] = useState(true);
  const [intervalRef, setIntervalRef] = useState(null);

  // Load data on mount
  useEffect(() => {
    Promise.all([
      d3.csv(`${process.env.PUBLIC_URL}/data/temp-1901-2020-all.csv`),
      d3.csv(`${process.env.PUBLIC_URL}/data/HadCRUT4.csv`),
      d3.json(`${process.env.PUBLIC_URL}/data/world.geo.json`)
    ]).then(([tempCsv, anomalyCsv, topo]) => {
      // Group tempData per Year and per ISO3
      const groupedTemp = d3.group(
        tempCsv,
        d => d.Year,
        d => d.ISO3
      );
      setTempData(groupedTemp);

      // Group anomalyData by Year
      const groupedAnomaly = d3.group(anomalyCsv, d => d.Year);
      setAnomalyData(groupedAnomaly);

      setTopoData(topo);

      // Optionally, initialize dropdown options here if needed.
    });
  }, []);

  // Set up auto-increment of year
  useEffect(() => {
    if (moving) {
      const intv = d3.interval(() => {
        setYear(prev => (prev < lastYear ? prev + 1 : firstYear));
      }, 400);
      setIntervalRef(intv);
      return () => intv.stop();
    }
  }, [moving]);

  // Handler functions
  const handleSliderChange = (e) => {
    if (moving && intervalRef) {
      intervalRef.stop();
    }
    setYear(+e.target.value);
  };

  const togglePlay = () => {
    setMoving(!moving);
  };

  // UI helpers to generate dropdown items (countries, years, months)
  const renderCountryOptions = () => {
    if (!tempData) return null;
    // Use the first year's data for the list of countries
    const firstYearData = tempData.get(String(firstYear));
    if (!firstYearData) return null;
    return Array.from(firstYearData.keys()).map(iso => {
      const countryName = firstYearData.get(iso)[0].Country;
      return (
        <li key={iso}>
          <button className="dropdown-item" onClick={() => setCountry(iso)} value={iso}>
            {countryName}
          </button>
        </li>
      );
    });
  };

  const renderYearOptions = () => {
    if (!tempData) return null;
    return Array.from(tempData.keys()).map(y => (
      <li key={y}>
        <button className="dropdown-item" onClick={() => setYear(+y)}>{y}</button>
      </li>
    ));
  };

  const renderMonthOptions = () => {
    return monthNames.map((m, i) => (
      <li key={i}>
        <button className="dropdown-item" onClick={() => setMonth(i)}>{m}</button>
      </li>
    ));
  };

  // Prepare data for child components
  const currentYearTempData = tempData ? tempData.get(String(year)) : null;
  const countryData = currentYearTempData ? currentYearTempData.get(country) : null;

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">World Temperature Visualizer</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">
                  Country
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {renderCountryOptions()}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">
                  Year
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {renderYearOptions()}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">
                  Month
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {renderMonthOptions()}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="outerContainer" style={{ marginTop: "80px" }}>
        <div className="centered-flex">
          {/* Choropleth Map */}
          {topoData && currentYearTempData && (
            <ChoroplethMap topoData={topoData} mapData={currentYearTempData} month={month} />
          )}
          {/* Year Slider and Play/Pause Button */}
          <input
            type="range"
            min={firstYear}
            max={lastYear}
            value={year}
            className="slider"
            onChange={handleSliderChange}
          />
          <button id="play-button" className="btn btn-outline-dark" onClick={togglePlay}>
            {moving ? "Pause" : "Play"}
          </button>
        </div>
        <div id="chartContainer" className="chartContainer">
          {countryData && (
            <>
              <PolarArea chartData={countryData} />
              <AreaChart chartData={countryData} />
            </>
          )}
          {anomalyData && (
            <AnomalyRadial anomalyData={anomalyData} year={year} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
