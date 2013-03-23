/*
 * Queue resource.
 */
module.exports = function(data) {
	
	this.list = function(request, response, done) {
		
		data.findQueues(function(queues) {
			response.send(queues);
			done && done();
		});
	};

	this.get = function(request, response, done) {
		
		var id = request.params.id;
		
		data.findQueue(id, function(queue) {
			response.send(queue || 404);
			done && done();
		});
	};

	this.create = function(request, response, done) {
				
		var queue = {
			name: request.body.name,
			stories: []
		};

		data.createQueue(queue, function(queue) {
			response.send(201, {_id: queue._id});
			done && done();
		});
	};
			
	this.update = function(request, response, done) {
				
		var queue = {
			_id: request.params.id,
			name: request.body.name
		};
		
		data.updateQueue(queue, function(success) {
			response.send(success ? 204 : 404);
			done && done();
		});
	};

	this.del = function(request, response, done) {
				
		var id = request.params.id;
		
		data.deleteQueue(id, function(success) {
			response.send(success ? 204 : 404);
			done && done();
		});
	};
};
