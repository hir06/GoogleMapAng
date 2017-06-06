(function() {
    'use strict';
    var AppService = angular.module('MapApp')
        .factory('AppService', function($rootScope, $http, $location, $timeout) {


            return {
                ShowLoader: function(message) {

                    (function() {
                        setTimeout(function() {
                            $rootScope.$apply(function() {
                                $rootScope.loaderVisibility = true;
                              
                            })
                        }, 0);
                    })();
                },
                HideLoader: function() {
                    (function() {
                        setTimeout(function() {
                            $rootScope.$apply(function() {
                                $rootScope.loaderVisibility = false;
                            })
                        }, 0);
                    })();
                    setTimeout(SetRippleEffectHandle, 0);

                }
           
            };
        })

})();