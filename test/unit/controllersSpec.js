describe('Robo Racer controllers', function () {

    describe('GameCtrl', function () {
        var ctrl, scope, socket;

        beforeEach(module('roboRacer'));

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            socket = new SocketStub();
            ctrl = $controller('GameCtrl', {$scope: scope, socket: socket});
        }));

        it('should initialize an empty players map', function () {
            expect(_.size(scope.players)).toBe(0);
        });

        describe('on player:list', function () {
            it('should set the players', function () {
                socket.emit("player:list", players());
                expect(_.size(scope.players)).toBe(1);
            });
        });

        describe('given a game with a player', function () {
            beforeEach(function () {
                scope.players = players();
            });

            describe('on player:connected', function () {
                it('should add a new player', function () {
                    socket.emit("player:connected", player("peter"));
                    expect(_.size(scope.players)).toBe(2);
                });

                it('should update an existing player', function () {
                    socket.emit("player:connected", player("bob", "red"));
                    expect(_.size(scope.players)).toBe(1);
                    expect(scope.players["bob"].color).toBe("red");
                });
            });

            describe('on player:disconnected', function () {
                it('should remove the player', function () {
                    socket.emit("player:disconnected", player());
                    expect(_.size(scope.players)).toBe(0);
                });
            });

            describe('on game:created', function () {
                it('should initialize the board', function () {
                    socket.emit("game:created", game());
                    expect(scope.board).toEqual([
                        [{coords: {x: 0, y: 0}}, {coords: {x: 1, y: 0}}],
                        [{coords: {x: 0, y: 1}}, {coords: {x: 1, y: 1}}]
                    ]);
                });
            });

            describe('on player:moved', function () {
                it('should update a players coordinates', function () {
                    var bob = player();
                    var newCoords = {x: 0, y: 1};
                    bob.coords = newCoords;
                    socket.emit("player:moved", bob);
                    expect(scope.players[bob.id].coords).toEqual(newCoords);
                });
            });
        });

        var player = function (id, color) {
            return {id: id || "bob", coords: {x: 0, y: 0}, color: color || "blue"};
        };

        var players = function () {
            var somePlayer = player();
            var players = {};
            players[somePlayer.id] = somePlayer;
            return players;
        };

        var game = function() {
            return {board: {width: 2, height: 2}};
        };
    });
});

var SocketStub = function () {
    this.handlers = {};
};

SocketStub.prototype.on = function (name, func) {
    this.handlers[name] = func;
};

SocketStub.prototype.emit = function (name) {
    var func = this.handlers[name];
    if (func) {
        var args = Array.prototype.slice.call(arguments, 1);
        func.apply(this, args);
    }
};