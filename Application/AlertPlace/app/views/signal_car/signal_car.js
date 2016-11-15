
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
};

exports.seeNotif = function() {
    console.log("seeNotif called");
};

