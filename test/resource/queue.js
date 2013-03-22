var assert = require("assert");
var sinon = require("sinon");
var Queue = require("./../../main/resource/queue");

suite("Queue", function() {
	
	setup(function() {
		this.data = {};
		this.queue = new Queue(this.data);
		this.request = {};
		this.response = {};
	});
	
	suite("#list()", function() {
		
		test("sends queues to response", function(done) {
			
			this.data.findQueues = sinon.stub().callsArgWith(0, [{_id: "1", name: "A", stories: []}]);
			this.response.send = sinon.spy();
			var self = this;
			
			this.queue.list(this.request, this.response, function() {
				sinon.assert.calledWith(self.response.send, [{_id: "1", name: "A", stories: []}]);
				done();
			});
		});
		
	});
	
});
