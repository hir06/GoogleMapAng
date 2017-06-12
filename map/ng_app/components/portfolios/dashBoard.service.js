(function() {
    angular.module('MapApp.dashBoard.services', [])
        .factory('dashBoardService', dashBoardService);

    dashBoardService.$inject = ["$timeout", "$q", "$http", "appConstants"];

    function dashBoardService($timeout, $q, $http, appConstants) {
        var _this = this;
        _this.map = null;
       
         _this.gmarkers = [];
        //call service to get JSON data
        var dashBoardService = {
            fetchMapDetails: fetchMapDetails,
            init: init,
            search: search,
            addMarker: addMarker

        };

        return dashBoardService;
        function init() {
            var options = {
                center: new google.maps.LatLng(40.7127837, -74.00594130000002),
                zoom: 4,
                disableDefaultUI: true
            }
            _this.map = new google.maps.Map(
                document.getElementById("map"), options
            );
            _this.places = new google.maps.places.PlacesService(_this.map);
        }

        function search(str) {
           
                for (var i = 0; i < _this.gmarkers.length; i++) {
                    _this.gmarkers[i].setMap(null);
                }

                var loc = new google.maps.LatLng(str.lat, str.lon);
                _this.marker = new google.maps.Marker({
                    //map: _this.map,
                    position: loc,
                    animation: google.maps.Animation.DROP
                });

                _this.marker.setMap(_this.map);
                _this.map.setCenter(loc);
                var contentString = '<p>' + "Lat:" +
                   str.lat +
               '</p>' +
               '<p>' + "lon:" +
                  str.lon +
               '</p>' +
               '<p>' + "pin:" +
                  str.pincode +
               '</p>';

                google.maps.event.addListener(_this.marker, 'click', (function (marker, content, infowindow) {
                    return function () {
                        infowindow.setContent(content);
                        infowindow.open(_this.map, marker);
                    };
                })(_this.marker, contentString, new google.maps.InfoWindow()));

            
          
        }

        function addMarker(res) {
        
            var loc = new google.maps.LatLng(res.lat, res.lon);
      
            _this.marker = new google.maps.Marker({
           
                position: loc
                //animation: google.maps.Animation.DROP
            });
            //_this.map.setCenter(location);
            _this.gmarkers.push(_this.marker);
            _this.marker.setMap(_this.map);
            var contentString = '<p>' + "Lat:" + 
                res.lat +
            '</p>'+
            '<p>' + "lon:" +
               res.lon +
            '</p>'+
            '<p>' + "pin:" +
               res.pincode +
            '</p>';
         
            google.maps.event.addListener(_this.marker, 'click', (function (marker, content, infowindow) {
                return function() {
                    infowindow.setContent(content);
                    infowindow.open(_this.map,marker);
                };
            })(_this.marker, contentString, new google.maps.InfoWindow()));
         
      
        }

        function fetchMapDetails(params) {

            var def = $q.defer();

            //var req = {
            //    method: 'GET',
            //    url: '../content/MOCK_DATA.html',


            //}
            $http.get('https://hir06.github.io/GoogleMapAng/map/content/MOCK_DATA.html').then(function (response) {
                def.resolve({
                    mapData: response.data
                });
            }, function(arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }



    }
})();