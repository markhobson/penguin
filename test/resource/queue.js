var assert = require("assert");
var sinon = require("sinon");
var Queue = require("./../../main/resource/queue");

suite("Queue", function() {
	
	var data;
	var queue;
	var response;
	
	setup(function() {
		data = {};
		queue = new Queue(data);
		response = {send: sinon.spy()};
	});
	
	suite("#list()", function() {
		
		test("sends queues to response", function(done) {
			
			data.findQueues = sinon.stub().callsArgWith(0, [{_id: "1", name: "A", stories: []}]);
			
			queue.list({}, response, function() {
				sinon.assert.calledWith(response.send, [{_id: "1", name: "A", stories: []}]);
				done();
			});
		});
		
	});
	
	suite("#get()", function() {
		
		test("sends queue to response", function(done) {
			
			data.findQueue = sinon.stub().withArgs(1).callsArgWith(1, {_id: 1, name: "A", stories: []});
			
			queue.get({params: {id: 1}}, response, function() {
				sinon.assert.calledWith(response.send, {_id: 1, name: "A", stories: []});
				done();
			});
		});
		
		test("sends 404 to response when not found", function(done) {
			
			data.findQueue = sinon.stub().withArgs(1).callsArgWith(1, null);
			
			queue.get({params: {id: 1}}, response, function() {
				sinon.assert.calledWith(response.send, 404);
				done();
			});
		});
		
	});
	
});
