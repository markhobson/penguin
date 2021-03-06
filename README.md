Penguin
=======

Penguin is a simple application that helps coordinate merges into a [Git](http://git-scm.com/) repository.  This project
provides the back-end web service.

Getting Started
---------------

To run the Penguin web service:

1. Install [Node.js](http://nodejs.org/)
2. Install [MongoDB](http://docs.mongodb.org/manual/installation/)
3. `git clone git://github.com/markhobson/penguin.git`
4. `cd penguin`
5. `npm install`
6. `npm start`
7. Visit [http://localhost:8081/queues](http://localhost:8081/queues)

Command Line Options
--------------------

The following command line options are supported:

	-h, --help  Shows this help
	-d, --data  Sets the data layer (memory|mongodb)  [default: "mongodb"]
	-p, --port  Sets the server port                  [default: 8081]

Running Tests
-------------

To run the unit tests:

	npm test

Hosted Instance
---------------

Penguin is deployed to [Heroku](http://www.heroku.com/):  
[http://virtualpenguin.herokuapp.com/](http://virtualpenguin.herokuapp.com/)

Architecture
------------

The server is a [Restify](http://mcavage.github.com/node-restify/) application running on [Node.js](http://nodejs.org/).
It provides a RESTful interface to a [MongoDB](http://www.mongodb.org/) data persistence layer via the
[MongoDB Node.js driver](http://mongodb.github.com/node-mongodb-native/).

Unit tests use [Mocha](http://mochajs.org/) with [Sinon.JS](http://sinonjs.org/) for mocking.
