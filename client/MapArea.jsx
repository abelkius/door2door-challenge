import React, {Component} from 'react';
import {Map, TileLayer, Circle, Marker, FeatureGroup, Polyline} from 'react-leaflet';
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
    this.office = [52.53, 13.403];
    this.zoom = 13;
    this.radius = 3500;
  }
  render() {
    let markers = <Spinner />;
    if (this.state.vehicles.length) {
      markers = this.state.vehicles.map(vehicle => {
        const locations = vehicle.locations.map(l => [l.lat, l.lng]);
        if (locations.length) {
          const color = this.colorHash.hex(vehicle.id);

          return (
            <FeatureGroup key={vehicle.id}>
              <Polyline positions={locations} color={color} />
              <Marker
                style={{backgroundColor: color}}
                position={locations[locations.length - 1]}
                icon={createIcon(color)}
              />
            </FeatureGroup>
          );
        }
        return <FeatureGroup key={vehicle.id} />;
      });
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
