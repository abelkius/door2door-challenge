import React from 'react';
import {render} from 'react-dom';
import Header from './Header';
import MapArea from './MapArea';

const App = () => (
  <div>
    <Header />
    <MapArea />
  </div>
);

render(<App />, document.getElementById('app'));
