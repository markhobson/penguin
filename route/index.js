/*
 * Aggregates routes.
 */
var queue = require("./queue");
var story = require("./story");

exports.configure = function(app) {
	queue.configure(app);
	story.configure(app);
};
