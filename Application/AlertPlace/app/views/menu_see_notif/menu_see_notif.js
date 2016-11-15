
var frameModule = require("ui/frame");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var pageData = new observableModule.fromObject({
    notifList: new ObservableArray([
        { name: "car 1", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "1" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 2", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "2" },
        { name: "car 3", plaque: "00-0000-00", date: "00:00:00, 31/12/2016", id: "3" }
    ])
});

exports.loaded = function(args) {
    console.log("loaded called");
	page = args.object;
	page.bindingContext = pageData;
};

exports.notif = function(args) {
    console.log("notif called " + args.object.id);
	var topmost = frameModule.topmost();
    topmost.navigate("views/response_notif/response_notif");
};

