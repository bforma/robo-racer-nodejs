var socketio = require('socket.io');

var BOARD_WIDTH = 8;
var BOARD_HEIGHT = 8;
var COLORS = ['red', 'green', 'blue'];

var game = {board: {width: BOARD_WIDTH, height: BOARD_HEIGHT}};
var players = {};

module.exports.listen = function(server) {
    var io = socketio.listen(server);

    io.sockets.on('connection', function (client) {
        // TODO: is it really a good idea to expose the internal socket id?
        var player = {id: client.id, coords: randomCoords(), color: randomColor()};
        players[player.id] = player;
        toSelf('player:list', players);
        toOthers('player:connected', player);
        toSelf('game:created', game);

        client.on('down', function () {
            if(player.coords.y < BOARD_HEIGHT - 1) {
                player.coords.y++;
                toEveryone('player:moved', player);
            }
        });

        client.on('up', function () {
            if(player.coords.y > 0) {
                player.coords.y--;
                toEveryone('player:moved', player);
            }
        });

        client.on('left', function () {
            if(player.coords.x > 0) {
                player.coords.x--;
                toEveryone('player:moved', player);
            }
        });

        client.on('right', function () {
            if(player.coords.x < BOARD_WIDTH - 1) {
                player.coords.x++;
                toEveryone('player:moved', player);
            }
        });

        client.on('disconnect', function () {
            toOthers('player:disconnected', players[player.id]);
            delete players[player.id];
        });

        function toSelf(type, message) {
            client.emit(type, message);
        }

        function toOthers(type, message) {
            client.broadcast.emit(type, message);
        }

        function toEveryone(type, message) {
            client.emit(type, message);
            client.broadcast.emit(type, message);
        }

        function randomColor() {
            return COLORS[Math.floor(Math.random() * COLORS.length)];
        }

        function randomCoords() {
            var x = Math.floor(Math.random() * BOARD_WIDTH);
            var y = Math.floor(Math.random() * BOARD_WIDTH);
            return {x: x, y: y};
        }

    });
};