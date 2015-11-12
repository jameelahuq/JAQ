'use strict';
jaqApp.controller('yourpostsCtrl', function ($scope, $http) {

  var get = function () {
    $http({
      method: 'GET',
      url: '/users/posts'
        //change the userID depending on signed in user
    }).then(function successCallback(response) {

      console.log("yourpostctrl", response)
      $scope.posts = response.data
    }, function errorCallback(response) {});
  }
  get();

  $scope.delete = function (id) {
    var id = id;
    $http({
      method: 'DELETE',
      url: '/removePost/' + id
        //change the userID depending on signed in user
    }).then(function successCallback(response) {
      get();

    }, function errorCallback(response) {});

  }
  $scope.edit = function (id) {
    console.log(id);

  }
});
