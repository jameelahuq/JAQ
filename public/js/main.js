var jaqApp = angular.module('jaqApp', ['ui.router', 'angular-md5']);

jaqApp.constant('constants', {
 siteUrl: 'https://jaqd.herokuapp.com'
  //siteUrl:  'http://localhost:8080'

});

jaqApp.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'pages/home.html',
      controller: 'postCtrl'
    })

  .state('profile', {
    url: '/profile',
    templateUrl: 'pages/profile.html',
    controller: 'profileCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'pages/login.html',
    controller: 'loginCtrl'
  })

  .state('post', {
      url: '/post',
      templateUrl: 'pages/post.html',
      controller: 'postCtrl'
    })
    .state('profile.follow', {

      templateUrl: 'pages/profile.follow.html',
      controller: 'followCtrl'
    })
    .state('profile.tags', {

      templateUrl: 'pages/profile.tags.html',
      controller: 'tagsCtrl'
    })
    .state('profile.yourposts', {

      templateUrl: 'pages/profile.yourposts.html',
      controller: 'yourpostsCtrl'
    })
    .state('profile.followers', {

      templateUrl: 'pages/profile.followers.html',
      controller: 'followersCtrl'
    })

  $urlRouterProvider.otherwise('home')
})
jaqApp.directive('readMore', function () {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      text: '=ngModel'
    },
    template: "<p> {{text | readMoreFilter:[text, countingWords, textLength] }}" +
      "<a ng-show='showLinks' ng-click='changeLength()' class='color3'>" +
      "<strong ng-show='isExpanded'>  Show Less</strong>" +
      "<strong ng-show='!isExpanded'>  Show More</strong>" +
      "</a>" +
      "</p>",
    controller: ['$scope', '$attrs', '$element',
            function ($scope, $attrs) {
        $scope.textLength = $attrs.length;
        $scope.isExpanded = false; // initialise extended status
        $scope.countingWords = $attrs.words !== undefined ? ($attrs.words === 'true') : true; //if this attr is not defined the we are counting words not characters

        if (!$scope.countingWords && $scope.text.length > $attrs.length) {
          $scope.showLinks = true;
        } else if ($scope.countingWords && $scope.text.split(" ").length > $attrs.length) {
          $scope.showLinks = true;
        } else {
          $scope.showLinks = false;
        }

        $scope.changeLength = function (card) {
          $scope.isExpanded = !$scope.isExpanded;
          $scope.textLength = $scope.textLength !== $attrs.length ? $attrs.length : $scope.text.length;
        };
            }]
  };
});
jaqApp.filter('readMoreFilter', function () {
  return function (str, args) {
    var strToReturn = str,
      length = str.length,
      foundWords = [],
      countingWords = (!!args[1]);

    if (!str || str === null) {
      // If no string is defined return the entire string and warn user of error
      console.log("Warning: Truncating text was not performed as no text was specified");
    }

    // Check length attribute
    if (!args[2] || args[2] === null) {
      // If no length is defined return the entire string and warn user of error
      console.log("Warning: Truncating text was not performed as no length was specified");
    } else if (typeof args[2] !== "number") { // if parameter is a string then cast it to a number
      length = Number(args[2]);
    }

    if (length <= 0) {
      return "";
    }


    if (str) {
      if (countingWords) { // Count words

        foundWords = str.split(/\s+/);

        if (foundWords.length > length) {
          strToReturn = foundWords.slice(0, length).join(' ') + '...';
        }

      } else { // Count characters

        if (str.length > length) {
          strToReturn = str.slice(0, length) + '...';
        }

      }
    }

    return strToReturn;
  };
});