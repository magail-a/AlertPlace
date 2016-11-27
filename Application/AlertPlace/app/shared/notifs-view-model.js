var app_data = require("./app-data");
var utils = require("./utils");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

function testDate(dateString) {
	//var dateString = '2013-01-08T17:16:36.000Z';

	var ISO_8601_re = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?(Z|[\+-]\d{2}(?::\d{2})?)$/,
		m = dateString .match(ISO_8601_re);

	var year = +m[1],
		month = +m[2],
		dayOfMonth = +m[3],
		hour = +m[4],
		minute = +m[5],
		second = +m[6],
		ms = +m[7], // +'' === 0
		timezone = m[8];

	if (timezone === 'Z') timezone = 0;
	else timezone = timezone.split(':'), timezone = +(timezone[0][0]+'1') * (60*(+timezone[0].slice(1)) + (+timezone[1] || 0));
	// timezone is now minutes

	// your prefered way to construct
	var myDate = new Date();
	myDate.setUTCFullYear(year);
	myDate.setUTCMonth(month - 1);
	myDate.setUTCDate(dayOfMonth);
	myDate.setUTCHours(hour);
	myDate.setUTCMinutes(minute + timezone); // timezone offset set here, after hours
	myDate.setUTCSeconds(second);
	myDate.setUTCMilliseconds(ms);

	//console.log(myDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')); // Tue Jan 08 2013 17:16:36 GMT+0000 (GMT Standard Time)
	
	return "" + myDate;
}

function Notifications() {

    var viewModel = new ObservableArray([]);

    viewModel.getMyNotifs = function() {
        return fetchModule.fetch(app_data.apiUrl + "mynotifs/123456789", {
            method: "GET",
            body: "",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(utils.handleErrors);
    };
	
	viewModel.addNotification = function(notification) {
        return fetchModule.fetch(app_data.apiUrl + "notifs", {
            method: "POST",
            body: JSON.stringify({
                plaque: notification.plaque,
                phone: notification.phone
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(utils.handleErrors)
		.then(function(response) {
			return response.json();
		});
    };

	/*viewModel.deleteMyCar = function(id) {
		return fetchModule.fetch(app_data.apiUrl + "mycars/123456789/" + id, {
			method: "DELETE",
			body: "",
			headers: {
				"Content-Type": "application/json"
			}
		}).then(utils.handleErrors);
	};*/
	
	viewModel.load = function() {
		return viewModel.getMyNotifs()
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (var i in data) {
				var notif = data[i];
				viewModel.push({
					id: notif.id.toString(),
					name: notif.name,
					plaque: notif.plaque,
					sender: notif.sender,
					creation_date : testDate(notif.creation_date)
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

    return viewModel;
}

module.exports = Notifications;


