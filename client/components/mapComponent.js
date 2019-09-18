import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100vw",
  height: "calc(80vh - 80px)",
  postion: "absolute"
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiY2l0cnVzdmFuaWxsYSIsImEiOiJjanVuNDRvdTYxOXpyNGVzNjh3NzZhaDc3In0.cK4TvqJbaPdUJyfMcPdjpQ";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/citrusvanilla/cjyqq8ne009e31crpwz6chbmt", // stylesheet location
        center: [0, 0],
        zoom: 5
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
