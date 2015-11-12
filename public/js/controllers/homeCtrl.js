'use strict';

jaqApp.controller('homeCtrl', function ($scope, $http) {

      var executed = false;
      $(window).scroll(function() {   
        if($(window).scrollTop() + $(window).height() > $(document).height() / 2 && executed === false && $scope.signedIn !== true) {
          executed = true;
          swal({   title: "Sign in or Continue Reading?",   text: "Sign in to share your opinion!",   showCancelButton: true, cancelButtonText:"Keep Reading",  imageUrl: "http://image1.spreadshirtmedia.net/image-server/v1/compositions/22970831/views/1,width=235,height=235,appearanceId=1,backgroundColor=f9f9f9,version=1440399755/smiley-T-shirts.jpg", confirmButtonColor: "#00bb66",   confirmButtonText: "Yes, sign in!",   closeOnConfirm: false }, function(){
            
            swal("Awesome!", "You're signed in!", "success"); 
            window.location="/auth/google"
          });
        }
      });
      
      var something = (function() {
        var executed = false;
        return function () {
          if (!executed) {
            executed = true;
            // do something
          }
        };
      })();
  


  var get = function () {
    $http({
      method: 'GET',
      url: '/users/posts'
        //change the userID depending on signed in user
    }).then(function successCallback(response) {
      $scope.signedIn = true;
      console.log("you good")
    }, function errorCallback(response) {});
  }
  get();
  
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

      console.log(response);

       $scope.data = response.data;
     }, function errorCallback(response) {
      console.log(response)
     });
   }
   get();

   $scope.like = function (id) {
     
     if ($scope.liked === "Dislike") {
       $http({
         method: 'POST',

         url: '/posts/dislikedPost/' + id

       }).then(function successCallback(response) {
         $scope.liked = "Like";
         get();
       }, function errorCallback(response) {});
     } else {
       $http({
         method: 'POST',
         url: 'posts/likedPost/' + id

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
         url: 'posts/comments/' + id

       }).then(function successCallback(response) {

         console.log("comments", response);
         $scope.comments = response.data.comments

       }, function errorCallback(response) {});
       $scope.addComment = function (comment) {
         var comment = comment;
         $http({
           method: 'POST',
           data: comment,
           url: 'comments/addComment/' + id
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
