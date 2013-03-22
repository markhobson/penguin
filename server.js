/*
 * Penguin web service.
 */
var cli = require("./cli");
var app = require("./app");
var data = require("./data");

var config = cli.config();

if (config == null) {
	
	cli.showHelp();
}
else {
	
	app.create(data)
		.listen(config.port, function() {
			console.log("Server listening on port " + config.port);
		});
}
