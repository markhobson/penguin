/*
 * View model for creating a queue.
 */
define(["knockout", "knockout-mapping", "model/page", "jquery-json"], function(ko, mapping, page) {
	
	var newQueue = {
		name: null
	};
	
	page.queueCreate = {
		
		queue: mapping.fromJS(newQueue),
		
		save: function() {
			$.postJSON("/api/queues", ko.toJSON(this.queue), function(data) {
				window.location.hash = "/queues";
			});
		},
		
		reset: function() {
			mapping.fromJS(newQueue, page.queueCreate.queue);
		},
		
		show: function() {
			page.queueCreate.reset();
			page.show("queueCreate");
		}
	};
});
