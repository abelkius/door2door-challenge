import React, {Component} from 'react';
import {Map, TileLayer, Circle, FeatureGroup, Polyline} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import ColorHash from 'color-hash';
import createIcon from './Icon';
import Spinner from './Spinner';

class MapArea extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      vehicles: []
    };
    this.colorHash = new ColorHash();
    this.prepareMap();
  }

  componentDidMount() {
    setInterval(this.getVehicles.bind(this), 3000);
  }

  getVehicles() {
    const reqConfig = {
      method: 'GET',
      mode: 'cors'
    };

    fetch('http://localhost:8080/vehicles', reqConfig)
      .then(res => res.json())
      .then(data => {
        console.info('data: ', data);
        this.setState({vehicles: data});
      })
      .catch(err => console.error('Error: ', err));
  }

  prepareMap() {
    this.config = {
      office: [52.53, 13.403],
      zoom: 13,
      radius: 3500,
      themeColor: '#483d8b',
      bgColor: '#ffffff'
    };
  }
  render() {
    let vehicleMarkers = <Spinner />;
    if (this.state.vehicles.length) {
      vehicleMarkers = this.state.vehicles.map(vehicle => {
        const locations = vehicle.locations.map(l => [l.lat, l.lng]);
        if (locations.length) {
          const color = this.colorHash.hex(vehicle.id);

          return (
            <FeatureGroup key={vehicle.id}>
              <Polyline positions={locations} color={color} opacity={0.5} />
            </FeatureGroup>
          );
        }
        return <FeatureGroup key={vehicle.id} />;
      });
    }

    let clusteredMarkers = [];
    if (this.state.vehicles.length) {
      clusteredMarkers = this.state.vehicles
        .map(vehicle => {
          const color = this.colorHash.hex(vehicle.id);
          const lastPos = vehicle.locations[vehicle.locations.length - 1];
          if (lastPos) {
            console.log(Date.now());
            console.log(Date.parse(lastPos.at));
          }
          return lastPos && Date.parse(lastPos.at) + 6000 >= Date.now()
            ? {
                position: [lastPos.lat, lastPos.lng],
                options: {
                  icon: createIcon(color)
                }
              }
            : null;
        })
        .filter(pos => pos !== null);
    }

    return (
      <Map center={this.config.office} zoom={this.config.zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle
          center={this.config.office}
          radius={this.config.radius}
          fillColor={this.config.bgColor}
          fillOpacity={0.5}
          color={this.config.themeColor}
        />
        <MarkerClusterGroup markers={clusteredMarkers} />
        {vehicleMarkers}
      </Map>
    );
  }
}

export default MapArea;
