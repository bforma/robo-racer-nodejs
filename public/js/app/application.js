'use strict';

angular.module('roboRacer', ['roboRacer.filters', 'roboRacer.services', 'roboRacer.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/game', {templateUrl: 'partials/game', controller: GameCtrl});
    $routeProvider.otherwise({redirectTo: '/game'});
    $locationProvider.html5Mode(true);
  }]);