
var utils = {};

utils.handleErrors = function (response) {
	if (!response.ok) {
		console.log(JSON.stringify(response));
		throw Error(response.statusText);
	}
	return response;
}

utils.stringify = function(o) {

	var ret = "";
	var arr = Object.keys(o).map(function (key) {
		ret += key + " -> " + o[key] + "\n"
		return o[key];
	});

	return ret
};

utils.stringify_rec = function(o) {
	var cache = [];
	var ret = JSON.stringify(o, function(key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// Circular reference found, discard key
				return;
			}
			// Store value in our collection
			cache.push(value);
		}
		return value;
	});
	cache = null; // Enable garbage collection
	return ret
};

module.exports = utils;

