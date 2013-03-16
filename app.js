/*
 * Web service Express application.
 */
var express = require("express");
var routes = require("./route");

exports.create = function() {
	
	var app = express();

	// configure application

	app.configure(function() {
		app.use(express.favicon());
		app.use(express.logger("dev"));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
	});
	
	routes.configure(app);

	// configure development profile

	app.configure("development", function() {
		app.use(express.errorHandler());
	});

	return app;
};
