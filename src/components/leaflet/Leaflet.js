import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';

const Leaflet = () => {
    const [position, setPosition] = useState(null)
    const duckIcon = (image, a, b) => new L.Icon({
        iconUrl: image,
        iconSize: [a, b]
    });

    const LocationMarker = () => {
        const map = useMapEvents({
            click() { map.locate() },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })
        return (
            <>
                {
                    position !== null &&
                    <Marker position={position} icon={duckIcon('/red_marker.png', 40, 30)} >
                        <Popup > your position </Popup>
                    </Marker>
                }

                <Marker position={[31.6233775, -8.0636727]} icon={duckIcon('/b_marker.png', 30, 25)}  >
                    <Popup>A v r n i k h</Popup>
                </Marker>
            </>
        )
    }


    useEffect(() => {

        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition([position.coords.latitude, position.coords.longitude]);
            });
        }

        position === null && updatePosition()

        const interval = setInterval(() => { position !== null && updatePosition() }, 1000 * 60 * 1)
        return () => clearInterval(interval)

    }, [position])

    return (
        <>
            <MapContainer
                center={[31.6233775, -8.0636727]}
                zoom={5}
                minZoom={3}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </>
    )
}

export default Leaflet


