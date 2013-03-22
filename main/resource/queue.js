/*
 * Queue resource.
 */
module.exports = function(data) {
	
	this.list = function(request, response) {
		
		data.findQueues(function(queues) {
			response.send(queues);
		});
	};

	this.get = function(request, response) {
		
		var id = request.params.id;
		
		data.findQueue(id, function(queue) {
			response.send(queue || 404);
		});
	};

	this.create = function(request, response) {
				
		var queue = {
			name: request.body.name,
			stories: []
		};

		data.createQueue(queue, function(queue) {
			response.send(201, {_id: queue._id});
		});
	};
			
	this.update = function(request, response) {
				
		var queue = {
			_id: request.params.id,
			name: request.body.name
		};
		
		data.updateQueue(queue, function(success) {
			response.send(success ? 204 : 404);
		});
	};

	this.del = function(request, response) {
				
		var id = request.params.id;
		
		data.deleteQueue(id, function(success) {
			response.send(success ? 204 : 404);
		});
	};
};