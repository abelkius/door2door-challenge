const {docClient} = require('../../db/DynamoDB');

const createVehicle = (req, res, next) => {
  const params = {
    Item: {
      id: req.body.id,
      locations: []
    }
  };

  docClient.put(params, err => {
    if (err) {
      next(Error('Unable to add vehicle. Error JSON:', JSON.stringify(err, null, 2)));
    } else {
      console.info('Added vehicle:', req.params.id);
      res.status(204).json();
    }
  });
};

const getVehicle = (req, res, next) => {
  const params = {
    ConsistentRead: true,
    Key: {
      id: req.params.id
    }
  };

  docClient.get(params, (err, data) => {
    if (err || !data.Item) {
      next(new Error(`Unable to read vehicle.\n${JSON.stringify(err, null, 2)}`));
    } else {
      console.info('Getting vehicle succeeded:', data.Item.id);
      res.json(data.Item);
    }
  });
};
const deleteVehicle = (req, res, next) => {
  const params = {
    Key: {
      id: req.params.id
    }
  };

  docClient.delete(params, err => {
    if (err) {
      next(Error('Unable to delete vehicle. Error JSON:', JSON.stringify(err, null, 2)));
    } else {
      console.info('Deleting vehicle succeeded:', req.params.id);
      res.status(204).send();
    }
  });
};
const getAllVehicles = (req, res, next) => {
  const result = [];

  docClient.scan({}, onScan);

  function onScan(err, data) {
    if (err) {
      next(new Error(`Unable to scan the table.\n${JSON.stringify(err, null, 2)}`));
    } else {
      // get all vehicles
      console.info('Scan succeeded.');
      result.push(...data.Items);

      // continue scanning if data exceeds 1MB, which is a scan limit in dynamDB
      if (typeof data.LastEvaluatedKey !== 'undefined') {
        console.info('Scanning for more...');
        docClient.scan({ExclusiveStartKey: data.LastEvaluatedKey}, onScan);
      }
      res.json(result);
    }
  }
};
const addLocation = (req, res, next) => {
  const params = {
    Key: {
      id: req.params.id
    },
    UpdateExpression: 'set locations = list_append(locations, :l)',
    ExpressionAttributeValues: {
      ':l': [req.body]
    },
    ReturnValues: 'UPDATED_NEW'
  };

  docClient.update(params, err => {
    if (err) {
      console.error('Unable to update location. Error JSON:', JSON.stringify(err, null, 2));
      next();
    } else {
      console.info('Updating vehicle with new location succeeded:', req.params.id);
      res.status(204).send();
    }
  });
};

module.exports = {
  createVehicle,
  getVehicle,
  deleteVehicle,
  getAllVehicles,
  addLocation
};
