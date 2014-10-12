'use restrict';

angular.module('myDeptManager')
	.directive('productSelection',function(){
		return{
			restrict: 'E',
			templateUrl:'components/product-selection/product-selection.html'
		}
	})