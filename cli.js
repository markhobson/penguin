/*
 * Processes command-line arguments.
 */
var optimist = require("optimist");

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

exports.config = function() {

	if (opts.argv.help) {
		return;
	}

	return {
		port: opts.argv.port
	};
};

exports.showHelp = function() {
	opts.showHelp();
};
