var assert = require("assert");
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
		
		test("sends queues to response", function(done) {
			
			data.findQueues = sinon.stub().callsArgWith(0, [{_id: 1, name: "A", stories: []}]);
			
			queue.list(request, response, function() {
				sinon.assert.calledWith(response.send, [{_id: 1, name: "A", stories: []}]);
				done();
			});
		});
		
	});
	
	suite("#get()", function() {
		
		test("sends queue to response", function(done) {
			
			data.findQueue = sinon.stub();
			data.findQueue.withArgs(1).callsArgWith(1, {_id: 1, name: "A", stories: []});
			request.params = {id: 1};
			
			queue.get(request, response, function() {
				sinon.assert.calledWith(response.send, {_id: 1, name: "A", stories: []});
				done();
			});
		});
		
		test("sends 404 to response when not found", function(done) {
			
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
		
		test("creates queue from request", function(done) {
			
			data.createQueue = sinon.stub();
			data.createQueue.withArgs({name: "A", stories: []}).callsArgWith(1, {_id: 1, name: "A", stories: []});
			request.body = {name: "A"};

			queue.create(request, response, function() {
				sinon.assert.calledWith(data.createQueue, {name: "A", stories: []});
				sinon.assert.calledWith(response.send, 201, {_id: 1});
				done();
			});
		});
		
	});
	
});
