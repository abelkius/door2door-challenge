const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:4567'
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Vehicles'
};

dynamodb.deleteTable(params, (err, data) => {
  if (err) {
    console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.info('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
