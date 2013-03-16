/*
 * Processes command-line arguments.
 */
var optimist = require("optimist");

exports.config = function() {

	var opts = optimist
		.usage("Starts the Penguin server.")
		.options("h", {
			alias: "help",
			describe: "Shows this help"
		})
		.options("p", {
			alias: "port",
			describe: "Sets the server port",
			"default": process.env.PORT || 8081
		});
	
	if (opts.argv.help) {
		opts.showHelp();
		return;
	}

	return {
		port: opts.argv.port
	};
	
};
