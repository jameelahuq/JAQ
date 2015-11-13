"use strict";

jaqApp.controller('navCtrl', function ($scope, $http) {

  $scope.post = function () {
    $http({
      method: 'GET',
      url: '/users/posts'
    }).then(function successCallback(res) {
      $('.js-checkbox-container').slideToggle(400);
    }, function errorCallback(err) {
      swal({
        title: "Sign in?",
        text: "You must be signed in to post!",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        imageUrl: "../../../img/smiley.png",
        confirmButtonColor: "#00bb66",
        confirmButtonText: "Yes, sign in!",
        closeOnConfirm: false
      }, function () {

        swal("Awesome!", "You're signed in!", "success");
        window.location = "/auth/google"
      });
    });
  };

  var get = function () {
    $http({
      method: 'GET',
      url: '/users/posts'
    }).then(function successCallback(res) {
      $scope.loggedIn = true;
      console.log(res);
    }, function errorCallback(err) {
      $scope.loggedIn = false;
      console.log(err);
    });
  }
  get();

  console.log("inside navCtrl");
  $scope.addPost = function (postData) {
    
    $http({
      method: 'POST',
      data: postData,
      url: '/posts/addPost'
    }).then(function successCallback(response) {
       $('.js-checkbox-container').slideToggle(400);
    }, function errorCallback(err) {
      swal("Oops...", "Please Sign in to Post", err)
    });

  }
});