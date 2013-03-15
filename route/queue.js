/*
 * Configures the router for queues.
 */
define(["app", "resource/queue"], function(app, queue) {
	
	app.get("/queues", queue.list);
	
	app.post("/queues", queue.create);
	
	app.get("/queue/:id", queue.get);
	
	app.put("/queue/:id", queue.update);
	
	app.del("/queue/:id", queue.del);
});
