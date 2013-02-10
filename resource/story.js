/*
 * Story resource.
 */
module.exports = function(data) {
	
	return {
		
		create: function(request, response) {
			
			var queueId = request.params.id;

			var story = {
				name: request.body.name,
				description: request.body.description,
				author: request.body.author
			};
			
			data.saveStory(queueId, story, function(story) {
				// TODO: return story id when available
				response.send(201);
			});
		}
	};
};
