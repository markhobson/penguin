/*
 * Penguin server.
 */
var cli = require("./cli");
var App = require("./app");

var config = cli.config();

if (config == null) {
	
	cli.showHelp();
}
else {
	
	// start server
	
	var app = App.create();
	app.listen(config.port, function() {
		console.log("Server listening on port " + config.port);
	});
}
