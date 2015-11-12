jaqApp.controller('navCtrl', function ($scope, $http) {

  $scope.login = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/profile'
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
      url: 'http://localhost:8080/addPost'

    }).then(function successCallback(response) {
      console.log(response)
    }, function errorCallback(response) {
      swal("Oops...", "Please Sign in to Post", "error")
    });

  }
});