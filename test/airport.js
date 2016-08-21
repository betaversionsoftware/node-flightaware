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

var faAirport = nock("http://flightxml.flightaware.com/json/FlightXML2", {
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

describe("Pull airport details (asynchronous)", function() {

    it("should return Perth Airport details", function(done) {
        flightaware.getAirport("YPPH", function(airport) {
            assert.deepEqual(expectedAirport, airport);
            done();
        });
    });

});