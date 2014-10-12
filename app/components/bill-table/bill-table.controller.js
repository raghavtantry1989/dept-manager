'use restrict';

angular.module('myDeptManager')
	.controller('BillTableController',function($scope, CartManagerService){
		$scope.itemsInCart = CartManagerService.getCart();


		$scope.$on('cart:itemAdded', function() {
	    	$scope.itemsInCart = CartManagerService.getCart();
	    	$scope.isBillTableVisible = true; 
	    });

		$scope.$on('cart:cleared', function() {
	    	$scope.itemsInCart = CartManagerService.getCart();
	    });
		
		$scope.$on('cart:itemDeleted', function() {
	    	$scope.itemsInCart = CartManagerService.getCart();
	    });

	    $scope.totalAmount = function(){
	    	var total = 0,
	    		cartItems =  $scope.itemsInCart;

	    	for(var index=0, len = cartItems.length ; index<len; index++){
	    		total = total + (cartItems[index].quantity * cartItems[index].unitPrice);
	    	};

	    	return total;
	    };
	});