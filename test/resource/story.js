var sinon = require("sinon");
var Story = require("./../../main/resource/story");

suite("Story", function() {
	
	var data;
	var story;
	var request;
	var response;
	
	setup(function() {
		data = {};
		story = new Story(data);
		request = {};
		response = {send: sinon.spy()};
	});
	
	suite("#get()", function() {
		
		test("sends story when found", function(done) {
			
			data.findStory = sinon.stub();
			data.findStory.withArgs(1, 2).callsArgWith(2, {_id: 2, reference: "A", title: "B", author: "C", merged: false});
			request.params = {queueId: 1, id: 2};
			
			story.get(request, response, function() {
				sinon.assert.calledWith(response.send, {_id: 2, reference: "A", title: "B", author: "C", merged: false});
				done();
			});
		});
		
		test("sends 404 when found", function(done) {
			
			data.findStory = sinon.stub();
			data.findStory.withArgs(1, 2).callsArgWith(2, null);
			request.params = {queueId: 1, id: 2};
			
			story.get(request, response, function() {
				sinon.assert.calledWith(response.send, 404);
				done();
			});
		});
		
	});
	
});
