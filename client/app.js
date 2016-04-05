if (Meteor.isClient) {
  var App = angular.module('omdb', ['angular-meteor','ngMaterial']);

  App.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url('/static/ + url +')',
            'background-size' : 'cover'
        });
    };
})

  App.controller('SearchCtrl', ['$scope','$http','$mdToast','$mdMedia','$mdDialog', function ($scope,$http,$mdToast,$mdMedia,$mdDialog) {

  $scope.search="";
  $scope.showDetails=false;
  $scope.isLoading=false;
  $scope.page=1;
  $scope.movies = [];
  $scope.movieInfo=[];
  $scope.movietype="";
  $scope.types = [
            "",
           "movie",
           "series",
           "episode"
       ];
       $scope.resultsOrder;
       $scope.resultsOrders =[
         "",
         "Title",
         "Type",
         "Year"
       ];
  $scope.movieyear="";

  $scope.years = function() {
              var currentYear = new Date().getFullYear(), years = [];
              startYear = 1950;
              empty = "";
              years.push(empty);
              while ( startYear <= currentYear ) {
                      years.push(startYear++);
              }

              return years;
      };

      $scope.years = $scope.years();

  $scope.ReturnToList = function(){
    $scope.movieInfo=[];
    $scope.showDetails=false;
  };

  $scope.showSimpleToast = function(movie) {
     $mdToast.show(
       $mdToast.simple()
         .textContent("Let's watch "+movie.Title+" !")
         .position('bottom')
         .hideDelay(3000)
     );
   };
   $scope.cancel = function() {
     $mdDialog.cancel();
   };
   $scope.showAdvanced = function(ev) {
     var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
     $mdDialog.show({
       templateUrl: 'client/dialog1.tmpl.html',
       parent: angular.element(document.body),
       targetEvent: ev,
       clickOutsideToClose:true,
       fullscreen: useFullScreen
     })
     .then(function(answer) {
       $scope.status = 'You said the information was "' + answer + '".';
     }, function() {
       $scope.status = 'You cancelled the dialog.';
     });
     $scope.$watch(function() {
       return $mdMedia('xs') || $mdMedia('sm');
     }, function(wantsFullScreen) {
       $scope.customFullscreen = (wantsFullScreen === true);
     });
   };
      $scope.isResultListEmpty = function(){
        if ($scope.movies == null && $scope.search != "") return true;        else return false;
    };

      $scope.Delete = function(){
        $scope.search="";
        $scope.movies = [];

      };

      $scope.isSearchEmpty = function(){
        if($scope.search=="") return true;
        else return false;
      };
      $scope.isDoneLoading = function(){
        if($scope.movieInfo!=null) return true;
        else return false;
      };

      $scope.orderBy = function(){
        return $scope.resultsOrder;
      }

      $scope.SearchResults = function(){
        $scope.isLoading=true;
        $scope.movies = [];
        $http.get('http://www.omdbapi.com/?'+
        's='+$scope.search+
        '&plot=long'+
        '&page='+$scope.page+
        '&type='+$scope.movietype+
        '&y='+$scope.movieyear).then(function successCallback(response) {
          console.log(response);
            $scope.movies=response.data.Search ;
            $scope.isLoading=false;
    }, function errorCallback(response) {
          console.log(response|| "Request failed");
            $scope.isLoading=false;
    });
                };

        $scope.GetDetails = function(movie){
          $scope.isLoading=true;
          $scope.showDetails=true;
                      $scope.movieInfo = [];
                      $http.get('http://www.omdbapi.com/?'+
                      't='+movie.Title
                    ).then(function successCallback(response) {
                        console.log(response);

                    $scope.movieInfo = response.data;
                  }, function errorCallback(response) {
                        console.log(response|| "Request failed");

                  });

                            $scope.isLoading=false;      };

                                  $scope.GetTrailer = function(movie,ev){
                                    $scope.showDetails=true;
                                    if($(window).width()>900) $scope.width=900;
                                  else if($(window).width()>600) $scope.width=600;
                                    else if($(window).width()>320) $scope.width=320;
                                    else $scope.width=200;

                                                $scope.Trailer= [];
                                                $http.get('http://api.traileraddict.com/?'+
                                                'film='+movie.Title+
                                                '&count='+1+
                                                '&featured=yes'+
                                                '&width='+000

                                              ).then(function successCallback(response) {
                                                  console.log(response);
                                              $scope.Trailer = response.data;
                                              console.log("trailer= "+$scope.Trailer);
                                            }, function errorCallback(response) {
                                                  console.log(response|| "Request failed");
                                            });

                                                        $scope.showAdvanced(ev)  };


    }]);

  }
