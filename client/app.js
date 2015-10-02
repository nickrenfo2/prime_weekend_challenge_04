/**
 * Created by Nick on 10/2/15.
 */
var app = angular.module('app',[]);
app.controller('IndexController', ['$scope', '$http', function($scope,$http){
    $scope.itworks ='IT WORKS!';
    //var firstList = {title:'Morning Tasks',list:["Wake Up","Take Shower","Go to Prime"]};
    $scope.myLists = [];
    $scope.addingItem = false;
    $scope.itemText = '';

    $scope.addItem = function($event) {
        $scope.addingItem = true;
        console.log("add item");
        var myEl = $event.target;
        console.log(myEl);

    };

    $scope.submitItem = function() {
        console.log('submitting item');
        console.log($scope.itemText);
        if ($scope.itemText){
            $scope.addingItem=false;
            $scope.myLists[0].list.push(itemText);//Instead of adding it to the list, push it to Mongo
            $scope.itemText = '';
        }
    };

    var fetchLists = function() {
        //console.log('fetching lists');
        return $http.get('/lists').then(function (res) {
            if(res.status !== 200) throw new Error('Failed to fetch lists');
            $scope.myLists = res.data;
            //console.log(res.data);
            return res.data;
        });
    };

    var saveList = function(list){
        //console.log(list);
        return $http.post('/list',list).then($scope.fetchLists);
    };

    $scope.saveList = function(list){
        return saveList(list);
    };

    fetchLists();

}]);
