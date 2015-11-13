"use strict";

jaqApp.controller('navCtrl', function ($scope, $http) {

  $scope.post = function () {
    $http({
      method: 'GET',
      url: '/users/posts'
    }).then(function successCallback(response) {
      $('.js-checkbox-container').slideToggle(400);
    }, function errorCallback(response) {
      swal({
        title: "Sign in?",
        text: "You must be signed in to post!",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        imageUrl: "http://image1.spreadshirtmedia.net/image-server/v1/compositions/22970831/views/1,width=235,height=235,appearanceId=1,backgroundColor=f9f9f9,version=1440399755/smiley-T-shirts.jpg",
        confirmButtonColor: "#00bb66",
        confirmButtonText: "Yes, sign in!",
        closeOnConfirm: false
      }, function () {

        swal("Awesome!", "You're signed in!", "success");
        window.location = "/auth/google"
      });
    });
  }

  var get = function () {
    $http({
      method: 'GET',
      url: '/users/posts'
    }).then(function successCallback(response) {
      $scope.inButton = false;
      $scope.outButton = true;
      console.log("you good")
    }, function errorCallback(response) {
      $scope.inButton = true;
      $scope.outButton = false;
      console.log("yooo");
    });
  }
  get();

  console.log("inside navCtrl");
  $scope.addPost = function (postData) {
    var postData = postData
    
    $http({
      method: 'POST',
      data: postData,
      url: '/posts/addPost'
    }).then(function successCallback(response) {
      console.log(response)
       $('.js-checkbox-container').slideToggle(400);
    }, function errorCallback(response) {
      swal("Oops...", "Please Sign in to Post", "error")
    });

  }
});