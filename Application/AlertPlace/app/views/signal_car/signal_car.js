
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")

var NotifsViewModel = require("../../shared/notifs-view-model");
var notifs = new NotifsViewModel();

var page;
var pageData = new observableModule.fromObject({
    notifs: notifs,
	isLoading : false
});


function disableUI() {
	pageData.set("isLoading", true);
	page.getViewById("button-signal").visibility = "collapse";
}

function enableUI() {
	pageData.set("isLoading", false);
	page.getViewById("button-signal").visibility = "visible";
}

exports.loaded = function(args) {
    console.log("loaded called");
	page = args.object;
	page.bindingContext = pageData;
};

exports.signalCar = function() {
    console.log("signalCar called");
	disableUI();
	notifs.addNotification({
		plaque : page.getViewById("tf-plaque").text,
		phone : "123456789"
	})
	.then(function(data) {
		console.log("signalCar success");
		enableUI();
		dialogsModule
			.alert({
				message: "Une notification a été envoyée au propriétaire",
				okButtonText: "OK"
			});
	})
	.catch(function(error) {
		console.log("Error catch: " + JSON.stringify(error));
		enableUI();
		if (error.status == 404) {
			dialogsModule
				.alert({
					message: "Le véhicule est introuvable",
					okButtonText: "OK"
				});			
		}
		else {
			dialogsModule
				.alert({
					message: "Une erreur est survenue. La notification n'a pas pu être envoyée",
					okButtonText: "OK"
				});
		}
	});;
};

