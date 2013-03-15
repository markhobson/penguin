/*
 * Penguin application.
 */
define(["express"], function(express) {
	
	var app = express();

	// configure application

	app.configure(function() {
		app.use(express.favicon());
		app.use(express.logger("dev"));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
	});

	// configure development profile

	app.configure("development", function() {
		app.use(express.errorHandler());
	});

	return app;
});
