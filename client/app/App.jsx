import React from 'react';
import {render} from 'react-dom';
import Header from './Header';
import Content from './Content';

const App = () => (
  <div>
    <Header />
    <Content />
  </div>
);

render(<App />, document.getElementById('app'));
