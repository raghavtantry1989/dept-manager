'use restrict';

angular.module('myDeptManager')
	.controller('ProductSelectionController',function($scope, ProductService , CartManagerService){
		
		$scope.selectedProduct = {};

		$scope.getProducts = function(){
			ProductService.fetchAll().then(function(result){
				$scope.productList = (result !== 'null') ? result : {};
			}, function (reason){
				console.log('ERROR', reason);
			});
		};
		$scope.getProducts();

		$scope.addToCart = function(){
			CartManagerService.addToCart($scope.selectedProduct.selected || {});
			// console.log(CartManagerService.getCart());
			
			$scope.selectedProduct.selected = {
				quantity : '',
				unitPrice : ''
			};
			$scope.productSelectionForm.$setPristine();
			$scope.getProducts(); //#Revisit : Making a service call instead of setting $scope.selectedProduct = {}; ??

		}


	});




