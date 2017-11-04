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

const Spinner = () => <Image src="/img/loader.svg" />;

export default Spinner;
