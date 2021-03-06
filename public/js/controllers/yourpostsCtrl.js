'use strict';
jaqApp.controller('yourPostsCtrl', function ($scope, $http) {

  var get = function () {
    $http({
      method: 'GET',
      url: '/users/posts'
        //change the userID depending on signed in user
    }).then(function successCallback(response) {
      $scope.posts = response.data
    }, function errorCallback(response) {});
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
            url: '/removePost/' + id
          }).then(function successCallback(response) {
            get();
          }, function errorCallback(response) {});
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
  $scope.editText = true;
  var currentEdit = [];
  $scope.edit = function (post) {
    currentEdit.push(post);
    if (post) {
      $scope.editPost = post.thePost;
    }
    $scope.editText === true ? $scope.editText = false : $scope.editText = false
    var number = currentEdit.length - 1;
    if (currentEdit[number] !== undefined) {
      var currentEditId = currentEdit[number]._id;
    }
    $scope.pushEdit = function (editPost) {
      var obj = {
        thePost: editPost
      }
      console.log(obj)
      $http({
        method: 'POST',
        url: 'posts/edit/' + currentEditId,
        data: obj
          //change the userID depending on signed in user
      }).then(function successCallback(response) {
        get();
      });
    }
  }
});