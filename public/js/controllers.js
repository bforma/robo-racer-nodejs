'use strict';

function AppCtrl($scope, socket) {
    socket.on('send:name', function (data) {
        console.log(data);
    });
}

function GameCtrl($scope) {
    $scope.board = [];
    $scope.boardWidth = 8;
    $scope.boardHeight = 8;

    for (var y = 0; y < $scope.boardHeight; y++) {
        $scope.board[y] = [];
        for (var x = 0; x < $scope.boardWidth; x++) {
            $scope.board[y][x] = {coords: {x: x, y: y}};
        }
    }

    $scope.current_position = {x: 0, y: 0};

    $scope.down = function() {
        if($scope.current_position.y < ($scope.boardHeight - 1)) {
            $scope.current_position.y++;
        }
    };

    $scope.up = function() {
        if($scope.current_position.y > 0) {
            $scope.current_position.y--;
        }
    };

    $scope.right = function() {
        if($scope.current_position.x < ($scope.boardWidth - 1)) {
            $scope.current_position.x++;
        }
    };

    $scope.left = function() {
        if($scope.current_position.x > 0) {
            $scope.current_position.x--;
        }
    };

    $scope.highlight = function(cell) {
        return angular.equals(cell.coords, $scope.current_position);
    }
}
