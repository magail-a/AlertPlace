
var utils = require("../../shared/utils");
//var colorModule = require("color");
var frameModule = require("ui/frame");
//var buttonModule = require("ui/button");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")

var CarsViewModel = require("../../shared/cars-view-model");
var cars = new CarsViewModel();

var page;
var pageData = new observableModule.fromObject({
    isLoading : false
});

function disableUI() {
	pageData.set("isLoading", true);
	//page.getViewById("button-valid").isEnabled = false;
	page.getViewById("button-valid").visibility = "collapse";
	page.getViewById("button-cancel").visibility = "collapse";
}

function enableUI() {
	pageData.set("isLoading", false);
	//page.getViewById("button-valid").isEnabled = true;
	page.getViewById("button-valid").visibility = "visible";
	page.getViewById("button-cancel").visibility = "visible";
}

exports.loaded = function(args) {
    console.log("loaded called");
	page = args.object;
	page.bindingContext = pageData;
};

exports.valid = function(args) {
	console.log("valid called");
	disableUI();
	cars.addCar({
		name : page.getViewById("tf-name").text,
		plaque : page.getViewById("tf-plaque").text,
		phone : "123456789"
	})
	.then(function(data) {
		console.log("valid success");
		//enableUI();
		var topmost = frameModule.topmost();
		topmost.goBack();
	})
	.catch(function(error) {
		console.log("Error catch: " + JSON.stringify(error));
		enableUI();
		dialogsModule
			.alert({
				message: "Une erreur est survenue. Votre véhicule n'a pas été sauvegardé",
				okButtonText: "OK"
			});
	});;
};

exports.cancel = function() {
    console.log("cancel called");
	var topmost = frameModule.topmost();
    topmost.goBack();
};

