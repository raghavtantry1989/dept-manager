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

// Services
app.service('productService',function(){
  this.addedProducts=[];
})

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
app.controller('ProductController',function($scope, productService){
	$scope.addedProducts=[];

	$scope.products = productList;

  $scope.config ={
    placeholder    : 'Select a product to add',
    isTableVisible : false
  };
	
	$scope.add=function(item){
    if( avoidDuplicate(item)){
      $scope.addedProducts.unshift(item);  
    }
		$scope.config.isTableVisible = true;                  // Make the table visible
    $scope.products.selected={};                   // Reset the selected object to clear the form inputs
    $scope.itemSelectionForm.$setPristine();       // Reset the angular form variable
	}

  var avoidDuplicate=function(item){
    for (var i=0, len = $scope.addedProducts.length; i< len; i++ ){
      if(item.productName == $scope.addedProducts[i]){
        return false;
      }
    }
    return true;

  };
	
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


var productList=[
    {
        "productName":"Sugar",
        "unitPrice":31,
        "quantityUnit":"kg",
        "productCategory":"Home Eatable",
        "productCode":""
    },
    {
        "productName":"Shengdana",
        "unitPrice":60,
        "quantityUnit":"kg",
        "productCategory":"Home Eatable",
        "productCode":""
    },
    {
        "productName":"Harbhara Dal",
        "unitPrice":40,
        "quantityUnit":"kg",
        "productCategory":"Home Eatable",
        "productCode":""
    },
    {
        "productName":"Turdal",
        "unitPrice":76,
        "quantityUnit":"kg",
        "productCategory":"Home Eatable",
        "productCode":""
    },
    {
        "productName":"MoongDal",
        "unitPrice":96,
        "quantityUnit":"kg",
        "productCategory":"Home Eatable",
        "productCode":""
    },
    {
        "productName":"Mutki Dal",
        "unitPrice":84,
        "quantityUnit":"kg",
        "productCategory":"Home Eatable",
        "productCode":""
    },
    {
        "productName":"Udit Dal",
        "unitPrice":84,
        "quantityUnit":"kg",
        "productCategory":"Home Eatable",
        "productCode":""
    },
    {
        "productName":"Mutki",
        "unitPrice":70,
        "quantityUnit":"kg",
        "productCategory":"Home Eatable",
        "productCode":""
    },
    {
        "productName":"Vatana",
        "unitPrice":60,
        "quantityUnit":"kg",
        "productCategory":"Home Eatable",
        "productCode":""
    }
];