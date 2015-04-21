'use strict';

angular.module('wixApp')
    .controller('EventsController', function ($scope, $http,$wix,$firebaseObject) {

        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        document.getElementById('widgetBody').style.height = h+'px';
        var ref = new Firebase("https://blazing-heat-2699.firebaseio.com/");

        var compId = $wix.Utils.getCompId();
        Wix.Styles.getStyleParams(function(styleParams) {
            $scope.widgetBackgroundColor = hexValue(styleParams.colors.widgetBackgroundColor);
            $scope.linkColor = hexValue(styleParams.colors.linkColor);
            $scope.separatorColor = hexValue(styleParams.colors.separatorColor);
            $scope.textColor = hexValue(styleParams.colors.textColor);

        });
        Wix.getSiteInfo( function(siteInfo) {
            $scope.shareUrl = siteInfo.url;
        });
        console.log("test");

        var artist = $firebaseObject(ref.child('instances').child(compId));
        console.log("artist");
        artist.$loaded(
            function() {
                $scope.artistname= artist.name;
                $scope.displayLimit = artist.displayLimit;
                $scope.footerLink = artist.footerLink;
                $scope.narrowLayout = artist.narrowLayout;
                $scope.notifyMe = artist.notifyMe;
                $scope.shareLinks = artist.shareLinks;

                $scope.showWidget = true;

            }
        );
        function setValue(setting,defaultValue){
            try {

            }
            catch (e){
                return defaultValue
            }

        }
        function hexValue(color){
            try{
               return rgb2hex(color.value)
            }
            catch (e){
                return null
            }
        }

        function rgb2hex(rgb){
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
        }
    });