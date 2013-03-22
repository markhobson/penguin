/*
 * Processes command-line arguments.
 */
var optimist = require("optimist");

var opts = optimist
	.usage("Starts the Penguin web service.")
	.options("h", {
		alias: "help",
		describe: "Shows this help"
	})
	.options("d", {
		alias: "data",
		describe: "Sets the data layer (memory|mongodb)",
		"default": "mongodb"
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
		data: require("./data/" + opts.argv.data),
		port: opts.argv.port
	};
};

exports.showHelp = function() {
	opts.showHelp();
};
