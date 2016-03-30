if (Meteor.isClient) {
  const App = angular.module('omdb', ['angular-meteor','ngMaterial']);

  App.controller('SearchMoviesCtrl', ['$scope','$http','$mdToast', function ($scope,$http,$mdToast) {

  $scope.search="";
  $scope.showMovieDetails=false;
  $scope.movies = [];
  $scope.movieInfo=[];
  $scope.movietype="";
  $scope.types = [
            "",
           "movie",
           "series",
           "episode"
       ];
  $scope.movieyear="";


  $scope.years = function() {
              var currentYear = new Date().getFullYear(), years = [];
              startYear = 1950;
              empty = ""
              years.push(empty);
              while ( startYear <= currentYear ) {
                      years.push(startYear++);
              }

              return years;
      }

      $scope.years = $scope.years();

  $scope.ReturnToList = function(){
    $scope.movieInfo=[];
    $scope.showMovieDetails=false;
  }

  $scope.showSimpleToast = function(movie) {
     $mdToast.show(
       $mdToast.simple()
         .textContent("Let's watch "+movie.Title+" !")
         .position('bottom')
         .hideDelay(3000)
     );
   };

      $scope.isMovieListEmpty = function(){
        if($scope.movies==null && $scope.search != "") return true;
        else return false;
    };

      $scope.Delete = function(){
        $scope.search="";
        $scope.movies = [];

      };

      $scope.isSearchEmpty = function(){
        if($scope.search=="") return true;
        else return false;
      };

      $scope.SearchMovies = function(){
        $scope.movies = [];
        $http.get('http://www.omdbapi.com/?'
        +'s='+$scope.search
        +'&type='+$scope.movietype
        +'&y='+$scope.movieyear).then(function successCallback(response) {
          console.log(response);
      $scope.movies = response.data.Search;
    }, function errorCallback(response) {
          console.log(response|| "Request failed");
    });
                    };

        $scope.GetMovieInfo = function(movie){
          $scope.showMovieDetails=true;
                      $scope.movieInfo = [];
                      $http.get('http://www.omdbapi.com/?'
                      +'t='+movie.Title
                    ).then(function successCallback(response) {
                        console.log(response);
                    $scope.movieInfo = response.data;
                  }, function errorCallback(response) {
                        console.log(response|| "Request failed");
                  });
                                  };


    }])

    .controller('ChatCtrl', ['$scope', function($scope){

      $scope.Pseudo = "";
      $scope.Text = "";

      $scope.checkForm= function(){
      if ($scope.Pseudo !="" && $scope.Text !="") return true;
      else return false;
      }

      $scope.isFilled = function(){
      if($scope.messages.length > 0){
        return true;
      }
      else false;
    };

      $scope.sendMessage = function(){
  if($scope.checkForm()){

    var newMessage = new function() {
           this.Pseudo = $scope.Pseudo;
           this.Text = $scope.Text;
       }
       $scope.Pseudo = "";
       $scope.Text = "";
       $scope.messages.push(newMessage);


  }




      };

      $scope.messages =[] ;

    }]);

}
