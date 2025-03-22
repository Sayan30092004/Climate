// src/components/ChoroplethMap.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function initChoropleth(canvasElement) {
  // Paste your choroplethMap.js initChart code here.
}

function updateChoropleth(topoData, data, month) {
  // Paste your choroplethMap.js updateChart code here.
}

const ChoroplethMap = ({ topoData, mapData, month }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      initChoropleth(containerRef.current);
    }
  }, []);

  useEffect(() => {
    if (topoData && mapData) {
      updateChoropleth(topoData, mapData, month);
    }
  }, [topoData, mapData, month]);

  return <div ref={containerRef} />;
};

export default ChoroplethMap;
