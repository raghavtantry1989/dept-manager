'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'ngSanitize',
  'ui.select',
  'ngGrid',
  'ngTable'
]);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

// Factory - Service to fetch the inventory list
app.factory('InventoryItems',function($http){
    var inventoryManager ={};

    inventoryManager.getItems = function(){
        return $http.get('service/products.json');    
    };

    return inventoryManager;
});

app.factory('CartManager',function(){
    var cart = {};
    cart.products=[];

    cart.getItems = function(){
        return cart.products;
    };

    cart.addItems = function(item){
        cart.products.unshift(item);
    }
    return  cart;
});

app.controller('InventoryManagerTestController',function($scope, $http, InventoryItems){
   InventoryItems.getItems().success(function(data){
    console.log(data);
    $scope.productList=data;
   })
});

// Services
app.service('productService',function(){
  var products = productList;
  var itemsInCart = [];

  this.getInventory = function(){
    return products;
  };

  this.getCart = function(){
    return itemsInCart;
  };

  this.addToCart = function(item){
    itemsInCart.unshift(item);
  };

});

//Filters
app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
});

// Controllers
app.controller('ProductController',function($scope, InventoryItems, CartManager){
	$scope.addedProducts=[];

    InventoryItems.getItems().success(function(data){
        $scope.products=data;
    });

  $scope.config ={
    placeholder    : 'Select a product to add',
    isTableVisible : false
  };
	
	$scope.add=function(item){
      $scope.addedProducts.unshift(item);  
		$scope.config.isTableVisible = true;                  // Make the table visible
    $scope.products.selected={};                   // Reset the selected object to clear the form inputs
    $scope.itemSelectionForm.$setPristine();       // Reset the angular form variable
	}
	
});


// Controller to display table of selected products in detail
app.controller('TableController',function($scope){
  
  $scope.removeFromCart = function(index){
    $scope.config.isTableVisible = index;
    $scope.addedProducts.splice(index,1);
  };
  
  $scope.totalAmount = function(){
    var total = 0;
    for (var i=0, len = $scope.addedProducts.length; i< len; i++ ){
      total = total + ($scope.addedProducts[i].quantity * $scope.addedProducts[i].unitPrice);
    }

    return total;
  };

});