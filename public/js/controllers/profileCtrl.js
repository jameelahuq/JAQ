jaqApp.controller('profileCtrl', function($scope, $http) {
$http({
  method: 'GET',
  url: 'http://localhost:8080/getPosts'
    //change the userID depending on signed in user
    }).then(function successCallback(response) {
    console.log(response)
    $scope.author=response.data[0].author
  }, function errorCallback(response) {
  }); 
});
