angular.module('wellness').factory('globalServerName', function() {

    
	
	var serverUrl = "https://echargementalhealth.nimhans.ac.in/wellness-check/webapi/";
	//var serverUrl = "https://echargementalhealth.nimhans.ac.in/wellness-check2/webapi/";
	//var serverUrl = "http://ehrc-dev.iiitb.ac.in/wellness-check/webapi/"
	//var serverUrl = "http://localhost:8080/AppWellness/webapi/";
	//var serverUrl = "http://localhost:8080/wellness-check/webapi/";

	return {
		getUrlName : function() {
			return serverUrl;
		}
	};
});