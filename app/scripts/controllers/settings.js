'use strict';

angular.module('appSettings')
    .controller('SettingsCtrl', function ($scope, $wix, $firebaseObject) {
        $scope.params = {
            account: 'john@doe.com'
        };

        var ref = new Firebase("https://blazing-heat-2699.firebaseio.com/");
        var compId= $wix.Utils.getCompId();
        var origCompId = $wix.Utils.getOrigCompId();
        $scope.compId = compId;
        $scope.origCompId = origCompId;
        $scope.artist= $firebaseObject(ref.child('instances').child(origCompId));
        $wix.UI.initialize({
            numOfImages: 10,
            isIconShown: true,
            imageVisibility: 'show',
            imagesToSync: 0,
            imageMeta: true,
            imageAlt: false,
            imageLink: false
        });

        $wix.UI.onChange('*', function() {
            $wix.Settings.triggerSettingsUpdatedEvent('updated', $wix.Utils.getOrigCompId());
        });

        var saveArtist = function(){

        };
    });