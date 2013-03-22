/*
 * Penguin web service.
 */
var cli = require("./cli");
var app = require("./app");

var config = cli.config();

if (config == null) {
	
	cli.showHelp();
}
else {
	
	console.log("Using data layer " + config.data.url());
	
	app.create(config.data)
		.listen(config.port, function() {
			console.log("Server listening on port " + config.port);
		});
}
