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


var productList =[
    {
        "productName": "साखर",
        "englishTranslation": "Sakhar",
        "unitPrice": 31,
        "marathiPrice": "",
        "quantityUnit": "Kg",
        "productCategory": "HomeEatables",
        "productCode": null,
        "Priority": 1
    },
    {
        "productName": "शेंगदाणे जाडा",
        "englishTranslation": "Shengdana",
        "unitPrice": 60,
        "marathiPrice": "",
        "quantityUnit": "Kg",
        "productCategory": "HomeEatables",
        "productCode": null,
        "Priority": 1
    },
    {
        "productName": "हरभरा डाळ",
        "englishTranslation": "harbhara dal",
        "unitPrice": 40,
        "marathiPrice": "",
        "quantityUnit": "Kg",
        "productCategory": "Dal",
        "productCode": null,
        "Priority": 2
    },
    {
        "productName": "तूर डाळ",
        "englishTranslation": "tur dal",
        "unitPrice": 76,
        "marathiPrice": "",
        "quantityUnit": "Kg",
        "productCategory": "Dal",
        "productCode": null,
        "Priority": 2
    },
    {
        "productName": "मुग डाळ",
        "englishTranslation": "mug dal",
        "unitPrice": 96,
        "marathiPrice": "",
        "quantityUnit": "Kg",
        "productCategory": "Dal",
        "productCode": null,
        "Priority": 2
    },
    {
        "productName": "मटकी डाळ",
        "englishTranslation": "Mataki dal",
        "unitPrice": 84,
        "marathiPrice": "",
        "quantityUnit": "Kg",
        "productCategory": "Dal",
        "productCode": null,
        "Priority": 2
    },
    {
        "productName": "उडीद डाळ",
        "englishTranslation": "Udid dal",
        "unitPrice": 84,
        "marathiPrice": "",
        "quantityUnit": "Kg",
        "productCategory": "Dal",
        "productCode": null,
        "Priority": 2
    },
    {
        "productName": "मटकी",
        "englishTranslation": "Mataki ",
        "unitPrice": 70,
        "marathiPrice": "",
        "quantityUnit": "Kg",
        "productCategory": "Dal",
        "productCode": null,
        "Priority": 2
    },
    {
        "productName": "वटाणा",
        "englishTranslation": "Vatana",
        "unitPrice": 60,
        "marathiPrice": "",
        "quantityUnit": "Kg",
        "productCategory": "Dal",
        "productCode": null,
        "Priority": 2
    },
    {
        "productName": "गुळ",
        "englishTranslation": "Gul",
        "unitPrice": 40,
        "marathiPrice": "",
        "quantityUnit": "Kg",
        "productCategory": "Sweets",
        "productCode": null,
        "Priority": 3
    },
    {
        "productName": "क पोहे",
        "englishTranslation": "K Pohe",
        "unitPrice": 34,
        "marathiPrice": "३४",
        "quantityUnit": "Kg",
        "productCategory": "Poha",
        "productCode": null,
        "Priority": 4
    },
    {
        "productName": "पा पोहे",
        "englishTranslation": "Pa pohe",
        "unitPrice": 50,
        "marathiPrice": "५०",
        "quantityUnit": "Kg",
        "productCategory": "Poha",
        "productCode": null,
        "Priority": 4
    },
    {
        "productName": "चुरमुरे",
        "englishTranslation": "Churmure",
        "unitPrice": 44,
        "marathiPrice": "४४",
        "quantityUnit": "Kg",
        "productCategory": "Poha",
        "productCode": null,
        "Priority": 4
    },
    {
        "productName": "पे चुरमुरे",
        "englishTranslation": "Packing Churmure",
        "unitPrice": 45,
        "marathiPrice": "४५",
        "quantityUnit": "Kg",
        "productCategory": "Poha",
        "productCode": null,
        "Priority": 4
    },
    {
        "productName": "सु चुरमुरे",
        "englishTranslation": "Surati Churmure",
        "unitPrice": 60,
        "marathiPrice": "६०",
        "quantityUnit": "Kg",
        "productCategory": "Poha",
        "productCode": null,
        "Priority": 4
    },
    {
        "productName": "हि बेसन",
        "englishTranslation": "Hira Besan",
        "unitPrice": 50,
        "marathiPrice": "५०",
        "quantityUnit": "Kg",
        "productCategory": "HomeEatables",
        "productCode": null,
        "Priority": 1
    },
    {
        "productName": "प्र बेसन",
        "englishTranslation": "Prakash Besan",
        "unitPrice": 40,
        "marathiPrice": "४०",
        "quantityUnit": "Kg",
        "productCategory": "HomeEatables",
        "productCode": null,
        "Priority": 1
    },
    {
        "productName": "मैदा",
        "englishTranslation": "Maida",
        "unitPrice": 24,
        "marathiPrice": "२४",
        "quantityUnit": "Kg",
        "productCategory": "HomeEatables",
        "productCode": null,
        "Priority": 1
    },
    {
        "productName": "गरा",
        "englishTranslation": "Gara",
        "unitPrice": 24,
        "marathiPrice": "२४",
        "quantityUnit": "Kg",
        "productCategory": "HomeEatables",
        "productCode": null,
        "Priority": 1
    }
];