'use strict';

function AppCtrl($scope, socket) {
}

function GameCtrl($scope, socket) {
    $scope.players = {};

    $scope.down = function() {
        socket.emit('down');
    };

    $scope.up = function() {
        socket.emit('up');
    };

    $scope.right = function() {
        socket.emit('right');
    };

    $scope.left = function() {
        socket.emit('left');
    };

    $scope.player = function(cell) {
        var player = _.find($scope.players, function (player, id) {
            return angular.equals(cell.coords, player.coords);
        });
        return player ? 'robot ' + player.color : '';
    };

    socket.on('player:list', function (players) {
        $scope.players = players;
    });

    socket.on('player:connected', function (player) {
        $scope.players[player.id] = player;
    });

    socket.on('player:disconnected', function (player) {
        delete $scope.players[player.id];
    });

    socket.on('game:created', function (game) {
        $scope.board = [];

        for (var y = 0; y < game.board.height; y++) {
            $scope.board[y] = [];
            for (var x = 0; x < game.board.width; x++) {
                $scope.board[y][x] = {coords: {x: x, y: y}};
            }
        }
    });

    socket.on('player:moved', function (player) {
        $scope.players[player.id].coords = player.coords;
    });

}
