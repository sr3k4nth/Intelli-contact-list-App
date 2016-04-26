var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/teachers').success(function(response) {
    console.log("I got the data I requested");
    $scope.contactlist = response;
    $scope.teacher = "";
  });
};

refresh();

$scope.addContact = function() {
  console.log($scope.teacher);
  $http.post('/teachers', $scope.teacher).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/teachers/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/teachers/' + id).success(function(response) {
    $scope.teacher = response;
  });
};  

$scope.update = function() {
  console.log($scope.teacher._id);
  $http.put('/teachers/' + $scope.teacher._id, $scope.teacher).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.teacher = "";
}

}]);