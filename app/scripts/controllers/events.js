'use strict';

angular.module('wixApp')
    .controller('EventsController', function ($scope, $http,$wix,$firebaseObject) {

        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        document.getElementById('widgetBody').style.height = h+'px';
        var ref = new Firebase("https://blazing-heat-2699.firebaseio.com/");

        var compId = $wix.Utils.getCompId();

               var artist = $firebaseObject(ref.child('instances').child(compId));
                artist.$loaded(
                    function() {
                        $scope.artistname= artist.name;
                        $http.jsonp('http://api.bandsintown.com/artists/' + artist.name + '/events.json?api_version=2.0&app_id=bit&callback=JSON_CALLBACK')
                            .success(function (data, status, headers, config) {
                                $scope.concerts = data;

                            })
                            .error(function () {
                                alert('Cant get events');
                            });
                    }
        )
    });