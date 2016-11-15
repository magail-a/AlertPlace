
var app_data = require("../../shared/app-data");
var frameModule = require("ui/frame");
var page;

exports.loaded = function(args) {
    console.log("loaded called");
	page = args.object;
	console.log("name: " + app_data.car.name)
	console.log("num: " + app_data.car.num)
};

exports.valid = function() {
    console.log("valid called");
};

exports.cancel = function() {
    console.log("cancel called");
	var topmost = frameModule.topmost();
    topmost.goBack();
};

