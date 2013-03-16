/*
 * Web service Restify application.
 */
var restify = require("restify");
var routes = require("./route");

exports.create = function() {
	
	var app = restify.createServer()
		.use(restify.bodyParser({mapParams: false}));
	
	// configure router
	
	routes.configure(app);

	return app;
};
