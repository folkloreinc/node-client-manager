Client-manager
===========

A really simple script to manage clients

Installation
---------------
    npm install client-manager


Usage
---------------

	var io = require('socket.io');
	var clientManager = require('client-manager');

	var io = require('socket.io').listen(80);

	var manager = clientManager();

	io.sockets.on('connection', function (socket) {
		
		manager.addClient(socket.id,socket);

		socket.on('disconnect', function () {
			manager.removeClient(socket.id);
		});

	});

	manager.on('add',function(client) {
		console.log('A client as been added');
	});

	manager.on('empty',function(client) {
		console.log('There is no more clients');
	});