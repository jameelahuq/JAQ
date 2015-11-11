jaqApp.controller('yourpostsCtrl', function($scope, $http) {
$http({
  method: 'GET',
  url: 'http://localhost:8080/getPosts'
    //change the userID depending on signed in user
    }).then(function successCallback(response) {
    $scope.posts=response.data
  }, function errorCallback(response) {
  }); 
});
