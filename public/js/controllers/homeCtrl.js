jaqApp.controller('homeCtrl', function($scope, $http) {
  $http({
  method: 'GET',
  url: 'http://localhost:8080/getPosts'
    }).then(function successCallback(response) {
    $scope.posts=response.data
  }, function errorCallback(response) {
  });  
  })
  
      
      
