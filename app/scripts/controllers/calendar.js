'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.dateChosen = false;
    var today = new Date();
    $scope.today = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    $http({
      method: 'GET',
      url: 'http://localhost:8000'
    }).then(function successCallback(response) {
      function remove(e) {
        e.high = e.high.substring(3);
        e.low = e.low.substring(3, e.low.length-1);
      }
      
      console.log('success');

      $scope.weatherData = response.data;
      remove($scope.weatherData.data.yesterday);

      var forecast = [$scope.weatherData.data.yesterday];
      $scope.weatherData.data.forecast.forEach(e => {
        remove(e);
        forecast.push(e);
      });
      $scope.forecast = forecast;
    }, function errorCallback(response) {
      // 请求失败执行代码
      console.log('failed to get data');
      console.log(response);
    });

    $(document).ready(function() {
      // page is now ready, initialize the calendar...
      $('#calendar').fullCalendar({
        // put your options and callbacks here
        dayClick: function(date, jsEvent, view) {
          var dateChosen = date.format().replace(/-/g, '');

          if(dateChosen === $scope.weatherData.date) {
            $scope.dateChosen = dateChosen;
            $scope.$digest();
          }
          // change the day's background color just for fun
          $(this).css('background-color', 'red');
  
        }
      })  
    });

    $scope.showDetail = function(day) {
      $scope.clickedDay = day;
    }
  });
