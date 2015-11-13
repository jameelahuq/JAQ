jaqApp.controller('followCtrl', function($scope, $http) {
$http({
  method: 'GET',
  url: '/users/following'
    //change the userID depending on signed in user
    }).then(function successCallback(response) {
    console.log("yourpostctrl", response)
    $scope.peopleYouFollow = response.data;
  }, function errorCallback(response) {
  });
});
