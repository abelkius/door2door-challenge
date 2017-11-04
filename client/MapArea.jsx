import React, {Component} from 'react';
import {Map, TileLayer, Circle, Marker} from 'react-leaflet';
import Leaflet from 'leaflet';
import Spinner from './Spinner';

class MapArea extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      vehicles: []
    };
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
    this.vehicleIcon = Leaflet.icon({
      iconUrl: '/img/car.svg',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76]
    });

    this.office = [52.53, 13.403];
    this.zoom = 13;
    this.radius = 3500;
  }
  render() {
    let markers;
    if (this.state.vehicles.length) {
      markers = this.state.vehicles.map(vehicle => {
        const lastPos = vehicle.locations[vehicle.locations.length - 1];
        if (lastPos) {
          return <Marker key={vehicle.id} position={[lastPos.lat, lastPos.lng]} icon={this.vehicleIcon} />;
        }
        return '';
      });
    } else {
      markers = <Spinner />;
    }
    return (
      <Map center={this.office} zoom={this.zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle center={this.office} radius={this.radius} fillColor={'#483d8b'} fillOpacity={0.2} color={'#483d8b'} />
        {markers}
      </Map>
    );
  }
}

export default MapArea;
