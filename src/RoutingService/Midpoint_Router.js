import React, {useEffect, useRef, useState} from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useSelector} from 'react-redux';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY
const Midpoint_Router = () => {
        const [map, setMap] = useState(null);
        const mapContainer = useRef(null);
        const routeInformation = useSelector(state => state.routeInfo)
        useEffect(() => {
             mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
             const initializeMap = ({ setMap, mapContainer }) => {
             const map = new mapboxgl.Map({
                 accessToken: process.env.REACT_APP_MAPBOX_KEY,
                 container: mapContainer.current,
                 style: `mapbox://styles/mapbox/light-v11`,
                 center: [routeInformation[1], routeInformation[0]],
                 zoom: 16,
                 dragPan: true,
                 boxZoom: false,
                 scrollZoom: false,
                 touchPitch: false,
                 touchZoomRotate: false
            });

                 const start_coords = [routeInformation[1], routeInformation[0]];
                 const end_coords = [routeInformation[3], routeInformation[2]]

                     async function getRoute() {
                     // make a directions request using walking profile
                     // start and end will change according to user's location and system use
                     const query =
                          await fetch(
                             `https://api.mapbox.com/directions/v5/mapbox/walking/${start_coords[0]},${start_coords[1]};${end_coords[0]},${end_coords[1]}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_KEY}`,
                             {method: 'GET'}
                         );

                     const json = await query.json();
                     const data = json.routes[0];
                     const route = data.geometry.coordinates;
                     const geojson = {
                         type: 'Feature',
                         properties: {},
                         geometry: {
                             type: 'LineString',
                             coordinates: route
                         }
                     };

                     map.addLayer({
                         id: 'route',
                         type: 'line',
                         source: {
                             type: 'geojson',
                             data: geojson
                         },
                         layout: {
                             'line-join': 'round',
                             'line-cap': 'round'
                         },
                         paint: {
                             'line-color': '#FF0000',
                             'line-width': 4,
                             'line-opacity': 0.75
                         }
                     });

                     // Add starting point to the map
                     map.addLayer({
                         id: 'point',
                         type: 'circle',
                         source: {
                             type: 'geojson',
                             data: {
                                 type: 'FeatureCollection',
                                 features: [
                                     {
                                         type: 'Feature',
                                         properties: {},
                                         geometry: {
                                             type: 'Point',
                                             coordinates: start_coords
                                         }
                                     }
                                 ]
                             }
                         },
                         paint: {
                             'circle-radius': 4,
                             'circle-color': '#D3D3D3'
                         }
                     });
                     map.addLayer({
                         id: 'end',
                         type: 'circle',
                         source: {
                             type: 'geojson',
                             data: {
                                 type: 'FeatureCollection',
                                 features: [
                                     {
                                         type: 'Feature',
                                         properties: {},
                                         geometry: {
                                             type: 'Point',
                                             coordinates: end_coords
                                         }
                                     }
                                 ]
                             }
                         },
                         paint: {
                             'circle-radius': 4,
                             'circle-color': '#D3D3D3'
                         }
                     });

                 }
                 setTimeout(() => {
                     getRoute()
                 }, 2000)
            map.on("load", () => {
                setMap(map);
                map.resize();
            });
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map, routeInformation]);

    return (
        <div className="mapContainer" ref={el => (mapContainer.current = el)}>
        </div>
    );

    }



export default Midpoint_Router;