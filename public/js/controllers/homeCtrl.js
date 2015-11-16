'use strict';

jaqApp.controller('homeCtrl', function ($scope, $http, md5) {

  var executed = false;
  $(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() > $(document).height() / 2 && executed === false && $scope.signedIn !== true) {
      executed = true;
      swal({
        title: "Sign in or Continue Reading?",
        text: "Sign in to share your opinion!",
        showCancelButton: true,
        cancelButtonText: "Keep Reading",
        imageUrl: "../../img/smiley.png",
        confirmButtonColor: "#00bb66",
        confirmButtonText: "Yes, sign in!",
        closeOnConfirm: false
      }, function () {

        swal("Awesome!", "You're signed in!", "success");
        window.location = "/auth/google"
      });
    }
  });

  var get = function () {
    $http({
      method: 'GET',
      url: '/users/posts'
        //change the userID depending on signed in user
    }).then(function successCallback(response) {
      $scope.signedIn = true;
      console.log("you good")
    }, function errorCallback(response) {});
  };
  get();



  $scope.liked = "Like";
  var get = function () {
    $http({
      method: 'GET',
      url: '/everything'
        //change the userID depending on signed in user
    }).then(function successCallback(response) {

      console.log("home", response);
      $scope.data = response.data;


      var obj = {
        post: null,
        likes: 0
      }
      for (var i = 0; i < response.data.length; i++) {
        for (var j = 0; j < response.data[i].posts.length; j++) {
          if (response.data[i].posts[j].likes > obj.likes) {
            obj.post = response.data[i].posts[j];
            obj.likes = response.data[i].posts[j].likes;
          }
        }
      }
      console.log(obj.post)
      $scope.featuredPostTitle = obj.post.title;

      function getWords(post) {
        return post.split(/\s+/).slice(1, 22).join(" ");
      }
      $scope.featuredPostBody = getWords(obj.post.thePost);
      $scope.featuredAuthor = obj.post.author;

      //find the largest response.data.posts[i].likes
      //      postWithMostLikes = response.data.posts[i].slice(0).sort(
      //        function(x, y) {return y.likes - x.likes})[0]
      //      )
    }, function errorCallback(response) {
      console.log(response)
    });
  };
  get();

  $scope.like = function (id) {
    mixpanel.track("Liked Post", {"Page Name": "Liked post"})

    if ($scope.liked === "Dislike") {
      $http({
        method: 'POST',

        url: '/posts/dislikedPost/' + id

      }).then(function successCallback(response) {
        $scope.liked = "Like";
        get();
      }, function errorCallback(response) {});
    } else {
      $http({
        method: 'POST',
        url: 'posts/likedPost/' + id

      }).then(function successCallback(response) {
        $scope.liked = "Dislike";
        get();
      }, function errorCallback(response) {});
    }
  };

  var getComments = function () {
    $scope.getComments = function (id) {
      mixpanel.track("Comments Viewed", {"Page Name": "Comments Viewed"})
      $http({

        method: 'GET',
        url: 'posts/comments/' + id

      }).then(function successCallback(response) {

        console.log("comments", response);
        var number = response.data.comments.length - 1
        var commenter = response.data.comments[number].author.google.name;
        $scope.emailAuthor = function () {
            $http({
              method: 'GET',
              url: 'posts/submit/' + response.data.author.google.email + '/' + commenter
            }).then(function successCallback(response) {
              console.log("success", response)

            }, function errorCallback(response) {
              console.log(response)
            });
          }
          //         
        $scope.comments = response.data.comments;
        $scope.hashEmailed = [];
        if (response.data.comments.length > 0 || response.data.comments !== undefined) {
          for (var i = 0; i < response.data.comments.length; i++) {
            $scope.hashEmailed.push(md5.createHash(response.data.comments[i].author.google.email));
          }
          console.log($scope.hashEmailed)
        }

      }, function errorCallback(response) {});
      $scope.addComment = function (comment) {
        var comment = comment;
        mixpanel.track("Added Comment", {"Page Name": "Comment made"})
        console.log(id)
        $http({
          method: 'POST',
          data: comment,
          url: 'comments/addComment/' + id
        }).then(function successCallback(response) {
          $scope.getComments(id)

        }, function errorCallback(response) {
          swal("Oops...", "Please Sign in to Comment", "error")
        });
      }
    }

  };
  getComments();

  $scope.box1 = true;
});

jaqApp.directive('slideToggle', function () {
  return {
    restrict: 'A',
    scope: {
      isOpen: "=slideToggle" // 'data-slide-toggle' in our html
    },
    link: function (scope, element, attr) {
      var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;

      // Watch for when the value bound to isOpen changes
      // When it changes trigger a slideToggle
      scope.$watch('isOpen', function (newIsOpenVal, oldIsOpenVal) {
        if (newIsOpenVal !== oldIsOpenVal) {
          element.stop().slideToggle(slideDuration);
        }
      });

    }
  };
});