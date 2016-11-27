
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var sleep = require('sleep');

var corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};


var app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var sample_car_1 = {
	"id" : 1,
	"phone" : 123456789,
	"name" : "force",
	"plaque" : "AB-12345-EF"
};
var sample_car_2 = {
	"id" : 2,
	"phone" : 123456789,
	"name" : "titi",
	"plaque" : "PO-65123-ML"
};
var sample_car_3 = {
	"id" : 3,
	"phone" : 123459876,
	"name" : "3D eye",
	"plaque" : "IO-87513-FT"
};
var cars = [
	sample_car_1,
	sample_car_2,
	sample_car_3
];

var notifs = [

];

app.get('/cars', function(req, res) {
	res.send(cars);
});

app.get('/mycars/:phone', function(req, res) {
	//sleep.sleep(2);
	var mycars = []
	for (var i in cars) {
		var car = cars[i];
		if (car.phone == req.params.phone) {
			mycars.push(car)
		}
	}
	res.send(mycars);
});

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/cars', function(req, res) {
	//sleep.sleep(2);
	if (req.body.phone === undefined || req.body.name === undefined || req.body.plaque === undefined) {
		res.status(400).send({"Error" : "Bad Request"});
		return;
	}
	var car = {
		id : getRandomInt(1, 12000000000),
		phone : req.body.phone,
		name : req.body.name,
		plaque : req.body.plaque
	};
	cars.push(car);
	res.status(201).send(car);
});

app.put('/mycars/:phone/:id', function(req, res) {
	//sleep.sleep(2);
	if (req.body.name === undefined || req.body.plaque === undefined) {
		res.status(400).send({"Error" : "Bad Request"});
		return;
	}
	for (var i = 0; i < cars.length; i++) {
		if (cars[i].id == req.params.id && cars[i].phone == req.params.phone) {
			cars[i].name = req.body.name;
			cars[i].plaque = req.body.plaque;
			res.send(cars[i]);
			return;
		}
	}
	res.status(404).send({ "Error" : "Not Found"});
});

app.delete('/mycars/:phone/:id', function(req, res) {
	//sleep.sleep(2);
	for (var i = 0; i < cars.length; i++) {
		if (cars[i].id == req.params.id && cars[i].phone == req.params.phone) {
			cars.splice(i, 1);
			res.send({ "Success" : "200"});
			return;
		}
	}
	res.status(404).send({ "Error" : "Not Found"});
});

app.post('/notifs', function(req, res) {
	//sleep.sleep(2);
	if (req.body.phone === undefined || req.body.plaque === undefined) {
		res.status(400).send({"Error" : "Bad Request"});
		return;
	}
	var receivers = [];
	for (var i = 0; i < cars.length; i++) {
		if (cars[i].plaque == req.body.plaque) {
			receivers.push({
				name : cars[i].name,
				phone : cars[i].phone
			});
		}
	}
	if (receivers.length == 0) {
		res.status(404).send({"Error" : "Not Found"});
		return;		
	}
	var notif = {
		id : getRandomInt(1, 12000000000),
		sender : req.body.phone,
		plaque :req.body.plaque,
		receivers : receivers,
		creation_date : new Date()
	};
	console.log(JSON.stringify(notif));
	notifs.push(notif);
	res.status(201).send(notif);
});


app.get('/mynotifs/:phone', function(req, res) {
	//sleep.sleep(2);
	var mynotifs = []
	for (var i in notifs) {
		var notif = notifs[i];
		var isOwner;
		for (var j = 0; j < notif.receivers.length; j++) {
			if (notif.receivers[j].phone == req.params.phone) {
				isOwner = {
					name : notif.receivers[j].name,
					phone : notif.receivers[j].phone
				};
			}
		}
		if (isOwner) {
			mynotifs.push({
				id : notif.id,
				sender : notif.sender,
				plaque : notif.plaque,
				name : isOwner.name,
				creation_date : notif.creation_date
			})
		}
	}
	console.log(JSON.stringify(mynotifs));
	res.send(mynotifs);
});

app.listen(1234);

console.log('Server running at http://localhost:1234/');

