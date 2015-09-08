angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $localstorage, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


  $scope.logout = function() {
    console.log('logout');
    Parse.User.logOut();
    $state.go('login');
  }

  $scope.showPopup = function(title, message) {
     var alertPopup = $ionicPopup.alert({
       title: title,
       template: message
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });    
  }

  console.log($scope.authUser);

})


.controller('LoginCtrl', function($scope, $state, $controller, $localstorage) {

  $controller('AppCtrl', { $scope: $scope });

  $scope.fbLogin = function() {
    Parse.FacebookUtils.logIn('email,public_profile,user_friends', {
        success: function(user) {
          console.log(user);
          
          if (!user.existed()) {
            $scope.showPopup("Welcome!", "User signed up and logged in through Facebook!");
            console.log("fbLogin - success (option 1)");
          } else {
            $scope.showPopup("Welcome!", "User logged in through Facebook!");
            console.log("fbLogin - success (option 2)");
          }

          /*FB.api('/me', function(response) {
            alert('Your name is ' + response.name);
          });*/

          FB.api('/me?fields=picture,name', function(response) {
            console.log(response);
            user.set("fullname", response.name);
            user.set("avatar", response.picture.data.url);
            user.save(null);

            $scope.authUser = $localstorage.setObject('authUser', user);
          });

          FB.api('/me/friends', {fields: 'name'}, function(response) {
            console.log(response);
          });

          $state.transitionTo("app.search");
        },
        error: function(user, error) {
          $scope.showPopup("Error", "User cancelled the Facebook login or did not fully authorize.");
          console.log("fbLogin - error");
        }
    });    
  }

})



.controller('SearchCtrl', function($scope, $controller, $localstorage) {
  
  $controller('AppCtrl', { $scope: $scope });

  $scope.authUser = $localstorage.getObject('authUser');
  console.log("SearchCtrl");
  console.log($scope.authUser);

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

})

.controller('PlaylistsCtrl', function($scope, $localstorage) {
  $scope.authUser = localStorageService.get('authUser');
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
