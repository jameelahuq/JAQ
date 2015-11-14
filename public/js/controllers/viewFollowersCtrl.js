'use strict';

jaqApp.controller('viewFollowersCtrl', function ($scope, $http, $window, md5, $location, $state) {
  console.log("hello");
  var currentProfile = $location.path();
  $state.go('viewProfile.followers');

   $http({
    method: 'GET',
    url: '/users/' + currentProfile
   }).then(function successCallback(response) {
    $scope.author = response.data.google.name || "Guest" ;

  }, function errorCallback(err) {
     console.log(err);
  });

  $http({
    method: 'GET',
    url: '/users/followers' + currentProfile
  }).then(function successCallback(response) {

    $scope.hashEmailed = [];

    if (response.data.followers.length > 0 ) {
      for (var i=0; i < response.data.followers.length; i++) {
        $scope.hashEmailed.push(md5.createHash(response.data.followers[i].google.email));
      }
    }

    $scope.peopleThatFollow = response.data.followers;

  }, function errorCallback(err) {
        console.log(err)
  });

});
