/*
 * Aggregates routes.
 */
var Queue = require("../resource/queue");
var Story = require("../resource/story");
var queueRoutes = require("./queue");
var storyRoutes = require("./story");

exports.configure = function(app, data) {
	
	queueRoutes.configure(app, new Queue(data));
	storyRoutes.configure(app, new Story(data));
};
