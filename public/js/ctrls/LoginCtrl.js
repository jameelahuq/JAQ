/**
 * Created by HUQ on 10/28/15.
 */
"use strict";


//todo: this variable is accessible outside of the scope?!?!
app.controller('LoginCtrl', function($scope, $location, $http, $state, LoginService) {
  console.log("loginCtrl loaded");

  $scope.loginGoogle = function() {
    console.log("google button pushed!");
    LoginService.google()
        .then(function(res) {
          console.log("got the info!");
          console.log(res);
        }
       );
      //  function(res) {
      //console.log(res);
    //});
    //window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "CLIENT_ID_HERE" + "&response_type=token";
    return false;
  };




  $scope.signup = function() {
    console.log("signup button pushed!");
    //window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "CLIENT_ID_HERE" + "&response_type=token";
    return false;
  };

});

app.service('LoginService', function($http, constant) {
  let api = constant.apiUrl;
  console.log(api + '/auth/google');
  this.google = function(){return $http.get(api + '/auth/google');};
  //this.facebook = function(){return $http.get(api + '/auth/facebook');};
  //this.twitter = function(){return $http.get(api + 'auth/twitter');};
  //this.add = function(params) {return $http.post(api + '/friends', params);};
});

//};

//module.exports = LoginCtrl;
//