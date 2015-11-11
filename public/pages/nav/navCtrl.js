jaqApp.controller('navCtrl', function($scope, $http) {
  $scope.login = function(){
    $http({
      method: 'GET',
      url: 'http://localhost:8080/auth/google'
    }).then(function successCallback(response) {
      console.log(response)
    }, function errorCallback(response) {
      console.log("fail", response)
    });
  } 
  
  console.log("inside");
  $scope.addPost = function(post){
  console.log(post);  
  
  $http({
  method: 'POST',
  data: post,
  url: 'http://localhost:8080/addPost/56425e4b8ac17ff716d35431'

}).then(function successCallback(response) {
    console.log(response)
  }, function errorCallback(response) {
    console.log("fail", response)
  });
  
  }
});