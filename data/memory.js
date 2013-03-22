/*
 * In-memory data layer.
 */
var queues = [];
var id = 1;

exports.url = function() {
	return "memory";
};

exports.findQueues = function(callback) {
	callback(queues);
};

exports.findQueue = function(id, callback) {
	callback(queues[id - 1]);
};

exports.createQueue = function(queue, callback) {
	queue._id = id++;
	// TODO: insert queue into array ordered by name
	queues.push(queue);
	callback(queue);
};
		
exports.updateQueue = function(queue, callback) {
	queues[queue._id - 1] = queue;
	callback(true);
};
		
exports.deleteQueue = function(id, callback) {
	// TODO: remove queue from array
	callback(true);
};

exports.findStory = function(queueId, id, callback) {
	// TODO: implement
	callback(null);
};
		
exports.createStory = function(queueId, story, callback) {
	// TODO: set story._id
	this.findQueue(queueId, function(queue) {
		queue.stories.push(story);
		callback(story);
	});
};
		
exports.updateStory = function(queueId, story, callback) {
	// TODO: implement
	callback(false);
};
		
exports.deleteStory = function(queueId, id, callback) {
	// TODO: implement
	callback(false);
};
		
exports.mergeStory = function(queueId, id, callback) {
	// TODO: implement
	callback(false);
};
		
exports.unmergeStory = function(queueId, id, callback) {
	// TODO: implement
	callback(false);
};
