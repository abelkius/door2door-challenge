import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  font-family: sans-serif;
  color: #ffffff;
  text-align: center;
  display: block;
  background-color: #483d8b;
  padding: 20px;
  margin: 0;
`;

const Header = () => <Heading>Track them all!</Heading>;

export default Header;
