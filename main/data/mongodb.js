/*
 * MongoDB data layer.
 */
var mongodb = require("mongodb");
	
var client = mongodb.MongoClient;
var url = process.env.MONGOLAB_URI
	|| process.env.MONGOHQ_URL
	|| "mongodb://localhost:27017/penguin";
var queuesName = "queues";

exports.url = function() {
	return url;
};

exports.findQueues = function(callback) {
	
	client.connect(url, function(error, db) {
		db.collection(queuesName).find().sort({name: 1}).toArray(function(error, queues) {
			callback(queues);
			db.close();
		});
	});
};

exports.findQueue = function(id, callback) {
	
	var oid = new mongodb.ObjectID(id);
	
	client.connect(url, function(error, db) {
		db.collection(queuesName).findOne({_id: oid}, function(error, queue) {
			callback(queue);
			db.close();
		});
	});
};

exports.createQueue = function(queue, callback) {
	
	client.connect(url, function(error, db) {
		db.collection(queuesName).insert(queue, {w: 1}, function(error, queues) {
			callback(queues[0]);
			db.close();
		});
	});
};
		
exports.updateQueue = function(queue, callback) {
	
	var oid = new mongodb.ObjectID(queue._id);
	
	client.connect(url, function(error, db) {
		db.collection(queuesName).update({_id: oid}, {$set: {name: queue.name}}, {w: 1}, function(error, count) {
			callback(count == 1);
			db.close();
		});
	});
};
		
exports.deleteQueue = function(id, callback) {
	
	var oid = new mongodb.ObjectID(id);
	
	client.connect(url, function(error, db) {
		db.collection(queuesName).remove({_id: oid}, {w: 1}, function(error, count) {
			callback(count == 1);
			db.close();
		});
	});
};

exports.findStory = function(queueId, id, callback) {
	
	var queueOid = new mongodb.ObjectID(queueId);
	var oid = new mongodb.ObjectID(id);
	
	client.connect(url, function(error, db) {
		// until SERVER-142 is fixed we have to filter out the story ourselves
		db.collection(queuesName).findOne({_id: queueOid, "stories._id": oid}, function(error, queue) {
			callback(getStoryById(queue, id));
			db.close();
		});
	});
};
		
exports.createStory = function(queueId, story, callback) {
	
	var queueOid = new mongodb.ObjectID(queueId);
	story._id = new mongodb.ObjectID();
	
	client.connect(url, function(error, db) {
		db.collection(queuesName).update({_id: queueOid}, {$push: {stories: story}}, {w: 1}, function(error, count) {
			callback(story);
			db.close();
		});
	});
};
		
exports.updateStory = function(queueId, story, callback) {
	
	var queueOid = new mongodb.ObjectID(queueId);
	var oid = new mongodb.ObjectID(story._id);
	
	client.connect(url, function(error, db) {
		db.collection(queuesName).update(
			{_id: queueOid, "stories._id": oid},
			{$set: {"stories.$.reference": story.reference, "stories.$.title": story.title, "stories.$.author": story.author}},
			{w: 1},
			function(error, count) {
				callback(count == 1);
				db.close();
			}
		);
	});
};
		
exports.deleteStory = function(queueId, id, callback) {
	
	var queueOid = new mongodb.ObjectID(queueId);
	var oid = new mongodb.ObjectID(id);
	
	client.connect(url, function(error, db) {
		db.collection(queuesName).update({_id: queueOid}, {$pull: {"stories": {_id: oid}}}, {w: 1}, function(error, count) {
			callback(count == 1);
			db.close();
		});
	});
};
		
exports.mergeStory = function(queueId, id, callback) {
	
	mergeStory(queueId, id, true, callback);
};
		
exports.unmergeStory = function(queueId, id, callback) {
	
	mergeStory(queueId, id, false, callback);
};

var getStoryById = function(queue, id) {
	
	if (queue != null) {
		for (var index in queue.stories) {
			if (queue.stories[index]._id == id) {
				return queue.stories[index];
			}
		}
	}
	
	return null;
};
	
var mergeStory = function(queueId, id, merged, callback) {
	
	var queueOid = new mongodb.ObjectID(queueId);
	var oid = new mongodb.ObjectID(id);
	
	client.connect(url, function(error, db) {
		db.collection(queuesName).update(
			{_id: queueOid, "stories._id": oid},
			{$set: {"stories.$.merged": merged}},
			{w: 1},
			function(error, count) {
				callback(count == 1);
				db.close();
			}
		);
	});
};
