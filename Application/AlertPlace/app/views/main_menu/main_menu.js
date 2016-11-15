
var frameModule = require("ui/frame");

var page;

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

var pushPlugin = require("nativescript-push-notifications");

pushPlugin.register({ senderID: '<ENTER_YOUR_PROJECT_NUMBER>' }, function (data){
	console.log("message: " + JSON.stringify(data))
}, function() { });

pushPlugin.onMessageReceived(function callback(data) {
	console.log("message: " + JSON.stringify(data))
});

