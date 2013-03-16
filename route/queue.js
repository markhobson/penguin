/*
 * Configures the router for queues.
 */
var queue = require("../resource/queue");

exports.configure = function(app) {
	
	app.get("/queues", queue.list);
	
	app.post("/queues", queue.create);
	
	app.get("/queue/:id", queue.get);
	
	app.put("/queue/:id", queue.update);
	
	app.del("/queue/:id", queue.del);
};
