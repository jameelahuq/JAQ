 jaqApp.controller('homeCtrl', function($scope, $http) {
  
$http({
method: 'GET',
url: 'http://localhost:8080/everything'
  //change the userID depending on signed in user
  }).then(function successCallback(response) {
  console.log("here", response.data)
  $scope.data = response.data;
  
}, function errorCallback(response) {
});

  
});
      
