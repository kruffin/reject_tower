/**
* The main entry point for the game engine.
*/
var Engine = function() {

	this.gameTime = (new Date()).valueOf();
	
	this.currentState = {};
	this.oldState = {};
	this.tokens = [];
};

/**
* Updates the game state to the new time. If the time is in the past, this method
* does nothing.
* @param {currentTime} the current game time
*/
Engine.update = function(currentTime) {

    var delta = currentTime - Engine.gameTime;

    if (delta < 0) {
	// Can't update to the past
	return;
    }

    Engine.gameTime = currentTime;
	
    oldState = currentState;
    // TODO: update the state
    //currentState = ...;
};

/**
* Logs in the player with {name} and returns a token for this player to use.
* @param {name} the name of the player to login
* @returns a string token
*/
Engine.login = function(name) {
	var expiration = (new Date()).valueOf() + 3600000; // Expire in one hour
	var token = ''; // TODO: Generate a random token
	Engine.tokens.push({name: name, token: token, expires: expiration});
	return token;
}

/**
* Finds the corresponding token from the {@link Engine.login(name)} call and returns the entry.
* @param {token} the token to look for
* @returns the token object: {name, token, expiration}
*/
Engine.getTokenEntry = function(token) {
	var tokenEntry;
	for(var index in Engine.tokens) {
		var current = Engine.tokens[index];
		if (current.token == token) {
			// We found it
			tokenEntry = current;
			break;
		}
	}
	
	return tokenEntry;
}

/**
* Adds a command for the server to process.
* @param {command} varies depending on the type of command but should always contain {token}
*/
Engine.push = function(command) {
	if (!command || !command.token) {
		
		var tokenEntry = Engine.getTokenEntry(command.token);
		if (!tokenEntry) {
			return; // TODO: Throw a token not found exception?
		}
		
		
	}
}

/** 
* The current state of the game. This will have all entities on the server and only 
* visible ones on the client.
*/
function GameState() {
	this.monsters = {};
	this.towers = {};
}

/**
* The base operations of a monster in the game.
*/
function Monster() {
	this.stats = {	position: {x: 0, y: 0},
					health: 0,
					maxSpeed: 0,
					curSpeed: 0,
				};
}

/**
* The base operations of a tower in the game.
*/
function Tower() {
    this.position = {x: 0, y: 0};
    this.stats = {};

    /**
    * Reports back if this tower can attack at this time.
    * @return {true} or {false} depending on if it can attack
    */
    this.canAttack = function() {
	return false;
    }

    /**
    * Performs the attack of this tower. It returns an array of
    * monsters that were attacked.
    * @param {monsters} the array of monsters that can be attacked
    * @return an array of monsters that were attacked
    */
    this.attack = function(monsters) {
	// Stub
    }
}

ArrowTower.prototype = new Tower();
function ArrowTower() {
    this.prototype.stats = {
	damage: 5.0,
	speed: 1.0,
	type: 'physical'
    }
    
    this.prototype.canAttack = function() {
    	if (!this.lastAttack) {
    		return true;
    	}
    	
    	return (Engine.gameTime - this.lastAttack) >= this.stats.speed * 1000;
    }
    
    this.prototype.attack = function(monsters) {
	
    }

}
    