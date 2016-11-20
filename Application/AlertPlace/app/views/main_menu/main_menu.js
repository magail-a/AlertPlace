
var app_data = require("../../shared/app-data");
var frameModule = require("ui/frame");

var page;

var fetchModule = require("fetch");

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

exports.getRequest = function() {
	console.log(app_data.apiUrl + "mycars/123456789");
    fetchModule.fetch(app_data.apiUrl + "mycars/123456789", {
        method: "GET",
        body: "",
        headers: {
            "Content-Type": "application/json"
        }
    })
    /*fetchModule.fetch("https://www.youtube.com", {
        method: "GET"
    })*/
    /*.then(function(response) {
		var a = response.json();
		a.popo = 5;
        console.log("Success");
        console.log("Success: " + response);
        console.log("Success: " + response.json());
        console.log("Success: " + JSON.stringify(response));
        console.log("Success: " + JSON.stringify(response.json()));
        console.log("Success: " + response.text());
        console.log("Success: " + JSON.stringify(response.text()));
		
    }, function(e) {
        console.log("Error occurred " + e);
    })*/
	.then(function handleErrors(response) {
		if (!response.ok) {
			console.log(JSON.stringify(response));
			throw Error(response.statusText);
		}
		return response
	})
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log("Success: " + data);
		console.log("Success: " + JSON.stringify(data));
    });
}

var Requester = function() {
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

