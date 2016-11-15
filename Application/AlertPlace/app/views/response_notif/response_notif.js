
var frameModule = require("ui/frame");

var page;

exports.loaded = function(args) {
    console.log("loaded called");
	page = args.object;
};

exports.responseNow = function() {
    console.log("responseNow called");
	var topmost = frameModule.topmost();
    topmost.goBack();
};

exports.response5 = function() {
    console.log("response5 called");
	var topmost = frameModule.topmost();
    topmost.goBack();
};

exports.response10 = function() {
    console.log("response10 called");
	var topmost = frameModule.topmost();
    topmost.goBack();
};
