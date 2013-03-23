var assert = require("assert");
var sinon = require("sinon");
var Queue = require("./../../main/resource/queue");

suite("Queue", function() {
	
	setup(function() {
		this.data = {};
		this.queue = new Queue(this.data);
		this.response = {send: sinon.spy()};
	});
	
	suite("#list()", function() {
		
		test("sends queues to response", function(done) {
			
			this.data.findQueues = sinon.stub().callsArgWith(0, [{_id: "1", name: "A", stories: []}]);
			var self = this;
			
			this.queue.list({}, this.response, function() {
				sinon.assert.calledWith(self.response.send, [{_id: "1", name: "A", stories: []}]);
				done();
			});
		});
		
	});
	
	suite("#get()", function() {
		
		test("sends queue to response", function(done) {
			
			this.data.findQueue = sinon.stub().withArgs(1).callsArgWith(1, {_id: 1, name: "A", stories: []});
			var self = this;
			
			this.queue.get({params: {id: 1}}, this.response, function() {
				sinon.assert.calledWith(self.response.send, {_id: 1, name: "A", stories: []});
				done();
			});
		});
		
		test("sends 404 to response when not found", function(done) {
			
			this.data.findQueue = sinon.stub().withArgs(1).callsArgWith(1, null);
			var self = this;
			
			this.queue.get({params: {id: 1}}, this.response, function() {
				sinon.assert.calledWith(self.response.send, 404);
				done();
			});
		});
		
	});
	
});
