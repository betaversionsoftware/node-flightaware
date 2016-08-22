## Flightaware API 

[![Build Status](https://travis-ci.org/betaversionsoftware/node-flightaware.svg?branch=master)](https://travis-ci.org/betaversionsoftware/node-flightaware) [![Coverage Status](https://coveralls.io/repos/github/betaversionsoftware/node-flightaware/badge.svg?branch=master)](https://coveralls.io/github/betaversionsoftware/node-flightaware?branch=master)

### Install
!!!NPM package not released yet
```
npm install node-flightaware --save
```
### Authentication

To access FlightXML 2.0, all requests must include a username and FlightXML Key. This data is transmitted via the "basic" HTTP Authentication standard, which is sent to the FlightXML server as a part of each HTTP request.

http://flightaware.com/commercial/flightxml/key

node-flightaware retrives username and api key from environment variables:

```
export FLIGHTAWARE_USERNAME=aviationgeek
export FLIGHTAWARE_API_KEY=aaabbbccc111
```

### Test
```
npm test
```

### FlightXML 2.0 Documentation
http://flightaware.com/commercial/flightxml/documentation2.rvt

### Suppored API calls

#### AirportInfo
AirportInfo returns information about an airport given an ICAO airport code such as KLAX, KSFO, KORD, KIAH, O07, etc. Data returned includes name (Houston Intercontinental Airport), location (typically city and state), latitude and longitude, and timezone (:America/Chicago).

```js
var flightaware = require('node-flightaware');

flightaware.getAirport('YPPH', function(airport) {
  consoloe.log(airport);
});
```
