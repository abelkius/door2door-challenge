const {client} = require('./dynamoDB');

// utility script for deleting a table
client.deleteTable({}, (err, data) => {
  if (err) {
    console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.info('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
