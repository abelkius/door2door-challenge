const AWS = require('aws-sdk');

const TableName = 'Vehicles';
const options = {params: {TableName}};

AWS.config.update({region: 'eu-central-1'});
if (!process.env.UP_STAGE) {
  AWS.config.update({endpoint: 'http://localhost:4567'});
}

module.exports = {
  client: new AWS.DynamoDB(options),
  docClient: new AWS.DynamoDB.DocumentClient(options)
};
