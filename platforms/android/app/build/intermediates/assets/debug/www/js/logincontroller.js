var app = angular.module("wellness", [ 'ngCookies', 'toaster','angular-loading-bar']);

app.controller("loginController", function($scope, $rootScope, $http,
		globalServerName, $cookies, $rootScope, toaster,$filter,cfpLoadingBar) {

	$scope.mypage = true;
	$scope.mymodel = true;
	$scope.mymodel1 = true;
	$scope.username = '';
	$scope.password = '';
	$scope.modalview = true;
	$scope.sendbutton = true;
	$scope.modelheadername = "Login";
	$scope.modelheadername1 = "Sign-up";
	$scope.headericon = "glyphicon glyphicon-lock";
	$scope.signupshow = true;
	$scope.inputType = 'password';

	
	$scope.user_id = "";
	$scope.flg = '';
	$scope.signbutton = false;
	$scope.forgotbutton = false;
	
	
	$scope.token = localStorage.getItem("token");
	$scope.user_id = localStorage.getItem("userid");
	
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
			localStorage.removeItem("token");
			localStorage.removeItem("flg");
			window.location.href="index.html";	
		})
		.error(function(res){
			window.location.href = "index.html";
			
		})
	}

	$scope.signup = function() {
		var email1 = $scope.email.toLowerCase();
				//alert(email1);

		
		$scope.signinemail = {

			"email" : email1
		}
		
		
		if($scope.signinform.$invalid){
			
			toaster.pop('warning', "Please enter your email");
		}
		else{
			
			$scope.signbutton = true;
			$scope.spinner = true;
			
			$http({

				url : globalServerName.getUrlName() + "user/verifyemail",
				method : "POST",
				data : $scope.signinemail,
				headers : {
					'Content-Type' : 'application/json'
				}

			}).success(function(res) {
	            
				console.log(res);
				if (res == 0) {
					toaster.pop('success', "We have sent a link to your registered email id. Please click on that link to continue with the registration.");
					$scope.signbutton = false;
					$scope.spinner = false;
					$("#myModal .close").click()

				} else {
					$scope.signbutton = false;
					$scope.spinner = false;
					toaster.pop('warning', "The email has already been registered. Please login");	
				}

			}).error(function(res) {

				console.log(res);
			})			
		}
		
	}

	if (localStorage.getItem("userid") == null) {

		$scope.home = false;

	} else {

		$scope.home = true;
	}

	$scope.login = function() {

		console.log($scope.username);
		console.log($scope.password);
		
		$scope.date = $filter('date')(new Date(),"dd-MM-yyyy hh:mm:ss");
	    console.log($scope.date);
	    window.localStorage.setItem("date", $scope.date);
	    
		$scope.loginobject = {

			"username" : $scope.uname,
			"password" : $scope.pswd

		}

		$http({

			url : globalServerName.getUrlName() + "user/login",
			method : "POST",
			data : $scope.loginobject,
			headers : {
				'Content-Type' : 'application/json'
			}

		}).success(
				function(res) {
					$scope.flg = 0;
					console.log(res);
					if (res == "") {
						toaster.pop('error', "Error",
								"Please check username or password");
					} else if (res[0].userid < -1) {

						console.log(-res[0].userid);
						$scope.flg = 1;
						//$cookies.put("userid", -res[0].userid);
						$scope.user_id = localStorage.setItem("userid",-res[0].userid)
						localStorage.setItem("flg",$scope.flg);
						toaster.pop('error', "Error",
								"Please complete registration to proceed further");
						window.location.href = "web/index.html";

					} else {
						localStorage.setItem("userid", res[0].userid);
						localStorage.setItem("token", res[0].token);
						toaster.pop('success', "Login Successful");
						window.location.href = "files/sections/sections.html";
					}

				}).error(function(res) {

					toaster.pop('error', "Error",
					"Please check username or password");
		})

		console.log($scope.loginobject);
	}

	$scope.mypagebutton = function() {

		window.location.href = "files/sections/sections.html";
	}


	$scope.flag = localStorage.getItem("flg");

	
	$scope.uncheck1 = function () {
	
        $scope.seek2 = false;
         $scope.seek1 = false;
         $scope.seek = $scope.seek3;
         console.log($scope.seek);
        
   }
   
    $scope.uncheck2 = function () {
        $scope.seek3 = false;
        $scope.seek = $scope.seek1+","+ $scope.seek2;
        
        if(($scope.seek1 == false) || ($scope.seek1 == undefined)){
        	
        	
        	 $scope.seek = $scope.seek2;
        	 console.log($scope.seek);
        	 
        }else if(($scope.seek2 == false) || ($scope.seek2 == undefined)){
        	
        	 $scope.seek = $scope.seek1;
        	 console.log($scope.seek);
        	 
        }else{
        	
        	 $scope.seek = $scope.seek1+","+ $scope.seek2;
        	 console.log($scope.seek);
        }
        
       
        
        
   }
    
	
	
	
    
	$scope.usersinfo = function() {
		
		$scope.isHidden1 = true;

		if ($scope.registerForm.$invalid) {

			toaster.pop('error', "Please complete the required fields in this form");
		} else {

			if ($scope.phone == undefined) {

				$scope.phone = 0;
				
				cfpLoadingBar.start();
				$scope.isHidden1 = false;
				//disabled the last question in registration form
				//$scope.personal="1";

				$scope.userinfo = {

					"name" : $scope.name,
					"age" : $scope.age,
					"city" : $scope.city,
					"work" : $scope.work,
					"phone" : $scope.phone,
					"gender" : $scope.gender,
					"status" : $scope.status,
					"education" : $scope.education,
					"current" : $scope.current,
					"life" : $scope.life,
					"mental" : $scope.mental,
					"seek" : $scope.seek,
					"distress":$scope.distress,
					"consult" : $scope.consult,
					"personal" : "1",
				}
				console.log($scope.userinfo);

				$http(
						{

							url : globalServerName.getUrlName()
									+ "user/userInfo/" + $scope.user_id,
							method : "POST",
							data : $scope.userinfo,
							headers : {
								'Content-Type' : 'application/json'
							}

						}).success(function(res) {

					console.log(res);
					localStorage.setItem("userid", res[0].userid);
					localStorage.setItem("token", res[0].token);
					alert("Your registration is successful. Now you can login using your username and password to fill the Wellness - Check survey.");
					window.location.href = "../files/sections/sections.html";
				}).error(function(res) {

					console.log(res);
				})
			} else {
				
				cfpLoadingBar.start();
				$scope.isHidden1 = false;

				$scope.userinfo = {

					"name" : $scope.name,
					"age" : $scope.age,
					"city" : $scope.city,
					"work" : $scope.work,
					"phone" : $scope.phone,
					"gender" : $scope.gender,
					"status" : $scope.status,
					"education" : $scope.education,
					"current" : $scope.current,
					"life" : $scope.life,
					"mental" : $scope.mental,
					"seek" : $scope.seek,
					"distress":$scope.distress,
					"consult" : $scope.consult,
					"personal" : "1",
				}
				console.log($scope.userinfo);

				$http(
						{

							url : globalServerName.getUrlName()
									+ "user/userInfo/" + $scope.user_id,
							method : "POST",
							data : $scope.userinfo,
							headers : {
								'Content-Type' : 'application/json'
							}

						}).success(function(res) {

					console.log(res);
					
					localStorage.setItem("userid", res[0].userid);
					localStorage.setItem("token", res[0].token);
					
					alert("Your registration is successful. Now you can login using your username and password to fill the Wellness - Check survey.");
					window.location.href = "../files/sections/sections.html";
				}).error(function(res) {

					console.log(res);
				})
			}

		}

	}
	
	

	$scope.forgots = function() {
		 var email1 = $scope.forgot.toLowerCase();
		
          $scope.forgotp = {
				
				"email" : email1
		}
		
	if($scope.forgotform.$invalid){
			
			toaster.pop('warning', "Please enter your email");
		}
		else{
       
		$scope.forgotbutton = true;
		$scope.spinners = true;
		$http(
				{

					url : globalServerName.getUrlName() + "user/forgotpassword",
					method : "POST",
					data : $scope.forgotp,
					headers : {
						'Content-Type' : 'application/json'
					}

				}).success(function(res) {

			console.log(res);
			if(res == 0){
				
				$scope.forgotbutton = false;
				$scope.spinners = false;
				toaster.pop('warning', "This email has not been registered. Please go to sign-up");
				
			}else{
				toaster.pop('success', "We have sent a link to your registered email id  to rest your password. Please check your mail.");
				$scope.forgotbutton = false;
				$scope.spinners = false;
				$("#forgot .close").click()
				$("#myModal .close").click()
			}
			
		}).error(function(res) {

			console.log(res);
		})
		}
	}

	// Hide & show password function
	$scope.hideShowPassword = function() {
		if ($scope.inputType == 'password')
			$scope.inputType = 'text';
		else
			$scope.inputType = 'password';
	};
})

      app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

        cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner"><div><img src="../angular/loading/loading.gif" width="50%"></div></div>';


      }])