'use strict';

jaqApp.controller('homeCtrl', function ($scope, $http) {

   //   $http({
   //       method: 'POST',
   //         url: '/id'
   //       }).then(function successCallback(response) {
   //         console.log("id", response)
   //       }, function errorCallback(response) {});

   $scope.clearField = function () {
     $scope.comment = "";
   }
   $scope.liked = "Like";
   var get = function () {
     $http({
       method: 'GET',
       url: '/everything'
         //change the userID depending on signed in user
     }).then(function successCallback(response) {
       //       console.log("woo[", response.data[0])
       //      $scope.posts = []
       //       for(var i=0; i<response.data.length; i++){
       //         for(var j=0; j<response.data[i].posts.length; j++){
       //           $scope.posts.push(response.data[i].posts[j].thePost);
       //         }
       //       }
       $scope.data = response.data;
     }, function errorCallback(response) {});
   }
   get();

   $scope.like = function (id) {
     if ($scope.liked === "Dislike") {
       $http({
         method: 'POST',
         url: '/dislikedPost/' + id

       }).then(function successCallback(response) {
         $scope.liked = "Like"
         get();
       }, function errorCallback(response) {});
     } else {
       $http({
         method: 'POST',
         url: '/likedPost/' + id
       }).then(function successCallback(response) {
         $scope.liked = "Dislike";
         get();
       }, function errorCallback(response) {});
     }
   }

   var getComments = function () {
     $scope.getComments = function (id) {
       $http({
         method: 'GET',
         url: '/comments/' + id
       }).then(function successCallback(response) {
         console.log("comments", response)
         $scope.comments = response.data.comments
       }, function errorCallback(response) {});
       $scope.addComment = function (comment) {
         var comment = comment
         $http({
           method: 'POST',
           data: comment,
           url: '/addComment/' + id
         }).then(function successCallback(response) {
           $scope.getComments(id)
         }, function errorCallback(response) {
           swal("Oops...", "Please Sign in to Comment", "error")
         });
       }
     }

   }
   getComments();

   $scope.box1 = true;
 });

 jaqApp.directive('slideToggle', function () {
   return {
     restrict: 'A',
     scope: {
       isOpen: "=slideToggle" // 'data-slide-toggle' in our html
     },
     link: function (scope, element, attr) {
       var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;

       // Watch for when the value bound to isOpen changes
       // When it changes trigger a slideToggle
       scope.$watch('isOpen', function (newIsOpenVal, oldIsOpenVal) {
         if (newIsOpenVal !== oldIsOpenVal) {
           element.stop().slideToggle(slideDuration);
         }
       });

     }
   };
 });
