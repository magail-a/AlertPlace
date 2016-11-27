
var app_data = require("../../shared/app-data");
var frameModule = require("ui/frame");
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
	page.getViewById("tf-name").text = app_data.car.name;
	page.getViewById("tf-plaque").text = app_data.car.plaque;
};

exports.valid = function() {
    console.log("valid called");
	disableUI();
	cars.editCar(app_data.car.id, {
		name : page.getViewById("tf-name").text,
		plaque : page.getViewById("tf-plaque").text
	})
	.then(function(data) {
		console.log("valid success");
		enableUI();
		var topmost = frameModule.topmost();
		topmost.goBack();
	})
	.catch(function(error) {
		console.log("Error catch: " + JSON.stringify(error));
		enableUI();
		dialogsModule
			.alert({
				message: "Une erreur est survenue. Les changements n'ont pas été pris en compte",
				okButtonText: "OK"
			});
	});;
};

exports.cancel = function() {
    console.log("cancel called");
	var topmost = frameModule.topmost();
    topmost.goBack();
};

