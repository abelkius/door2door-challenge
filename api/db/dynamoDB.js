const AWS = require('aws-sdk');

const TableName = 'Vehicles';
// add table name to every action
const options = {params: {TableName}};

// databse configuration
AWS.config.update({region: 'eu-central-1'});
if (!process.env.UP_STAGE) {
  // local database endpoint
  AWS.config.update({endpoint: 'http://localhost:4567'});
}

module.exports = {
  client: new AWS.DynamoDB(options),
  docClient: new AWS.DynamoDB.DocumentClient(options)
};
