var app = angular.module("wellness",['ngCookies','toaster','angular-loading-bar']);

app.controller("stressController",function($scope,$cookies,globalServerName, $http,toaster,$filter,cfpLoadingBar){

	$scope.count = 0;
	$scope.questionss = [];
	$scope.ques = [];
	$scope.sectionID = "";
	$scope.a = [];
	$scope.b="";
	var Array1 = [1,2,3,4,5,6,7,8,9,10];

	$scope.token = localStorage.getItem("token");
	$scope.user_id = localStorage.getItem("userid");
	console.log($scope.user_id);
	
	if($scope.user_id == null){
		alert("Please login");
		window.location.href="../../index.html";
	}
	
	$scope.homeclick = function(){
		
		window.location.href="../../index.html";
	}
	 
	$scope.logout = function() {
		
	    $scope.startdate = window.localStorage.getItem("date");
		$scope.enddate = $filter('date')(new Date(),"dd-MM-yyyy hh:mm:ss");
		
		$scope.dates = {
				
				"start": $scope.startdate,
				"end" :  $scope.enddate
		}
		$http({
			
			url : globalServerName.getUrlName() + "user/logout/"+$scope.user_id,
			method : "POST",
			data: $scope.dates,
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : $scope.token
			}
		})
		.success(function(res){
			
			localStorage.removeItem("userid");
			window.location.href="../../index.html";
			
		})
		.error(function(res){
			
		})
		
	}
	
	$http({

		url : globalServerName.getUrlName() + "Section/sectionsCount/"+$scope.user_id,
		method : "GET",
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : $scope.token
		}

	}).success(function(res) {
		$scope.countarray = res.length;
		console.log($scope.countarray);
		
		if($scope.countarray >=4){
			
			$scope.countarray = true;
			
		}else{
			
			$scope.countarray = false;
		}
		
	}).error(function(res){
		
		console.log(res);
		
	})
	
	 $scope.mypage = function(){
			
			window.location.href="../../files/sections/sections.html";
		}

	
	$scope.distresssection = function() {

		$http({

			url : globalServerName.getUrlName() + "Section/getSection/4",
			method : "GET",
			headers : {
				'Content-Type' : 'application/json'
			}

		}).success(function(res) {
			
	       console.log(res);
	        //$scope.len = localStorage.getItem("len");
	        $scope.len = sessionStorage.getItem("len");
			
			$scope.sectionID = res.ID;
			//alert("	        $scope.len "+$scope.len);

			if( $scope.len == 'eng'){

				$scope.language = res.english;
				$scope.questionss = res.english.questions;
				
			}else if( $scope.len == 'hin'){

				$scope.language = res.hindi;
				$scope.questionss = res.hindi.questions;
				
			}else {
		    	
		    	$scope.language = res.english;
		    	$scope.questionss = res.english.questions;
		    	
		    }
			
			$scope.distbutton = true;
			//$scope.hindi=" हिन्दी";
			
			 $scope.languages=function(l){

				 //$scope.len=localStorage.setItem("len",l);
				sessionStorage.setItem("len", l);
				 
				 //$scope.len=localStorage.getItem("len");
				 $scope.len=sessionStorage.getItem("len");
			    	
				    if($scope.len == 'eng'){
				    	
				    	$scope.language = res.english;
				    	$scope.questionss = res.english.questions;
				    	
				    }else if($scope.len == 'hin'){
				    	
				    	$scope.language = res.hindi;
				    	$scope.questionss = res.hindi.questions;
				    	
				    }
			    	
			    }
			
		}).error(function(res) {

			console.log(res);
		})
	}

	$scope.distresssection();
    
	$scope.ans=[];
	$scope.emotionvalue = function(q,v){
		
		$scope.a.push(q+1);
		$scope.ans[q]=v;
		console.log($scope.ans);
		$scope.count = $scope.ans.length;

	}

	$scope.distressarray = [];

	console.log($scope.user_id);
	$scope.distressSubmit = function(m){

		console.log($scope.a);
		 
		for (var i = 0; i<$scope.a.length; i++) {
			var arrlen = Array1.length;
			for (var j = 0; j<arrlen; j++) {
				if ($scope.a[i] == Array1[j]) {
					Array1 = Array1.slice(0, j).concat(Array1.slice(j+1, arrlen));
				}
			}
		}
		if($scope.quesForm.$invalid){
			
			toaster.pop('warning',"Warning","Please answer question" +"\n" +Array1);
		}
		else{
			
			cfpLoadingBar.start();
			$scope.dbutton = true;
			
			$scope.anwser = {
					
					"ans":$scope.ans
			}
			
			$http({
				
				url : globalServerName.getUrlName() + "Section/addResponse/"+$scope.user_id+"/"+$scope.sectionID,
				method : "POST",
				data:$scope.anwser,
				headers : {
					'Content-Type' : 'application/json',
					'Authorization' : $scope.token
				}
			})
			.success(function(res){
				
				console.log(m);
				if(m == 'submit'){
					
					//window.location.href="../../files/sections/sections.html";

					window.location.href="../../files/summary/distress/summary.html";
					
				}else if(m == 'next'){
					
					window.location.href="../../files/activity/activity.html";
				}
			})
			.error(function(res){
				
				console.log(res);
			})
			
			//alert("Thank you");
			
		}
	}

	//language code here
	
	
	/* $http({

			url : globalServerName.getUrlName() + "Section/getSection/4",
			method : "GET",
			headers : {
				'Content-Type' : 'application/json'
			}

		}).success(function(res) {
			
	       console.log(res);
	        $scope.len = localStorage.getItem("len");
			
			$scope.sectionID = res.ID;
			//alert("	        $scope.len "+$scope.len);
			if( $scope.len == 'eng'){
				$scope.language = res.english;
				$scope.questionss = res.english.questions;
				
			}else if( $scope.len == 'hin'){
				$scope.language = res.hindi;
				$scope.questionss = res.hindi.questions;
				
			}else {
		    	
		    	$scope.language = res.english;
		    	$scope.questionss = res.english.questions;
		    	
		    }
			
			$scope.distbutton = true;
			//$scope.hindi=" हिन्दी";
			
			 $scope.languages=function(l){
				 $scope.len=localStorage.setItem("len",l);
				 $scope.len=localStorage.getItem("len");
			    	
				    if($scope.len == 'eng'){
				    	
				    	$scope.language = res.english;
				    	$scope.questionss = res.english.questions;
				    	
				    }else if($scope.len == 'hin'){
				    	
				    	$scope.language = res.hindi;
				    	$scope.questionss = res.hindi.questions;
				    	
				    }
			    	
			    }
			
		}).error(function(res) {

			console.log(res);
		})*/


})

      app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

        cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner"><div><img src="../../angular/loading/loading.gif" width="25%"></div></div>';


      }])


