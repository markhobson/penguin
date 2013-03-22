/*
 * Aggregates routes.
 */
var queue = require("./queue");
var story = require("./story");

exports.configure = function(app, data) {
	queue.configure(app, data);
	story.configure(app, data);
};
