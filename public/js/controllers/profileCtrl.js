jaqApp.controller('profileCtrl', function ($scope, $http, $window) {

  $http({
    method: 'GET',
    url: 'http://localhost:8080/user/id'
      //change the userID depending on signed in user
  }).then(function successCallback(response) {
    $scope.author = response.data.google.name

    console.log("youtrl", response)
  }, function errorCallback(response) {
    swal("Oops...", "Please Sign in to view your profile", "error")
    $window.location.href = "#/home";

  });


});