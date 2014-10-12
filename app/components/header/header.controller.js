'use restrict';

angular.module('myDeptManager')
	.controller('HeaderController',function($scope, CartManagerService){
		$scope.itemCount = CartManagerService.getItemCount();

		$scope.$on('cart:itemAdded', function() {
	    	$scope.itemCount = CartManagerService.getItemCount();
	    });

	    $scope.$on('cart:cleared', function() {
	    	$scope.itemCount = CartManagerService.getItemCount();
	    });

	    $scope.$on('cart:itemDeleted', function() {
	    	$scope.itemCount = CartManagerService.getItemCount();
	    });
	});