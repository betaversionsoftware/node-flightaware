var _USERNAME = "";
var _API_KEY = "";

var _FXML_URL = "http://flightxml.flightaware.com/json/FlightXML2/";

var _API_FLIGHT = "FlightInfoEx";
var _API_AIRPORT = "AirportInfo";

var restclient = require("restler");


exports.access = function(query) {
    return {
        username: _USERNAME,
        password: _API_KEY,
        query: query
    }
}

exports.getAirport = function(code, callback) {

    restclient.get(_FXML_URL + _API_AIRPORT,
        this.access({
            airportCode: code
        })
    ).on("success", function(result, response) {
        if(result.AirportInfoResult) {
            return callback(result.AirportInfoResult);
        };
    }).on("error", function(error, response) {
        console.log(error);
    });

}