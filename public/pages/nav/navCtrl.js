"use strict";

jaqApp.controller('navCtrl', function ($scope, $http, constants) {

  let api = constants.siteUrl;

  $scope.login = function () {
    $http({
      method: 'GET',
      url: api + '/profile'
    }).then(function successCallback(response) {
      console.log(response)
    }, function errorCallback(response) {
      console.log("fail", response)
    });
  }

  $scope.login();

  console.log("inside navCtrl");
  $scope.addPost = function (post) {
    //console.log(post);

    $http({
      method: 'POST',
      data: post,
      url: api + '/posts/addPost'

    }).then(function successCallback(response) {
      console.log(response)
    }, function errorCallback(response) {
      swal("Oops...", "Please Sign in to Post", "error")
    });

  }
});