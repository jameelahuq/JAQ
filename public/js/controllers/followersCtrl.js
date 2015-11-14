jaqApp.controller('followersCtrl', function($scope, $http, md5) {
  $http({
    method: 'GET',
    url: '/users/followers'
    //change the userID depending on signed in user
  }).then(function successCallback(response) {
    $scope.hashEmailed = [];
    if (response.data.length>0 ){

      for (var i=0; i < response.data.length; i++){
        $scope.hashEmailed.push(md5.createHash(response.data[i].google.email));
      }
    }
    $scope.peopleYouFollow = response.data;
  }, function errorCallback(response) {
  });
});