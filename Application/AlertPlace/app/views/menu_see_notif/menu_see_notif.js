
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;

var NotifsViewModel = require("../../shared/notifs-view-model");
var notifs = new NotifsViewModel();

var page;
var pageData = new observableModule.fromObject({
    notifs: notifs,
	isLoading : false
});


function enableUI() {
	pageData.set("isLoading", false);
	page.getViewById("list-notifs").visibility = "visible";
};

function disableUI() {
	pageData.set("isLoading", true);
	page.getViewById("list-notifs").visibility = "collapse";
};

function updateHeightOfListView() {
	var list = page.getViewById("list-notifs");
	list.rowHeight = 70;
	list.height = notifs.length * list.rowHeight + 10;
};

exports.loaded = function(args) {
    console.log("loaded called");
	page = args.object;
	page.bindingContext = pageData;
	
	updateHeightOfListView();
	disableUI();
	notifs.empty();
	notifs.load().then(function() {
		pageData.set("isLoading", false);
		updateHeightOfListView();
		enableUI();
	})
	.catch(function(error) {
		console.log("Error catch: " + JSON.stringify(error));
		updateHeightOfListView();
		enableUI();
		dialogsModule
			.alert({
				message: "Une erreur est survenue. Nous arrivons pas à recupérer vos notifications",
				okButtonText: "OK"
			});
	});
};

exports.notif = function(args) {
    console.log("notif called " + args.object.id);
	var topmost = frameModule.topmost();
    topmost.navigate("views/response_notif/response_notif");
};

