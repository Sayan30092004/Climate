import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import * as d3Geo from 'd3-geo-projection';

function Visualization({ selectedCountry, selectedYear, selectedMonth }) {
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Example of D3 rendering (replace with actual logic)
    const svg = d3
      .select('#choroplethMap')
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);

    svg
      .append('circle')
      .attr('cx', 250)
      .attr('cy', 150)
      .attr('r', 50)
      .attr('fill', 'steelblue');
  }, [selectedCountry, selectedYear, selectedMonth]);

  return (
    <div id="outerContainer">
      <div className="centered-flex">
        <div id="choroplethMap"></div>
        <input
          type="range"
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
          className="slider"
          id="yearSlider"
          min="0"
          max="100"
        />
        <button
          id="play-button"
          className="btn btn-outline-dark shadow-none"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <div id="chartContainer">
        <div id="polarArea">Polar Area Chart</div>
        <div id="areaChart">Area Chart</div>
        <div id="anomalyRadial">Anomaly Radial</div>
      </div>
    </div>
  );
}

export default Visualization;
