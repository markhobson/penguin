/*
 * Configures the router for queues.
 */
var Queue = require("../resource/queue");

exports.configure = function(app, data) {

	var queue = new Queue(data);
	
	app.get("/queues", queue.list);
	
	app.post("/queues", queue.create);
	
	app.get("/queue/:id", queue.get);
	
	app.put("/queue/:id", queue.update);
	
	app.del("/queue/:id", queue.del);
};
