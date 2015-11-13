jaqApp.controller('followCtrl', function($scope, $http, md5) {
$http({
  method: 'GET',
  url: '/users/following'
    //change the userID depending on signed in user
    }).then(function successCallback(response) {
  
       console.log(response.data[0].google.email)
    $scope.hashEmailed = []
        if (response.data.length>0 ){
          
           for (var i=0; i < response.data.length; i++){
            $scope.hashEmailed.push(md5.createHash(response.data[i].google.email));
           }
        }
          console.log($scope.hashEmailed)
    console.log("people that follow account viewd", response)
   
    console.log("yourpostctrl", response)
    $scope.peopleYouFollow = response.data;
  }, function errorCallback(response) {
  });
});
