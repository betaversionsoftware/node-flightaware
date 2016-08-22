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

describe("Pull airport details (asynchronous)", function() {

    nock("http://flightxml.flightaware.com/json/FlightXML2", {
            username: "username",
            password: "password",
        })
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

    it("given YPPH, should return code 200", function(done) {
        flightaware.getAirport("YPPH", function(airport) {
            assert.equal(200, airport.code);
            done();
        });
    });

    nock("http://flightxml.flightaware.com/json/FlightXML2", {
            username: "username",
            password: "password",
        })
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

    it("given YPPH, should return Perth Airport details", function(done) {
        flightaware.getAirport("YPPH", function(airport) {
            assert.deepEqual(expectedAirport, airport.result);
            done();
        });
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

    it("given YPPHXXX, should return error", function(done) {
        flightaware.getAirport("YPPHXXX", function(airport) {
            assert.deepEqual(expectedNoAirport, airport);
            done();
        });
    });

    nock("http://flightxml.flightaware.com/json/FlightXML2", {
            username: "username",
            password: "password",
        })
        .get("/AirportInfo")
        .query({
            airportCode: "YPPH"
        })
        .reply(401);

    it("given YPPH and no/wrong API credentials, should return 401 Authentication Required", function(done) {
        flightaware.getAirport("YPPH", function(airport) {
            assert.equal(401, airport.code);
            done();
        });
    });

});
