/*
 * Story resource.
 */
module.exports = function(data) {
	
	this.get = function(request, response) {
		
		var queueId = request.params.queueId;
		var id = request.params.id;
		
		data.findStory(queueId, id, function(story) {
			response.send(story || 404);
		});
	};

	this.create = function(request, response) {
				
		var queueId = request.params.queueId;

		var story = {
			reference: request.body.reference,
			title: request.body.title,
			author: request.body.author,
			merged: false
		};
		
		data.createStory(queueId, story, function(story) {
			response.send(201, {_id: story._id});
		});
	};
			
	this.update = function(request, response) {
				
		var queueId = request.params.queueId;
		
		var story = {
			_id: request.params.id,
			reference: request.body.reference,
			title: request.body.title,
			author: request.body.author
		};
		
		data.updateStory(queueId, story, function(success) {
			response.send(success ? 204 : 404);
		});
	};
			
	this.del = function(request, response) {
				
		var queueId = request.params.queueId;
		var id = request.params.id;
		
		data.deleteStory(queueId, id, function(success) {
			response.send(success ? 204 : 404);
		});
	};
			
	this.merge = function(request, response) {
				
		var queueId = request.params.queueId;
		var id = request.params.id;
		
		data.mergeStory(queueId, id, function(success) {
			response.send(success ? 204 : 404);
		});
	};
			
	this.unmerge = function(request, response) {
				
		var queueId = request.params.queueId;
		var id = request.params.id;
		
		data.unmergeStory(queueId, id, function(success) {
			response.send(success ? 204 : 404);
		});
	};
};
