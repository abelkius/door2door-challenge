const cloudEndpoint = 'https://8t4thjdijg.execute-api.eu-central-1.amazonaws.com/development';
const localEndpoint = 'http://localhost:8080';
const endpoint = window.location.hostname === 'localhost' ? localEndpoint : cloudEndpoint;

export default endpoint;
