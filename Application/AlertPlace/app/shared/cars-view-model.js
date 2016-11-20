var app_data = require("./app-data");
var utils = require("./utils");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

function Cars() {

    var viewModel = new ObservableArray([]);

    viewModel.getMyCars = function() {
        return fetchModule.fetch(app_data.apiUrl + "mycars/123456789", {
            method: "GET",
            body: "",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(utils.handleErrors);
    };
	
	viewModel.addCar = function(car) {
        return fetchModule.fetch(app_data.apiUrl + "cars", {
            method: "POST",
            body: JSON.stringify({
                name: car.name,
                plaque: car.plaque,
                phone: car.phone
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(utils.handleErrors)
		.then(function(response) {
			return response.json();
		});
    };
	
	viewModel.editCar = function(id, car) {
        return fetchModule.fetch(app_data.apiUrl + "mycars/123456789/" + id, {
            method: "PUT",
            body: JSON.stringify({
                name: car.name,
                plaque: car.plaque
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(utils.handleErrors)
		.then(function(response) {
			return response.json();
		});
    };

	viewModel.deleteMyCar = function(id) {
		return fetchModule.fetch(app_data.apiUrl + "mycars/123456789/" + id, {
			method: "DELETE",
			body: "",
			headers: {
				"Content-Type": "application/json"
			}
		}).then(utils.handleErrors);
	};

	viewModel.load = function() {
		return viewModel.getMyCars()
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (var i in data) {
				var car = data[i];
				console.log("push: " + car.name + ", id: " + car.id);
				viewModel.push({
					id: car.id.toString(),
					name: car.name,
					plaque: car.plaque
				});
			};
			return data;
		});
	};
	
	viewModel.empty = function() {
		while (viewModel.length > 0) {
			viewModel.pop();
		}
	};
	
	viewModel.remove = function(id) {
		for (var i = 0; i < viewModel.length; i++) {
			if (viewModel.getItem(i).id == id) {
				viewModel.splice(i, 1);
				return;
			}
		}
	};
	
	viewModel.getElem = function(id) {
		for (var i = 0; i < viewModel.length; i++) {
			if (viewModel.getItem(i).id == id) {
				return {
					id : viewModel.getItem(i).id,
					phone : viewModel.getItem(i).phone,
					name : viewModel.getItem(i).name,
					plaque : viewModel.getItem(i).plaque
				};
			}
		}
	};

    return viewModel;
}

module.exports = Cars;


