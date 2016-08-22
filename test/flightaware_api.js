var assert = require("assert");
var nock = require("nock");

var flightaware = require('../flightaware.js');

nock("http://flightxml.flightaware.com/json/FlightXML2", {
        username: "username",
        password: "password",
    })
    .persist()
    .get("/AirportInfo")
    .query({
        airportCode: "YPPH"
    })
    .reply(401);

nock("http://bogus.flightaware.com/json/FlightXML2", {
        username: "username",
        password: "password",
    })
    .persist()
    .get("/AirportInfo")
    .query({
        airportCode: "YPPH"
    })
    .replyWithError({error:"ENOTFOUND"});

describe("Flightaware API test", function() {

    after(function() {
        nock.cleanAll();
    });

    it("given YPPH and no/wrong API credentials, should return 401 Authentication Required", function(done) {
        flightaware.getAirport("YPPH", function(airport) {
            assert.equal(401, airport.code);
            done();
        });
    });
    
    it("given bogus API url, should return error", function(done) {
        flightaware.setAPIUrl("http://bogus.flightaware.com/json/FlightXML2");
        flightaware.getAirport("YPPH", function(airport) {
            assert.deepEqual({error: "ENOTFOUND"}, airport);
            done();
        });
    });

});
