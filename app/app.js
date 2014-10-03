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
        if(value == '1'){
            return "१";
        }
        else if(value == "2"){
            return "२";
        }
        else if(value == "3"){
            return "३";
        }
        else if(value == "4"){
            return "४";
        }
        else if(value == "5"){
            return "५";
        }
        else if(value == "6"){
            return "६";
        }
        else if(value == "7"){
            return "७";
        }
        else if(value == "8"){
            return "८";
        }
        else if(value == "9"){
            return "९";
        }
        else if(value == "0"){
            return "०";
        }
        else if(value == '.'){
          return ".";
        }
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
    var total = 0;
    for (var i=0, len = $scope.productsInCart.length; i< len; i++ ){
      total = total + ($scope.productsInCart[i].quantity * $scope.productsInCart[i].unitPrice);
    }

    return total;
  };

});