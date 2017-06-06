(function() {
    "use strict";
    angular.module('MapApp.dashBoard.controllers', [])
        .controller('dashBoardController', dashBoardController);

    dashBoardController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval','$filter', 'AppService', 'dashBoardService', 'appConstants'];

    function dashBoardController($rootScope, $scope, $route, $location, $timeout, $interval,$filter, AppService,dashBoardService, appConstants) {
        var _this = this;
        google.maps.event.addDomListener(window, 'load', $scope.myMap);

        window.scrollTo(0, 0);
        _this.AppService = AppService;
        
        _this.place = "";
      
      
    
        _this.data = [];
      
        
        _this.fetchMapDetails = fetchMapDetails;
        _this.loadMap = loadMap;
        _this.searchLoc = searchLoc;
        var results;
        _this.showAnswer = false;
     
  
    


        function searchLoc() {
           var l= $filter('filter')(_this.data, function (item) {
              
                if (item.pincode == _this.place) {
                    
                    return item;
                }
           });
           if (l.length != 0) {
               AppService.ShowLoader();
               dashBoardService.search(l[0]);
               AppService.HideLoader();
           }
               
           else {
               AppService.ShowLoader();
               for (var i = 0; i < _this.data.length; i++) {
                   dashBoardService.addMarker(_this.data[i]);
               }
               AppService.HideLoader();
           }
         
        }
       
        function loadMap() {

            dashBoardService.init();
        }
        function fetchMapDetails() {
            AppService.ShowLoader();
            var promiseObj = dashBoardService.fetchMapDetails();
            promiseObj.then(function success(data) {

                _this.data = data.mapData;
                for (var i = 0; i < _this.data.length; i++) {
                    dashBoardService.addMarker(_this.data[i]);
                }
                AppService.HideLoader();
               // results = _this.data;
             
            },
            function error() {
                Materialize.toast("Couldn't load data!", 4000, "red")
            });
        }

       
        loadMap();

        fetchMapDetails();
     

    }

})();