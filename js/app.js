(function (angular) {
	'use strict';

	/**
	* MyTodoMvc Module
	* 
	*主模块
	*/
	var myApp = angular.module('MyTodoMvc', ['ngRoute']);

	// myApp.config(['$routeProvider',function($routeProvider) {
	// 	$routeProvider
	// 		.when('/:status?',{
	// 			controller:'Maincontroller',
	// 		})
	// }])
	
	myApp.controller('Maincontroller', ['$scope','$location', function($scope,$location){

		//用于获取一个不重复的id
		function getId() {
			var id = Math.random();
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
			  		id = getId();
			  		break;
			  	}
			}
			return id;
		}
		// 造一个文本框模型，拿到文本框的value
		$scope.text = '';

		// 造一个列表模型
		$scope.todos = [
			{ id: 0.2,
			  text:'HTML',
			  completed: true},

			{ id: 0.122,
			  text:'Angular',
			  completed: false},

			{ id: 0.3423,
			  text:'Node.js',
			  completed: false}
		];

		//添加到todo
		$scope.add = function(){
			if (!$scope.text) {
				return;
			}
			$scope.todos.push({
				id:getId(),
				text:$scope.text,
				completed:false
			});
			$scope.text = '';
		};

		// 删除
		$scope.remove = function (id) {
		 	//删除谁？
			for (var i = 0 ; i < $scope.todos.length; i++) {
			  	if ($scope.todos[i].id === id) {
			  		$scope.todos.splice(i, 1);
			  		break;
			  	}
			}

		 };

		 //clear
		 $scope.clear = function () {
		 	var result = [];
		 	for (var i = 0 ; i < $scope.todos.length; i++) {
			  	if (!$scope.todos[i].completed) {
			  		result.push($scope.todos[i]);
			  	}
			}
			$scope.todos = result;
		 };

		 //是否已完成？ 
		 $scope.isCompleted = function () {
		 	for (var i = 0 ; i < $scope.todos.length; i++) {
			  	if ($scope.todos[i].completed) {
			  		return  true;
			  	}
			}
			return false;
		 };

		 // 当前正在编辑谁？
		 $scope.currentEditingId = -1;
   		 $scope.editing = function(id) {
      		$scope.currentEditingId = id;
         };
         $scope.save = function () {
         	$scope.currentEditingId = -1;
         };

   //       $scope.checkall = false;
   //       $scope.$watch('checkall',function (now,old) {
   //       	for (var i = 0 ; i < $scope.todos.length; i++) {
			//   	$scope.todos[i].completed = now;
			// }
   //       })
  		// 全选
          var now = true;
          $scope.toggleAll = function () {
          	for (var i = 0 ; i < $scope.todos.length; i++) {
			  	$scope.todos[i].completed = now;
			}
			now = !now;
          };


          // //状态筛选
          $scope.selector =  {};
          $scope.$location = $location;
          $scope.$watch('$location.hash()',function (now,old) {
		          	 // 拿到锚点
		          // var hash = window.location.hash;
		          // console.log(hash)	;
		 		console.log(now);
		 		// $location.path('/hello')
		 		// var hash = $location.hash();
		 		// window.$loca = $location;

		 		// console.log($location);
		 		
		        switch(now){
		          case '/active':
		          $scope.selector =  { completed:false };
		          break;
		          case '/completed':
		          $scope.selector =  { completed:true };
		          break;
		          default:
		          $scope.selector =  {};
		          break;
				};
          });

          //精确匹配
          $scope.equalCompare = function (self,target) {
          	console.log(self);
          	console.log(target);
          	return self === target;
          };




	}])     
})(angular);
