/*
 * Penguin server.
 */
var cli = require("./cli");
var app = require("./app");

var config = cli.config();

if (config == null) {
	
	cli.showHelp();
}
else {
	
	app.create()
		.listen(config.port, function() {
			console.log("Server listening on port " + config.port);
		});
}
