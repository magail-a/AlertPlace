
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var sample_car_1 = {
	"id" : 0,
	"phone" : 123456789,
	"name" : "force",
	"plaque" : "AB-12345-EF"
};
var sample_car_2 = {
	"id" : 1,
	"phone" : 123456789,
	"name" : "titi",
	"plaque" : "PO-65123-ML"
};
var sample_car_3 = {
	"id" : 2,
	"phone" : 123459876,
	"name" : "3D eye",
	"plaque" : "IO-87513-FT"
};
var cars = [
	sample_car_1,
	sample_car_2,
	sample_car_3
]

app.get('/cars', function(req, res) {
	res.send(cars);
});

app.get('/mycars/:phone', function(req, res) {
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

app.post('/mycars', function(req, res) {
	console.log(req.body);
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

app.listen(8000);

console.log('Server running at http://localhost:8000/');

