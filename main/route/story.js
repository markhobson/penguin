/*
 * Configures the router for stories.
 */
var Story = require("../resource/story");

exports.configure = function(app, data) {
	
	var story = new Story(data);
	
	app.post("/queue/:queueId/stories", story.create);
	
	app.get("/queue/:queueId/story/:id", story.get);
	
	app.put("/queue/:queueId/story/:id", story.update);
	
	app.del("/queue/:queueId/story/:id", story.del);
	
	app.post("/queue/:queueId/story/:id/merge", story.merge);
	
	app.post("/queue/:queueId/story/:id/unmerge", story.unmerge);
};
