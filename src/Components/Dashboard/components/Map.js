import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import mapboxgl from "mapbox-gl";

import Context from "../context";
export default function Map() {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const { loc, buoyMarkers } = useContext(Context);

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/satellite-streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on("move", () => {
            const lng = map.current.getCenter().lng.toFixed(4);
            setLng(lng);

            const lat = map.current.getCenter().lat.toFixed(4);
            setLat(lat);

            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    useEffect(() => {
        console.log(buoyMarkers);
        Object.keys(buoyMarkers).forEach((buoyId) => {
            const buoy = buoyMarkers[buoyId];
            const { LON, LAT } = buoy[0];
            const marker = new mapboxgl.Marker()
                .setLngLat({ lat: LAT, lng: LON })
                .addTo(map.current);
        });
    }, [buoyMarkers]);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize

        if (!loc.latitude || !loc.longitude) return;
        setLat(loc.latitude);
        setLng(loc.longitude);
        map.current.setCenter({
            lat: loc.latitude,
            lon: loc.longitude,
        });
    }, [loc]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div
                style={{ width: "100%", height: "100%" }}
                ref={mapContainer}
                className="map-container"
            />
        </div>
    );
}
