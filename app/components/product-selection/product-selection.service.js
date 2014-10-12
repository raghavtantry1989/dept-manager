'use restrict';

angular.module('myDeptManager')
	.factory('ProductService',function($http, $q){
		var baseUrl = "products.json";

		var fetchAll = function(){
			var deferred = $q.defer();
			var url = baseUrl;

			$http.get(url).success(deferred.resolve).error(deferred.reject);

			return deferred.promise;
		};

		return{
			fetchAll : fetchAll
		}
	});

angular.module('myDeptManager')
	.factory('CartManagerService',function($rootScope){
		var itemsInCart = [];
		var itemCount = 0;

		var getCart = function(){
			return itemsInCart;
		};

		var addToCart = function(itemToAdd){
			itemCount++;
			itemsInCart.push(itemToAdd);
			$rootScope.$broadcast('cart:itemAdded');
		};

		var clearCart = function(){
			itemsInCart = [];
			itemCount = 0; 
			$rootScope.$broadcast('cart:cleared');
		};

		var getItemCount = function(){
			return itemCount;
		};

		var removeFromCart = function(index){
			itemCount--;
			itemsInCart.splice(index,1);
			$rootScope.$broadcast('cart:itemDeleted');
		}

		return {
			getCart : getCart,
			addToCart : addToCart,
			clearCart : clearCart,
			getItemCount : getItemCount,
			removeFromCart : removeFromCart
		}
	});

