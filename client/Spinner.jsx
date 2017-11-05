import React from 'react';
import styled, {keyframes} from 'styled-components';

const spin = keyframes`
  from {
    transfrom: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Image = styled.img`
  animation: ${spin} 3s infinite linear;
`;

const Div = styled.div`
  display: block;
  text-align: center;
  width: 100%;
  margin: 50px auto;
`;

const Spinner = () => (
  <Div>
    <Image src="/img/loader.svg" />
  </Div>
);

export default Spinner;
