'use restrict';

angular.module('myDeptManager')
	.filter('marathiNumerals',function(){
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