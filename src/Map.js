import React from 'react';
import { showDataOnMap } from './util'
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import './Map.css'

function Map({ countries, casesType, center, zoom }) {
   return (
      <div className="map">
         <LeafletMap center={center} zoom={zoom} minZoom={2} maxZoom={6}>
            <TileLayer
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            {showDataOnMap(countries, casesType)}
         </LeafletMap>
      </div>
   )
}

export default Map;

