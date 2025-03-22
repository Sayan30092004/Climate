// src/components/AnomalyRadial.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
// --- Paste the functions from your anomalyRadial.js here ---
// For example, you can paste the initChart and updateChart functions directly,
// then export them and use them below.

function initAnomalyRadialChart(canvasElement) {
  // (Paste your anomalyRadial.js initChart code here, using canvasElement as the container)
  // For brevity, we assume the code is similar to the original.
  // Example:
  // d3.select(canvasElement).append("svg")....;
}

function updateAnomalyRadialChart(anomalyData, year) {
  // (Paste your anomalyRadial.js updateChart code here)
}

const AnomalyRadial = ({ anomalyData, year }) => {
  const containerRef = useRef();

  // Initialize once
  useEffect(() => {
    if (containerRef.current) {
      initAnomalyRadialChart(containerRef.current);
    }
  }, []);

  // Update when data or year changes
  useEffect(() => {
    if (anomalyData && year) {
      updateAnomalyRadialChart(anomalyData, year);
    }
  }, [anomalyData, year]);

  return <div ref={containerRef} />;
};

export default AnomalyRadial;
