/*
 * View model for adding a story to a queue.
 */
define(["knockout", "knockout-mapping", "model/page", "jquery-json"], function(ko, mapping, page) {
	
	var newStory = {
		reference: null,
		title: null,
		author: null
	};
	
	var model = {
		
		queueId: ko.observable(),
		
		story: mapping.fromJS(newStory),
		
		create: function() {
			$.postJSON("/api/queue/" + model.queueId() + "/stories", ko.toJSON(model.story), function(data) {
				window.location.hash = "/queue/" + model.queueId();
			});
		},
		
		reset: function() {
			mapping.fromJS(newStory, model.story);
		},
		
		show: function(queueId) {
			model.queueId(queueId);
			model.reset();
			page.show("storyCreate");
		}
	};
	
	page.storyCreate = model;
});
