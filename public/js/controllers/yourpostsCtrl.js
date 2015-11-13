'use strict';
jaqApp.controller('yourpostsCtrl', function ($scope, $http) {

  var get = function () {
    $http({
      method: 'GET',
      url: '/users/posts'
      //change the userID depending on signed in user
    }).then(function successCallback(response) {
      $scope.posts = response.data
    }, function errorCallback(response) {
    });
  };
  get();


  $scope.delete = function (id) {
    var id = id;
    swal({
          title: "Are you sure?",
          text: "You will not be able to recover this imaginary file!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function (isConfirm) {
          if (isConfirm) {
            swal("Deleted!", "Your imaginary file has been deleted.", "success");
            $http({
              method: 'DELETE',
              url: api + '/removePost/' + id
            }).then(function successCallback(response) {
              get();
            }, function errorCallback(response) {
            });
          } else {
            swal("Cancelled", "Your imaginary file is safe :)", "error");
          }
        });

    $http({
      method: 'DELETE',
      url: 'posts/removePost/' + id

      //change the userID depending on signed in user
      }).then(function successCallback(response) {
      get();
    });
  };
  $scope.read = true;
  $scope.edit = function (post) {

    $scope.edit = false
    $scope.editPost = post.thePost;
  

  }
});

