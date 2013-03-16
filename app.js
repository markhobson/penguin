/*
 * Web service Express application.
 */
var express = require("express");
var routes = require("./route");

exports.create = function() {
	
	var app = express()
		.use(express.favicon())
		.use(express.logger("dev"))
		.use(express.bodyParser())
		.use(express.methodOverride());
	
	// configure router
	
	routes.configure(app);

	// configure development profile

	if (app.get("env") == "development") {
		app.use(express.errorHandler());
	}

	return app;
};
