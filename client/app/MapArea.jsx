import React from 'react';
import PropTypes from 'prop-types';
import {Map, TileLayer, Circle, Polyline} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import ColorHash from 'color-hash';
import createIcon from './Icon';

const colorHash = new ColorHash();
const config = {
  office: [52.53, 13.403],
  zoom: 13,
  maxZoom: 20,
  radius: 3500,
  themeColor: '#483d8b',
  bgColor: '#ffffff'
};

// pure component which renders the map with
// vehicles visualisation based on the received data
const MapArea = ({vehicles}) => {
  let clusteredMarkers = [];
  if (vehicles.length) {
    clusteredMarkers = vehicles
      .filter(vehicle => Boolean(vehicle.locations[vehicle.locations.length - 1]))
      .map(vehicle => {
        const lastPos = vehicle.locations[vehicle.locations.length - 1];
        const color = colorHash.hex(vehicle.id);
        return {
          position: [lastPos.lat, lastPos.lng],
          options: {
            icon: createIcon(color)
          }
        };
      });
  }

  return (
    <Map center={config.office} zoom={config.zoom} maxZoom={config.maxZoom}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle
        center={config.office}
        radius={config.radius}
        fillColor={config.bgColor}
        fillOpacity={0.5}
        color={config.themeColor}
      />
      <MarkerClusterGroup markers={clusteredMarkers} />
      {vehicles
        .filter(vehicle => vehicle.locations.length)
        .map(vehicle => (
          <Polyline
            key={vehicle.id}
            positions={vehicle.locations.map(l => [l.lat, l.lng])}
            color={colorHash.hex(vehicle.id)}
            opacity={0.5}
          />
        ))}
    </Map>
  );
};

MapArea.propTypes = {
  vehicles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      locations: PropTypes.arrayOf(
        PropTypes.shape({
          lat: PropTypes.number,
          lng: PropTypes.number,
          at: PropTypes.string
        })
      )
    })
  )
};

export default MapArea;
