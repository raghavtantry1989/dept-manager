'use restrict';

angular.module('myDeptManager')
	.directive('billTable',function(CartManagerService){
		return{
			restrict : 'E',
			templateUrl:'components/bill-table/bill-table.html',
			scope:{
				cartItems : '=cartItems',
				totalAmount : '&totalAmount'
			},
			controller : function($scope, $window){

				$scope.reset = function(){
					CartManagerService.clearCart();
				};

				$scope.printBill = function(){
					$window.print();
				};

				$scope.deleteFromCart = function(index){
			    	CartManagerService.removeFromCart(index);
			    }
			}
		}
	});