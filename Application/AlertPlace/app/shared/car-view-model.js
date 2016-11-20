var app_data = require("./app-data");
var utils = require("./utils");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;

function Car(info) {
	
	info = info || {}

	var viewModel = new Observable({
        name: info.name || "",
        plaque: info.plaque || "",
        phone: info.phone || ""
    });

    viewModel.addCar = function() {
        return fetchModule.fetch(app_data.apiUrl + "cars", {
            method: "POST",
            body: JSON.stringify({
                name: viewModel.get("name"),
                plaque: viewModel.get("plaque"),
                phone: viewModel.get("phone")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(utils.handleErrors);
    };

    return viewModel;
}

module.exports = Car;


