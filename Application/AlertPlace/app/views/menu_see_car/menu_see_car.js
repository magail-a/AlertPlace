
var app_data = require("../../shared/app-data");
var utils = require("../../shared/utils");

var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;

var CarsViewModel = require("../../shared/cars-view-model");
var cars = new CarsViewModel();

var page;

/*var pageData = new observableModule.fromObject({
    carList: new ObservableArray([
        { name: "car 1", id: "1" },
        { name: "car 2", id: "2" },
        { name: "car 3", id: "3" }
    ])
});*/

var pageData = new observableModule.fromObject({
    cars: cars,
	isLoading : false
});

function disableItem(id) {
	var item = page.getViewById(id);
	if (item) {
		for (var i = 0; i < item.getChildrenCount(); i++) {
			if (item.getChildAt(i).cssClasses.has("button-item-list")) {
				item.getChildAt(i).visibility = "collapse";
			}
			if (item.getChildAt(i).cssClasses.has("indicator-item-list")) {
				item.getChildAt(i).busy = true;
			}
		}
	}
}

function enableItem(id) {
	var item = page.getViewById(id);
	if (item) {
		for (var i = 0; i < item.getChildrenCount(); i++) {
			if (item.getChildAt(i).cssClasses.has("button-item-list")) {
				item.getChildAt(i).visibility = "visible";
			}
			if (item.getChildAt(i).cssClasses.has("indicator-item-list")) {
				item.getChildAt(i).busy = false;
			}
		}
	}
}

function enableUI() {
	pageData.set("isLoading", false);
	page.getViewById("list-cars").visibility = "visible";
}

function disableUI() {
	pageData.set("isLoading", true);
	page.getViewById("list-cars").visibility = "collapse";
}

function updateHeightOfListView() {
	var list = page.getViewById("list-cars");
	list.rowHeight = 70;
	list.height = cars.length * list.rowHeight + 10;
};

exports.loaded = function(args) {
    console.log("loaded called");
	page = args.object;
	page.bindingContext = pageData;
	
	updateHeightOfListView();
	disableUI();
	cars.empty();
	cars.load().then(function() {
		pageData.set("isLoading", false);
		updateHeightOfListView();
		enableUI();
	})
	.catch(function(error) {
		console.log(error);
		updateHeightOfListView();
		enableUI();
		dialogsModule
			.alert({
				message: "An error is occurred while get your cars",
				okButtonText: "OK"
			});
	});
};

exports.addCar = function() {
    console.log("addCar called");
	var topmost = frameModule.topmost();
    topmost.navigate("views/add_car/add_car");
};

exports.editCar = function(args) {
    console.log("editCar called " + args.object.parent.id);
	var car = cars.getElem(args.object.parent.id);
	app_data.car.id = car.id;
	app_data.car.name = car.name;
	app_data.car.plaque = car.plaque;
	var topmost = frameModule.topmost();
    topmost.navigate("views/edit_car/edit_car");
};

exports.deleteCar = function(args) {
    console.log("deleteCar called " + args.object.parent.id);
	disableItem(args.object.parent.id);
	cars.deleteMyCar(args.object.parent.id)
	.then(function(data) {
		console.log("deleteCar success");
		enableItem(args.object.parent.id);
		cars.remove(args.object.parent.id);
		updateHeightOfListView();
	})
	.catch(function(error) {
		console.log("Error catch: " + error);
		disableItem(args.object.parent.id);
		dialogsModule
			.alert({
				message: "An error is occurred while add your new car",
				okButtonText: "OK"
			});
	});;
};

