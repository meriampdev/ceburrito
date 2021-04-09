import React from 'react'
import { useRouter } from "next/router"
import jwt from 'jsonwebtoken'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

export default function Locator() {
  const router = useRouter()
  const { query: { data } } = router

  var decoded = jwt.decode(data);

  const center = decoded?.data.coords ?? {lat: 10.2833322, lng: 123.899996}
  const markers = decoded?.data.ceburritos ?? []

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded && decoded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {
          markers.map((marker, i) => {
            return <Marker
              position={marker.coords}
              label={{
                text: marker.name,
                color: "#460354",
                fontWeight: "bold",
              }}
            />
          })
        }
      </GoogleMap>
  ) : <></>
}