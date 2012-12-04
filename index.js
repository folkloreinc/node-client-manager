
var EventEmitter = require('events').EventEmitter;

var ClientManager = function() {

	//Call eventemitter constructor
	EventEmitter.call(this);

	this.count = 0;
	this.clients = {};
	this.clientsQueue = [];

};

//Extend EventEmitter
ClientManager.prototype = Object.create(EventEmitter.prototype);


ClientManager.prototype.addClient = function(id,client) {
	this.clients[id] = client;
	this.clientsQueue.push(id);
	this.count = this.clientsQueue.length;

	if(this.count == 0) {
		this.emit('add',client);
	}
};

ClientManager.prototype.removeClient = function(id) {
	this.clients[id] = null;
	var newClientsQueue = [];
	for(var i = 0; i < this.clientsQueue.length; i++) {
		if(this.clientsQueue[i] != id) {
			newClientsQueue.push(this.clientsQueue[i]);
		}
	}
	this.clientsQueue = newClientsQueue;
	this.count = this.clientsQueue.length;

	if(this.count == 0) {
		this.emit('empty');
	}
};

function factory() {
	return new ClientManager();
}

module.exports = exports = factory;