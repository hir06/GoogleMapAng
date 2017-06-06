(function() {
    'use strict';
    var MapApp = angular.module("MapApp", [
        'ngRoute',
        'MapApp.dashBoard'
    ])


    MapApp.config(['$routeProvider', '$compileProvider', '$locationProvider',
        function($routeProvider, $compileProvider, $locationProvider) {
            $routeProvider
                .otherwise({
                    redirectTo: '/dashBoard'
                });
        }
    ]);

    MapApp.run(function($rootScope, $window) {
        console.log("App started successfully!");
    });

})();