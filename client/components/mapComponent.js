import React, { useEffect, useRef, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppContext } from "../context";

const styles = {
  width: "100vw",
  height: "calc(80vh - 80px)",
  postion: "absolute"
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const value = useContext(AppContext);
  // console.log(value);

  // Use effect to fly around and add points to the map.
  useEffect(() => {
    // If result...
    if (value.geoLocatedCoordinates) {
      // Fly to geoLocatedCoordinates.
      map.flyTo({ center: value.geoLocatedCoordinates, zoom: 14 });

      // Add geoLocatedCoordinate to the map.
      map.removeLayer('points');
      map.removeSource('points');
      map.addLayer({
        "id": "points",
        "type": "symbol",
        "layout": {
          "icon-image": "{icon}",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        },
        "paint": {
          "text-color": "#eee"
        },
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": value.geoLocatedCoordinates
                },
                "properties": {
                  "title": "Your location",
                  "icon": "marker-stroked-15",
                  "marker-size": 'large',
                  'marker-color': '#3CB371',
                }
              },
              ...value.closestPlaces.map(place => {
                return {
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": place.coordinates
                  },
                  "properties": {
                    "title": place.name,
                    "icon": "garden-15",
                    "marker-size": 'large',
                    'marker-color': '#3bb2d0',
                  }
                }
              })
            ]
          }
        }

      });

    };

  }, [value])

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoidGJ1cnJpbmd0b24iLCJhIjoiY2swcGxmcHE1MDZxaDNicWx3MWN1YzQ1OSJ9.isVnLz4AfpqjoxSSgj5Jww";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/tburrington/ck0pm912b0r561cucb1wpo5n6", // stylesheet location
        center: [-118.4695, 33.9850],
        zoom: 10
      });

      map.on("load", () => {
        setMap(map);
        map.resize();

        map.addLayer({
          "id": "points",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
              "type": "Feature",
              "geometry": {
              "type": "Point",
              "coordinates": [-77.03238901390978, 38.913188059745586]
          },
          "properties": {
          "title": "Mapbox DC",
          "icon": "monument"
          }
          }, {
          "type": "Feature",
          "geometry": {
          "type": "Point",
          "coordinates": [-122.414, 37.776]
          },
          "properties": {
          "title": "Mapbox SF",
          "icon": "harbor"
          }
          }]
          }
          },
          "layout": {
          "icon-image": "{icon}-15",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
          }
          });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
