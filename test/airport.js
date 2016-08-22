var assert = require("assert");
var nock = require("nock");

var flightaware = require('../flightaware.js');

var expectedAirport = {
    name: "Perth Int'l",
    location: "Redcliffe, Western Australia AU",
    latitude: -31.940278,
    longitude: 115.966944,
    timezone: ":Australia/Perth"
}

var expectedNoAirport = {
    error: 'unknown airport INVALID'
}

nock("http://flightxml.flightaware.com/json/FlightXML2", {
        username: "username",
        password: "password",
    })
    .persist()
    .get("/AirportInfo")
    .query({
        airportCode: "YPPH"
    })
    .reply(200, {
        AirportInfoResult: {
            latitude: -31.940278,
            location: "Redcliffe, Western Australia AU",
            longitude: 115.966944,
            name: "Perth Int'l",
            timezone: ":Australia/Perth"
        }
    });

nock("http://flightxml.flightaware.com/json/FlightXML2", {
        username: "username",
        password: "password",
    })
    .get("/AirportInfo")
    .query({
        airportCode: "YPPHXXX"
    })
    .reply(200, {
        error: 'unknown airport INVALID'
    });


describe("Pull airport details (asynchronous)", function() {
    
    after(function() {
        nock.cleanAll();
    });
    
    it("given YPPH, should return code 200", function(done) {
        flightaware.getAirport("YPPH", function(airport) {
            assert.equal(200, airport.code);
            done();
        });
    });

    it("given YPPH, should return Perth Airport details", function(done) {
        flightaware.getAirport("YPPH", function(airport) {
            assert.deepEqual(expectedAirport, airport.result);
            done();
        });
    });

    it("given YPPHXXX, should return error", function(done) {
        flightaware.getAirport("YPPHXXX", function(airport) {
            assert.deepEqual(expectedNoAirport, airport);
            done();
        });
    });

});
