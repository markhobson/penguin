var sinon = require("sinon");
var Queue = require("./../../main/resource/queue");

suite("Queue", function() {
	
	var data;
	var queue;
	var request;
	var response;
	
	setup(function() {
		data = {};
		queue = new Queue(data);
		request = {};
		response = {send: sinon.spy()};
	});
	
	suite("#list()", function() {
		
		test("sends queues", function(done) {
			
			data.findQueues = sinon.stub().callsArgWith(0, [{_id: 1, name: "A", stories: []}]);
			
			queue.list(request, response, function() {
				sinon.assert.calledWith(response.send, [{_id: 1, name: "A", stories: []}]);
				done();
			});
		});
		
	});
	
	suite("#get()", function() {
		
		test("sends queue when found", function(done) {
			
			data.findQueue = sinon.stub();
			data.findQueue.withArgs(1).callsArgWith(1, {_id: 1, name: "A", stories: []});
			request.params = {id: 1};
			
			queue.get(request, response, function() {
				sinon.assert.calledWith(response.send, {_id: 1, name: "A", stories: []});
				done();
			});
		});
		
		test("sends 404 when not found", function(done) {
			
			data.findQueue = sinon.stub();
			data.findQueue.withArgs(1).callsArgWith(1, null);
			request.params = {id: 1};
			
			queue.get(request, response, function() {
				sinon.assert.calledWith(response.send, 404);
				done();
			});
		});
		
	});
	
	suite("#create()", function() {
		
		test("creates queue", function(done) {
			
			data.createQueue = sinon.stub();
			data.createQueue.withArgs({name: "A", stories: []}).callsArgWith(1, {_id: 1, name: "A", stories: []});
			request.body = {name: "A"};

			queue.create(request, response, function() {
				sinon.assert.calledOnce(data.createQueue);
				done();
			});
		});
		
		test("sends 201 and id when created", function(done) {
			
			data.createQueue = sinon.stub();
			data.createQueue.withArgs({name: "A", stories: []}).callsArgWith(1, {_id: 1, name: "A", stories: []});
			request.body = {name: "A"};

			queue.create(request, response, function() {
				sinon.assert.calledWith(response.send, 201, {_id: 1});
				done();
			});
		});
		
	});
	
	suite("#update()", function() {
		
		test("updates queue when found", function(done) {
			
			data.updateQueue = sinon.stub();
			data.updateQueue.withArgs({_id: 1, name: "B"}).callsArgWith(1, true);
			request.params = {id: 1};
			request.body = {name: "B"};

			queue.update(request, response, function() {
				sinon.assert.calledOnce(data.updateQueue);
				done();
			});
		});
		
		test("sends 204 when updated", function(done) {
			
			data.updateQueue = sinon.stub();
			data.updateQueue.withArgs({_id: 1, name: "B"}).callsArgWith(1, true);
			request.params = {id: 1};
			request.body = {name: "B"};
			
			queue.update(request, response, function() {
				sinon.assert.calledWith(response.send, 204);
				done();
			});
		});
		
		test("sends 404 when not found", function(done) {
			
			data.updateQueue = sinon.stub();
			data.updateQueue.withArgs({_id: 1, name: "B"}).callsArgWith(1, false);
			request.params = {id: 1};
			request.body = {name: "B"};
			
			queue.update(request, response, function() {
				sinon.assert.calledWith(response.send, 404);
				done();
			});
		});
		
	});
	
	suite("#del()", function() {
		
		test("deletes queue when found", function(done) {
			
			data.deleteQueue = sinon.stub();
			data.deleteQueue.withArgs(1).callsArgWith(1, true);
			request.params = {id: 1};
			
			queue.del(request, response, function() {
				sinon.assert.calledOnce(data.deleteQueue);
				done();
			});
		});
		
		test("sends 204 when deleted", function(done) {
			
			data.deleteQueue = sinon.stub();
			data.deleteQueue.withArgs(1).callsArgWith(1, true);
			request.params = {id: 1};
			
			queue.del(request, response, function() {
				sinon.assert.calledWith(response.send, 204);
				done();
			});
		});
		
		test("sends 404 when not found", function(done) {
			
			data.deleteQueue = sinon.stub();
			data.deleteQueue.withArgs(1).callsArgWith(1, false);
			request.params = {id: 1};
			
			queue.del(request, response, function() {
				sinon.assert.calledWith(response.send, 404);
				done();
			});
		});
		
	});
	
});
