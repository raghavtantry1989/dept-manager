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
        return $http.get('products.json');    
    };

    return inventoryManager;
});


// Filter
app.filter('marathiNumerals',function(){
  console.log("Insode Filter");
    var marathiNumeralsFilter = function(input){
        console.log(input);
        var engNumbers = input.toString();
        var convertedString = "";
        for(var i=0 ; i< engNumbers.length; i++){
            convertedString = convertedString + convertToMarathi(engNumbers[i]);
        }
        return convertedString;
    }

    var convertToMarathi = function(value){
      switch(value){
        case "1" : return "१";
        case "2" : return "२";
        case "3" : return "३";
        case "4" : return "४";
        case "5" : return "५";
        case "6" : return "६";
        case "7" : return "७";
        case "8" : return "८";
        case "9" : return "९";
        case "0" : return "०";
        case "." : return ".";
      };
    };

    return marathiNumeralsFilter;

});


app.factory('CartManager',function(){
    var cart = {};
    cart.products=[];
    cart.count=0;

    cart.getItems = function(){
      return cart.products;
    };

    cart.addItems = function(item){
      cart.count++;
      cart.products.unshift(item);
    }

    cart.removeItem = function(index){
      cart.count--;
      cart.products.splice(index,1);
    }

    cart.getCount = function(){
      console.log("Raj" + cart.count);
      return cart.count;
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
  var products = productList,
      itemsInCart = [];

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

    InventoryItems.getItems().success(function(data){
        $scope.products=data;
    });

  $scope.config ={
    placeholder    : 'Select a product to add',
    isTableVisible : false,
    count:0
  };
	
	$scope.add=function(item){
        //#Revisit
        $scope.config.count = $scope.config.count+1;
        CartManager.addItems(item);
        $scope.config.isTableVisible = true;            // Make the table visible
        $scope.products.selected={};                   // Reset the selected object to clear the form inputs
        $scope.itemSelectionForm.$setPristine();       // Reset the angular form variable

        //# To fetch the scope issue , fetch the json from the service again, 
        InventoryItems.getItems().success(function(data){
            $scope.products=data;
        });
	}
	
});

app.controller('CartController',function($scope, CartManager){
  $scope.itemsInCart = CartManager.getCount();
});


// Controller to display table of selected products in detail
app.controller('TableController',function($scope, CartManager){
  $scope.productsInCart = CartManager.getItems();
  
  $scope.removeFromCart = function(index){
    //#Revisit
        $scope.config.count = $scope.config.count-1;
    //$scope.config.isTableVisible = index;
    CartManager.removeItem(index);
  };
  
  $scope.totalAmount = function(){
    var total = 0,
        cartItems = $scope.productsInCart;  
        
    for (var i=0, len = cartItems.length; i< len; i++ ){
      total = total + (cartItems[i].quantity * cartItems[i].unitPrice);
    }

    return total;
  };

  $scope.printBill = function(){
    window.print();
  }

});