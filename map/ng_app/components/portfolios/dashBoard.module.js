(function() {
    "use strict";

    angular.module('MapApp.dashBoard', [
            "MapApp.dashBoard.controllers",
            "MapApp.dashBoard.services",
        ])
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/dashBoard', {
            controller: 'dashBoardController',
            controllerAs: 'dashBoardVM',
            templateUrl: 'ng_app/components/dashBoard/dashBoard.html',
            //resolve: {}
        });
    }

})();