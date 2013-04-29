describe('Robo Racer controllers', function() {

    describe('GameCtrl', function(){

        it('should initialize an empty players map', function() {
            var socket = {on: function(name, func) {}};
            var scope = {},
                ctrl = new GameCtrl(scope, socket);

            expect(_.size(scope.players)).toBe(1);
        });
    });
});