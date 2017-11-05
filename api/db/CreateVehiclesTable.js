const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-central-1',
  endpoint: 'http://localhost:4567'
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Vehicles',
  KeySchema: [{AttributeName: 'id', KeyType: 'HASH'}],
  AttributeDefinitions: [{AttributeName: 'id', AttributeType: 'S'}],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.info('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
