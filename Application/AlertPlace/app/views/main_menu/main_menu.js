
var app_data = require("../../shared/app-data");
var frameModule = require("ui/frame");

var page;

var fetchModule = require("fetch");

var fct_test = function() {
	console.log(app_data.apiUrl + "mycars/123456789");
	return fetchModule.fetch(app_data.apiUrl + "mycars/123456789", {
        method: "GET",
        body: "",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function(response) {
		console.log("1: " + JSON.stringify(response));
		/*if (!response.ok) {
			console.log(response.statusText);
			throw Error(response.statusText);
		}
		return response;*/
	}, function (e) {
        console.log("Error occurred " + e);
    });
};

exports.loaded = function(args) {
    console.log("loaded called");
	page = args.object;
	console.log("return: " + JSON.stringify(fct_test()));
};

exports.seeCar = function() {
    console.log("seeCar called");
	var topmost = frameModule.topmost();
    topmost.navigate("views/menu_see_car/menu_see_car");
};

exports.signalCar = function() {
    console.log("signalCar called");
	var topmost = frameModule.topmost();
    topmost.navigate("views/signal_car/signal_car");
};

exports.seeNotif = function() {
    console.log("seeNotif called");
	var topmost = frameModule.topmost();
    topmost.navigate("views/menu_see_notif/menu_see_notif");
};

/*var pushPlugin = require("nativescript-push-notifications");

pushPlugin.register({ senderID: '<ENTER_YOUR_PROJECT_NUMBER>' }, function (data){
	console.log("message: " + JSON.stringify(data))
}, function() { });

pushPlugin.onMessageReceived(function callback(data) {
	console.log("message: " + JSON.stringify(data))
});*/

