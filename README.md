# Vehicles tracking app

Simple vehicle fullstack tracking app, which visualizes the movement of the vehicles on a map.

# How to start

Prerequisite:
* node: version 6 or higher
* npm or yarn

## To start locally ##
#### Frontend ####

Go to `client` directory and to install all dependencies run:
```bash
yarn install
```
and then build the app and start the server run:
```bash
yarn start
```
Frontend application will be available on `localhost:4000`

#### Backend ####  
Go to `api` directory and to install all dependencies run:
```bash
yarn install
```
and then to start the server:
```bash
yarn start
```
Backend application's endpoints will be available on `localhost:8080`
#### Database ####
The database used for this project is a AWS DynamoDB.
To use it locally you need to install a node implementation called Dynalite.
Run:
```bash
yarn install -g dynalite
```

And then start the database on port `4567`:
```bash
dynolite
```

To start receiving the vahicles updates go to `driver-simulator` directory in `fullstack-code-challenge` project and run:
```bash
yarn start localhost:8080
```

## To test the version deployed to production ##

Go to: https://f550igzw1a.execute-api.eu-central-1.amazonaws.com/development/
This a version which is deployed with help of AWS services: Lambda, API Gateway and DynamoDB.

To use the driver-simulator with this version of the application I had to make some small adjustment to the simulator itself, so it can work with the deployed version of my app.
The reason why is that the deployed backend service is using https protocol as well as doesn't need a port in the url.

The fork of the simulator can be found here: https://github.com/abelkius/fullstack-code-challenge

To run this simulator you need to clone it and the in the `driver-simulator` directory run:
```bash
yarn start 8t4thjdijg.execute-api.eu-central-1.amazonaws.com development
```
the first argument is the hostname, the second - a path prefix.

## Technology used ##
#### Backend ####
I used node.js with express for my backend application. The biggest challenge was the database. I didn't use dynamoDB before, but I wanted to try it so I can learn a little bit more about AWS and also deploy the application on AWS Lambda and to use API Gateway for the communication with my api. In this project the deployment is done using a tool called `up` that allows fast deployment and configuration both for services as well as the static frontend resources.

#### Frontend ####
As far as the frontend is concerned I used `react` library and react-leaflet module for map visualization. I used react, because I find it nice to work with a framework that allows for a lot of flexibility but still is a big help while manipulating the DOM, I am quite new to this library but I do enjoy using it a lot.
Additionaly I used a leaflet plugin called `react-leaflet-markercluster` to show the clustering of the vehicles markers.
I also used `styled-components` for styling inside react components, but global styles are still added as a separate css file.

#### Linting ####
To keep the api part lightweight I didn't wanted to include eslint inside the `api` directory. So I added eslint to the top level directory.
It is possible to run the linter form the top directory after installing dependecies there with:
```bash
yarn install
```
and then running:
```bash
yarn eslint
```

## What didn't make it to the final product ##
* I didn't write the tests for the app. The AWS part of the challenge took me some time and I decided to focus on it and learn something new sacrificing the tests for that.
* The Dockerfile is not there but I do think that the publicly hosted solution is a nicer experience :)
* I am not sure if the solution I used for rejecting the locations outside of the city boundaries was exactly the desired one, it wasn't 100% clear to me.

## Summary ##
I did enjoy this task a lot and learn a bunch of new technologies while developing it :)
