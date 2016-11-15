
var frameModule = require("ui/frame");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var pageData = new observableModule.fromObject({
    carList: new ObservableArray([
        { name: "car 1", id: "1" },
        { name: "car 2", id: "2" },
        { name: "car 3", id: "3" }
    ])
});

exports.loaded = function(args) {
    console.log("loaded called");
	page = args.object;
	page.bindingContext = pageData;
};

exports.addCar = function() {
    console.log("addCar called");
	var topmost = frameModule.topmost();
    topmost.navigate("views/add_car/add_car");
};

exports.editCar = function(args) {
    console.log("editCar called " + args.object.parent.id);
	var topmost = frameModule.topmost();
    topmost.navigate("views/edit_car/edit_car");
};

exports.deleteCar = function(args) {
    console.log("deleteCar called " + args.object.parent.id);
};

