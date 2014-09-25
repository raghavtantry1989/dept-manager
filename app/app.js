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
app.controller('ProductController',function($scope,$compile){
	$scope.addedProducts=[];
	
	$scope.disabled = false;
	$scope.products = productList;
	$scope.placeholder = "Select a product to add";
    $scope.grandTotal;

	$scope.enable = function() {
	$scope.disabled = false;
	};

	$scope.disable = function() {
	$scope.disabled = true;
	};
	// $scope.myData = [{name: "Moroni", age: 50},
 //                     {name: "Tiancum", age: 43},
 //                     {name: "Jacob", age: 27},
 //                     {name: "Nephi", age: 29},
 //                     {name: "Enos", age: 34}];

	$scope.add=function(item){
		console.log(item);
		$scope.addedProducts.push(item);
		// $scope.gridOptions =  { data: 'addedProducts' };
		$scope.isTableVisible = true;
        $scope.products.selected={};
        $scope.itemSelectionForm.$setPristine();
	}
	$scope.change=function(){
		console.log("What");
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