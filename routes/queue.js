/*
 * Queue resource.
 */
var fs = require("fs");
var util = require("util");

var FILENAME = ".saved-queues.json";
var queues = [];

// ----------------------------------------------------------------------------
// Public methods
// ----------------------------------------------------------------------------

exports.list = function(request, response)
{
	response.send(queues);
};

exports.get = function(request, response)
{
	var id = request.params.id - 1;
	
	response.send(queues[id] || 404);
};

exports.create = function(request, response)
{
	var name = request.body.name;
	var queue = createQueue(name);

	queues.push(queue);
	exports.save();
	
	response.send(201, {id: queue.id});
};

exports.load = function()
{
	fs.exists(FILENAME, function(exists)
	{
		if (!exists)
		{
			return;
		}
		
		fs.readFile(FILENAME, function(err, data)
		{
			if (err)
			{
				util.error("Error loading queue(s)", err);
			}
			else
			{
				queues = JSON.parse(data);
				util.log(util.format("Loaded %d queue(s)", queues.length));
			}
		});
	});
};

exports.save = function()
{
	fs.writeFile(FILENAME, JSON.stringify(queues), function(err)
	{
		if (err)
		{
			util.error("Error saving queue(s)", err);
		}
		else
		{
			util.log(util.format("Saved %d queue(s)", queues.length));
		}
	});
};

exports.getQueue = function(id)
{
	return queues[id - 1];
};

// ----------------------------------------------------------------------------
// Private methods
// ----------------------------------------------------------------------------

var createQueue = function(name)
{
	return {
		id: queues.length + 1,
		name: name,
		stories: []
	};
};
