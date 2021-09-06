var app = angular.module("wellness", [ 'ngCookies', 'toaster' ]);

app
		.controller(
				"admincontroller",
				function($scope, globalServerName, $http, toaster) {

					console.log("hi");
					$scope.user = "";
					$scope.userdemo = "";
					$scope.userfeedback = "";
					$scope.userresponse = "";

					$scope.admin = function() {

						$http(
								{

									url : globalServerName.getUrlName()
											+ "admin/userinfo",
									method : "GET",
									headers : {
										'Content-Type' : 'application/json'
									}

								}).success(function(res) {

							console.log(res);
							$scope.user = res;

						}).error(function(res) {

							console.log(res);
						})

					}

					$scope.admin();

					$scope.users = [];
					$scope.exportData = function() {

						for ( var i in $scope.user) {

							$scope.users.push({

								Name : $scope.user[i].name,
								Email : $scope.user[i].email,
								Phone : $scope.user[i].phone
							})
						}
						alasql(
								'SELECT * INTO XLSX("user.xlsx",{headers:true}) FROM ?',
								[ $scope.users ]);
					}

					$scope.userdemo = function() {

						$http(
								{

									url : globalServerName.getUrlName()
											+ "admin/userdemographic",
									method : "GET",
									headers : {
										'Content-Type' : 'application/json'
									}

								})
								.success(
										function(res) {
											$scope.userdemo = res;
											console.log($scope.userdemo);

											for ( var i in $scope.userdemo) {

												console
														.log($scope.userdemo[i].education);

												// education
												if ($scope.userdemo[i].education == "1") {

													$scope.userdemo[i].education = "High school";

												} else if ($scope.userdemo[i].education == "2") {

													$scope.userdemo[i].education = "Pre-university";
												} else if ($scope.userdemo[i].education == "3") {

													$scope.userdemo[i].education = "Under-graduation";
												} else if ($scope.userdemo[i].education == "4") {

													$scope.userdemo[i].education = "Post graduation";
												}

												// best currently
												if ($scope.userdemo[i].best_currently == "1") {

													$scope.userdemo[i].best_currently = "Working";
												} else if ($scope.userdemo[i].best_currently == "2") {

													$scope.userdemo[i].best_currently = "Studying";
												} else if ($scope.userdemo[i].best_currently == "3") {

													$scope.userdemo[i].best_currently = "Being a homemaker";
												} else if ($scope.userdemo[i].best_currently == "4") {

													$scope.userdemo[i].best_currently = "Searching for a job";
												} else if ($scope.userdemo[i].best_currently == "5") {

													$scope.userdemo[i].best_currently = "Retired";
												}

												// seek_mental_prof_help

												if ($scope.userdemo[i].seek_mental_prof_help == "1") {

													$scope.userdemo[i].seek_mental_prof_help = "Yes, I am on medication for mental health issues";
												} else if ($scope.userdemo[i].seek_mental_prof_help == "2") {

													$scope.userdemo[i].seek_mental_prof_help = "Yes, I am meeting a counselor";
												} else if ($scope.userdemo[i].seek_mental_prof_help == "1,2") {

													$scope.userdemo[i].seek_mental_prof_help = "I am on medication for mental health issues, I am meeting a counselor";
												}else if ($scope.userdemo[i].seek_mental_prof_help == "3") {

													$scope.userdemo[i].seek_mental_prof_help = "No";
												}
												
												
												// distress
												if ($scope.userdemo[i].distress == "1") {

													$scope.userdemo[i].distress = "Very uncomfortable";
												} else if ($scope.userdemo[i].distress == "2") {

													$scope.userdemo[i].distress = "Uncomfortable";
												} else if ($scope.userdemo[i].distress == "3") {

													$scope.userdemo[i].distress = "Neither uncomfortable nor comfortable";
												} else if ($scope.userdemo[i].distress == "4") {

													$scope.userdemo[i].distress = "Comfortable";
												} else if ($scope.userdemo[i].distress == "5") {

													$scope.userdemo[i].distress = "Very comfortable";
												}
												
												// consult
												if ($scope.userdemo[i].consult == "1") {

													$scope.userdemo[i].consult = "5 Unlikely";
												} else if ($scope.userdemo[i].consult == "2") {

													$scope.userdemo[i].consult = "Unlikely";
												} else if ($scope.userdemo[i].consult == "3") {

													$scope.userdemo[i].consult = "Unsure";
												} else if ($scope.userdemo[i].consult == "4") {

													$scope.userdemo[i].consult = "Likely";
												} else if ($scope.userdemo[i].consult == "5") {

													$scope.userdemo[i].consult = "5 Likely";
												}
												
												
												// personal
												if ($scope.userdemo[i].personal == "1") {

													$scope.userdemo[i].personal = "5 Unlikely";
												} else if ($scope.userdemo[i].personal == "2") {

													$scope.userdemo[i].personal = "Unlikely";
												} else if ($scope.userdemo[i].personal == "3") {

													$scope.userdemo[i].personal = "Unsure";
												} else if ($scope.userdemo[i].personal == "4") {

													$scope.userdemo[i].personal = "Likely";
												} else if ($scope.userdemo[i].personal == "5") {

													$scope.userdemo[i].personal = "5 Likely";
												}

											}

										}).error(function(res) {

									console.log(res);
								})

					}

					$scope.userdemo();

					$scope.exportData1 = function() {

						$scope.userdemos = [];

						for ( var i in $scope.userdemo) {

							$scope.userdemos
									.push({

										Name : $scope.userdemo[i].name,
										Gender : $scope.userdemo[i].gender,
										Age : $scope.userdemo[i].age,
										City : $scope.userdemo[i].city,
										Work : $scope.userdemo[i].work,
										Martial_status : $scope.userdemo[i].martial_status,
										Education : $scope.userdemo[i].education,
										Best_currently : $scope.userdemo[i].best_currently,
										Mental_health_prof_help : $scope.userdemo[i].mental_health_prof_help,
										Current_mental_helath_prob : $scope.userdemo[i].current_mental_helath_prob,
										Seek_mental_prof_help : $scope.userdemo[i].seek_mental_prof_help,
										Distress : $scope.userdemo[i].distress,
										Consult : $scope.userdemo[i].consult,
										Personal : $scope.userdemo[i].personal

									})

						}

						alasql(
								'SELECT * INTO XLSX("usersdemo.xlsx",{headers:true}) FROM ?',
								[ $scope.userdemos ]);
					}

					$scope.userfeed = function() {

						$http(
								{

									url : globalServerName.getUrlName()
											+ "admin/userfeedback",
									method : "GET",
									headers : {
										'Content-Type' : 'application/json'
									}

								})
								.success(
										function(res) {

											console.log(res);
											$scope.userfeedback = res;

											for ( var i in $scope.userfeedback) {

												// feedback2
												if ($scope.userfeedback[i].feedback2 == "1") {

													$scope.userfeedback[i].feedback2 = "Very likely";
												} else if ($scope.userfeedback[i].feedback2 == "2") {

													$scope.userfeedback[i].feedback2 = "Likely";
												} else if ($scope.userfeedback[i].feedback2 == "3") {

													$scope.userfeedback[i].feedback2 = "Unsure";
												} else if ($scope.userfeedback[i].feedback2 == "4") {

													$scope.userfeedback[i].feedback2 = "Unlikely";
												} else if ($scope.userfeedback[i].feedback2 == "5") {

													$scope.userfeedback[i].feedback2 = "Very unlikely";
												}
												
												
												// feedback3
												if ($scope.userfeedback[i].feedback3 == "1") {

													$scope.userfeedback[i].feedback3 = "Very uncomfortable";
												} else if ($scope.userfeedback[i].feedback3 == "2") {

													$scope.userfeedback[i].feedback3 = "Uncomfortable";
												} else if ($scope.userfeedback[i].feedback3 == "3") {

													$scope.userfeedback[i].feedback3 = "Neither uncomfortable nor comfortable";
												} else if ($scope.userfeedback[i].feedback3 == "4") {

													$scope.userfeedback[i].feedback3 = "Comfortable";
												} else if ($scope.userfeedback[i].feedback3 == "5") {

													$scope.userfeedback[i].feedback3 = "Very comfortable";
												}

												// feedback4
												if ($scope.userfeedback[i].feedback4 == "1") {

													$scope.userfeedback[i].feedback4 = "5 Unlikely";
												} else if ($scope.userfeedback[i].feedback4 == "2") {

													$scope.userfeedback[i].feedback4 = "Unlikely";
												} else if ($scope.userfeedback[i].feedback4 == "3") {

													$scope.userfeedback[i].feedback4 = "Unsure";
												} else if ($scope.userfeedback[i].feedback4 == "4") {

													$scope.userfeedback[i].feedback4 = "Likely";
												} else if ($scope.userfeedback[i].feedback4 == "5") {

													$scope.userfeedback[i].feedback4 = "5 Likely";
												}

												// feedback5
												if ($scope.userfeedback[i].feedback5 == "1") {

													$scope.userfeedback[i].feedback5 = "5 Unlikely";
												} else if ($scope.userfeedback[i].feedback5 == "2") {

													$scope.userfeedback[i].feedback5 = "Unlikely";
												} else if ($scope.userfeedback[i].feedback5 == "3") {

													$scope.userfeedback[i].feedback5 = "Unsure";
												} else if ($scope.userfeedback[i].feedback5 == "4") {

													$scope.userfeedback[i].feedback5 = "Likely";
												} else if ($scope.userfeedback[i].feedback5 == "5") {

													$scope.userfeedback[i].feedback5 = "5 Likely";
												}

											}

										}).error(function(res) {

								})
					}

					$scope.userfeed();
					$scope.exportData2 = function() {

						$scope.userfeedbacks = [];

						for ( var i in $scope.userfeedback) {

							$scope.userfeedbacks.push({

								Name : $scope.userfeedback[i].name,
								Feedback1 : $scope.userfeedback[i].feedback1,
								Feedback2 : $scope.userfeedback[i].feedback2,
								Feedback3 : $scope.userfeedback[i].feedback3,
								Feedback4 : $scope.userfeedback[i].feedback4,
								Feedback5 : $scope.userfeedback[i].feedback5

							})

						}

						alasql(
								'SELECT * INTO XLSX("userfeedback.xlsx",{headers:true}) FROM ?',
								[ $scope.userfeedbacks ]);

					}

					// lalitha added the following

					$scope.userresponse = function() {

						$http(
								{

									url : globalServerName.getUrlName()
											+ "admin/userresponse",
									method : "GET",
									headers : {
										'Content-Type' : 'application/json'
									}

								})
								.success(
										function(res) {
											
											console.log(res);

											var array = JSON.parse("["
													+ res[0].response + "]");
											
											$scope.userresponse = res;
											

											for ( var i in $scope.userresponse) {
												
												//console.log($scope.userresponse[i].time);

												if ($scope.userresponse[i].section_id == "S1") {

													if ($scope.userresponse[i].response[1] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q1 = "6";
													} else if ($scope.userresponse[i].response[1] == "2") {

														$scope.userresponse[i].q1 = "5";
													}

													else if ($scope.userresponse[i].response[1] == "3") {

														$scope.userresponse[i].q1 = "4";
													} else if ($scope.userresponse[i].response[1] == "4") {

														$scope.userresponse[i].q1 = "3";
													} else if ($scope.userresponse[i].response[1] == "5") {

														$scope.userresponse[i].q1 = "2";
													} else if ($scope.userresponse[i].response[1] == "6") {

														$scope.userresponse[i].q1 = "1";
													}

													if ($scope.userresponse[i].response[3] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q2 = "1";
													} else if ($scope.userresponse[i].response[3] == "2") {

														$scope.userresponse[i].q2 = "2";
													}

													else if ($scope.userresponse[i].response[3] == "3") {

														$scope.userresponse[i].q2 = "3";
													} else if ($scope.userresponse[i].response[3] == "4") {

														$scope.userresponse[i].q2 = "4";
													} else if ($scope.userresponse[i].response[3] == "5") {

														$scope.userresponse[i].q2 = "5";
													} else {

														$scope.userresponse[i].q2 = "6";
													}

													if ($scope.userresponse[i].response[5] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q3 = "1";
													} else if ($scope.userresponse[i].response[5] == "2") {

														$scope.userresponse[i].q3 = "2";
													}

													else if ($scope.userresponse[i].response[5] == "3") {

														$scope.userresponse[i].q3 = "3";
													} else if ($scope.userresponse[i].response[5] == "4") {

														$scope.userresponse[i].q3 = "4";
													} else if ($scope.userresponse[i].response[5] == "5") {

														$scope.userresponse[i].q3 = "5";
													} else {

														$scope.userresponse[i].q3 = "6";
													}

													if ($scope.userresponse[i].response[7] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q4 = "6";
													} else if ($scope.userresponse[i].response[7] == "2") {

														$scope.userresponse[i].q4 = "5";
													}

													else if ($scope.userresponse[i].response[7] == "3") {

														$scope.userresponse[i].q4 = "4";
													} else if ($scope.userresponse[i].response[7] == "4") {

														$scope.userresponse[i].q4 = "3";
													} else if ($scope.userresponse[i].response[7] == "5") {

														$scope.userresponse[i].q4 = "2";
													} else if ($scope.userresponse[i].response[7] == "6") {

														$scope.userresponse[i].q4 = "1";
													}

													if ($scope.userresponse[i].response[9] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q5 = "1";
													} else if ($scope.userresponse[i].response[9] == "2") {

														$scope.userresponse[i].q5 = "2";
													}

													else if ($scope.userresponse[i].response[9] == "3") {

														$scope.userresponse[i].q5 = "3";
													} else if ($scope.userresponse[i].response[9] == "4") {

														$scope.userresponse[i].q5 = "4";
													} else if ($scope.userresponse[i].response[9] == "5") {

														$scope.userresponse[i].q5 = "5";
													} else {

														$scope.userresponse[i].q5 = "6";
													}

													if ($scope.userresponse[i].response[11] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q6 = "1";
													} else if ($scope.userresponse[i].response[11] == "2") {

														$scope.userresponse[i].q6 = "2";
													}

													else if ($scope.userresponse[i].response[11] == "3") {

														$scope.userresponse[i].q6 = "3";
													} else if ($scope.userresponse[i].response[11] == "4") {

														$scope.userresponse[i].q6 = "4";
													} else if ($scope.userresponse[i].response[11] == "5") {

														$scope.userresponse[i].q6 = "5";
													} else {

														$scope.userresponse[i].q6 = "6";
													}

													if ($scope.userresponse[i].response[13] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q7 = "1";
													} else if ($scope.userresponse[i].response[13] == "2") {

														$scope.userresponse[i].q7 = "2";
													}

													else if ($scope.userresponse[i].response[13] == "3") {

														$scope.userresponse[i].q7 = "3";
													} else if ($scope.userresponse[i].response[13] == "4") {

														$scope.userresponse[i].q7 = "4";
													} else if ($scope.userresponse[i].response[13] == "5") {

														$scope.userresponse[i].q7 = "5";
													} else if ($scope.userresponse[i].response[13] == "6"){

														$scope.userresponse[i].q7 = "6";
													}

													if ($scope.userresponse[i].response[15] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q8 = "6";
													} else if ($scope.userresponse[i].response[15] == "2") {

														$scope.userresponse[i].q8 = "5";
													}

													else if ($scope.userresponse[i].response[15] == "3") {

														$scope.userresponse[i].q8 = "4";
													} else if ($scope.userresponse[i].response[15] == "4") {

														$scope.userresponse[i].q8 = "3";
													} else if ($scope.userresponse[i].response[15] == "5") {

														$scope.userresponse[i].q8 = "2";
													} else if($scope.userresponse[i].response[15] == "6") {

														$scope.userresponse[i].q8 = "1";
													}

													if ($scope.userresponse[i].response[17] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q9 = "1";
													} else if ($scope.userresponse[i].response[17] == "2") {

														$scope.userresponse[i].q9 = "2";
													}

													else if ($scope.userresponse[i].response[17] == "3") {

														$scope.userresponse[i].q9 = "3";
													} else if ($scope.userresponse[i].response[17] == "4") {

														$scope.userresponse[i].q9 = "4";
													} else if ($scope.userresponse[i].response[17] == "5") {

														$scope.userresponse[i].q9 = "5";
													} else {

														$scope.userresponse[i].q9 = "6";
													}

													if ($scope.userresponse[i].response[19] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q10 = "6";
													} else if ($scope.userresponse[i].response[19] == "2") {

														$scope.userresponse[i].q10 = "5";
													}

													else if ($scope.userresponse[i].response[19] == "3") {

														$scope.userresponse[i].q10 = "4";
													} else if ($scope.userresponse[i].response[19] == "4") {

														$scope.userresponse[i].q10 = "3";
													} else if ($scope.userresponse[i].response[19] == "5") {

														$scope.userresponse[i].q10 = "2";
													} else if ($scope.userresponse[i].response[19] == "6"){

														$scope.userresponse[i].q10 = "1";
													}

													if ($scope.userresponse[i].response[21] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q11 = "6";
													} else if ($scope.userresponse[i].response[21] == "2") {

														$scope.userresponse[i].q11 = "5";
													}

													else if ($scope.userresponse[i].response[21] == "3") {

														$scope.userresponse[i].q11 = "4";
													} else if ($scope.userresponse[i].response[21] == "4") {

														$scope.userresponse[i].q11 = "3";
													} else if ($scope.userresponse[i].response[21] == "5") {

														$scope.userresponse[i].q11 = "2";
													} else if($scope.userresponse[i].response[21] == "6"){

														$scope.userresponse[i].q11 = "1";
													}

													if ($scope.userresponse[i].response[23] == "1") {

														$scope.userresponse[i].q12 = "6";
													} else if ($scope.userresponse[i].response[23] == "2") {

														$scope.userresponse[i].q12 = "5";
													}

													else if ($scope.userresponse[i].response[23] == "3") {

														$scope.userresponse[i].q12 = "4";
													} else if ($scope.userresponse[i].response[23] == "4") {

														$scope.userresponse[i].q12 = "3";
													} else if ($scope.userresponse[i].response[23] == "5") {

														$scope.userresponse[i].q12 = "2";
													} else if($scope.userresponse[i].response[23] == "6"){

														$scope.userresponse[i].q12 = "1";
													}

													if ($scope.userresponse[i].response[25] == "1") {

														$scope.userresponse[i].q13 = "1";
													} else if ($scope.userresponse[i].response[25] == "2") {

														$scope.userresponse[i].q13 = "2";
													}

													else if ($scope.userresponse[i].response[25] == "3") {

														$scope.userresponse[i].q13 = "3";
													} else if ($scope.userresponse[i].response[25] == "4") {

														$scope.userresponse[i].q13 = "4";
													} else if ($scope.userresponse[i].response[25] == "5") {

														$scope.userresponse[i].q13 = "5";
													} else {

														$scope.userresponse[i].q13 = "6";
													}

													if ($scope.userresponse[i].response[27] == "1") {

														$scope.userresponse[i].q14 = "6";
													} else if ($scope.userresponse[i].response[27] == "2") {

														$scope.userresponse[i].q14 = "5";
													}

													else if ($scope.userresponse[i].response[27] == "3") {

														$scope.userresponse[i].q14 = "4";
													} else if ($scope.userresponse[i].response[27] == "4") {

														$scope.userresponse[i].q14 = "3";
													} else if ($scope.userresponse[i].response[27] == "5") {

														$scope.userresponse[i].q14 = "2";
													} else if($scope.userresponse[i].response[27] == "6"){

														$scope.userresponse[i].q14 = "1";
													}

													if ($scope.userresponse[i].response[29] == "1") {

														$scope.userresponse[i].q15 = "1";
													} else if ($scope.userresponse[i].response[29] == "2") {

														$scope.userresponse[i].q15 = "2";
													}

													else if ($scope.userresponse[i].response[29] == "3") {

														$scope.userresponse[i].q15 = "3";
													} else if ($scope.userresponse[i].response[29] == "4") {

														$scope.userresponse[i].q15 = "4";
													} else if ($scope.userresponse[i].response[29] == "5") {

														$scope.userresponse[i].q15 = "5";
													} else {

														$scope.userresponse[i].q15 = "6";
													}

													if ($scope.userresponse[i].response[31] == "1") {

														$scope.userresponse[i].q16 = "1";
													} else if ($scope.userresponse[i].response[31] == "2") {

														$scope.userresponse[i].q16 = "2";
													}

													else if ($scope.userresponse[i].response[31] == "3") {

														$scope.userresponse[i].q16 = "3";
													} else if ($scope.userresponse[i].response[31] == "4") {

														$scope.userresponse[i].q16 = "4";
													} else if ($scope.userresponse[i].response[31] == "5") {

														$scope.userresponse[i].q16 = "5";
													} else {

														$scope.userresponse[i].q16 = "6";
													}

													if ($scope.userresponse[i].response[33] == "1") {

														$scope.userresponse[i].q17 = "1";
													} else if ($scope.userresponse[i].response[33] == "2") {

														$scope.userresponse[i].q17 = "2";
													}

													else if ($scope.userresponse[i].response[33] == "3") {

														$scope.userresponse[i].q17 = "3";
													} else if ($scope.userresponse[i].response[33] == "4") {

														$scope.userresponse[i].q17 = "4";
													} else if ($scope.userresponse[i].response[33] == "5") {

														$scope.userresponse[i].q17 = "5";
													} else {

														$scope.userresponse[i].q17 = "6";
													}

													if ($scope.userresponse[i].response[35] == "1") {

														$scope.userresponse[i].q18 = "1";
													} else if ($scope.userresponse[i].response[35] == "2") {

														$scope.userresponse[i].q18 = "2";
													}

													else if ($scope.userresponse[i].response[35] == "3") {

														$scope.userresponse[i].q18 = "3";
													} else if ($scope.userresponse[i].response[35] == "4") {

														$scope.userresponse[i].q18 = "4";
													} else if ($scope.userresponse[i].response[35] == "5") {

														$scope.userresponse[i].q18 = "5";
													} else {

														$scope.userresponse[i].q18 = "6";
													}

													if ($scope.userresponse[i].response[37] == "1") {

														$scope.userresponse[i].q19 = "6";
													} else if ($scope.userresponse[i].response[37] == "2") {

														$scope.userresponse[i].q19 = "5";
													}

													else if ($scope.userresponse[i].response[37] == "3") {

														$scope.userresponse[i].q19 = "4";
													} else if ($scope.userresponse[i].response[37] == "4") {

														$scope.userresponse[i].q19 = "3";
													} else if ($scope.userresponse[i].response[37] == "5") {

														$scope.userresponse[i].q19 = "2";
													} else if($scope.userresponse[i].response[37] == "6") {

														$scope.userresponse[i].q19 = "1";
													}

													if ($scope.userresponse[i].response[39] == "1") {

														$scope.userresponse[i].q20 = "6";
													} else if ($scope.userresponse[i].response[39] == "2") {

														$scope.userresponse[i].q20 = "5";
													}

													else if ($scope.userresponse[i].response[39] == "3") {

														$scope.userresponse[i].q20 = "4";
													} else if ($scope.userresponse[i].response[39] == "4") {

														$scope.userresponse[i].q20 = "3";
													} else if ($scope.userresponse[i].response[39] == "5") {

														$scope.userresponse[i].q20 = "2";
													} else if($scope.userresponse[i].response[39] == "6"){

														$scope.userresponse[i].q20 = "1";
													}

												}

												else if ($scope.userresponse[i].section_id == "S2") {

													if ($scope.userresponse[i].response[1] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q1 = "1";
													} else if ($scope.userresponse[i].response[1] == "2") {

														$scope.userresponse[i].q1 = "2";
													}

													else if ($scope.userresponse[i].response[1] == "3") {

														$scope.userresponse[i].q1 = "3";
													} else if ($scope.userresponse[i].response[1] == "4") {

														$scope.userresponse[i].q1 = "4";
													}

													else {

														$scope.userresponse[i].q1 = "5";
													}

													if ($scope.userresponse[i].response[3] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q2 = "1";
													} else if ($scope.userresponse[i].response[3] == "2") {

														$scope.userresponse[i].q2 = "2";
													}

													else if ($scope.userresponse[i].response[3] == "3") {

														$scope.userresponse[i].q2 = "3";
													} else if ($scope.userresponse[i].response[3] == "4") {

														$scope.userresponse[i].q2 = "4";
													}

													else {

														$scope.userresponse[i].q2 = "5";
													}

													if ($scope.userresponse[i].response[5] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q3 = "1";
													} else if ($scope.userresponse[i].response[5] == "2") {

														$scope.userresponse[i].q3 = "2";
													}

													else if ($scope.userresponse[i].response[5] == "3") {

														$scope.userresponse[i].q3 = "3";
													} else if ($scope.userresponse[i].response[5] == "4") {

														$scope.userresponse[i].q3 = "4";
													}

													else {

														$scope.userresponse[i].q3 = "5";
													}

													if ($scope.userresponse[i].response[7] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q4 = "1";
													} else if ($scope.userresponse[i].response[7] == "2") {

														$scope.userresponse[i].q4 = "2";
													}

													else if ($scope.userresponse[i].response[7] == "3") {

														$scope.userresponse[i].q4 = "3";
													} else if ($scope.userresponse[i].response[7] == "4") {

														$scope.userresponse[i].q4 = "4";
													}

													else {

														$scope.userresponse[i].q4 = "5";
													}

													if ($scope.userresponse[i].response[9] == "1") {

														console.log("hellow");
														$scope.userresponse[i].q5 = "1";
													} else if ($scope.userresponse[i].response[9] == "2") {

														$scope.userresponse[i].q5 = "2";
													}

													else if ($scope.userresponse[i].response[9] == "3") {

														$scope.userresponse[i].q5 = "3";
													} else if ($scope.userresponse[i].response[9] == "4") {

														$scope.userresponse[i].q5 = "4";
													}

													else {

														$scope.userresponse[i].q5 = "5";
													}

													if ($scope.userresponse[i].response[11] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q6 = "1";
													} else if ($scope.userresponse[i].response[11] == "2") {

														$scope.userresponse[i].q6 = "2";
													}

													else if ($scope.userresponse[i].response[11] == "3") {

														$scope.userresponse[i].q6 = "3";
													} else if ($scope.userresponse[i].response[11] == "4") {

														$scope.userresponse[i].q6 = "4";
													}

													else {

														$scope.userresponse[i].q6 = "5";
													}
													
													
													if ($scope.userresponse[i].response[13] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q7 = "1";
													} else if ($scope.userresponse[i].response[13] == "2") {

														$scope.userresponse[i].q7 = "2";
													}

													else if ($scope.userresponse[i].response[13] == "3") {

														$scope.userresponse[i].q7 = "3";
													} else if ($scope.userresponse[i].response[13] == "4") {

														$scope.userresponse[i].q7 = "4";
													}

													else {

														$scope.userresponse[i].q7 = "5";
													}
													
													
													if ($scope.userresponse[i].response[15] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q8 = "1";
													} else if ($scope.userresponse[i].response[15] == "2") {

														$scope.userresponse[i].q8 = "2";
													}

													else if ($scope.userresponse[i].response[15] == "3") {

														$scope.userresponse[i].q8 = "3";
													} else if ($scope.userresponse[i].response[15] == "4") {

														$scope.userresponse[i].q8 = "4";
													}

													else {

														$scope.userresponse[i].q8 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[17] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q9 = "1";
													} else if ($scope.userresponse[i].response[17] == "2") {

														$scope.userresponse[i].q9 = "2";
													}

													else if ($scope.userresponse[i].response[17] == "3") {

														$scope.userresponse[i].q9 = "3";
													} else if ($scope.userresponse[i].response[17] == "4") {

														$scope.userresponse[i].q9 = "4";
													}

													else {

														$scope.userresponse[i].q9 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[19] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q10 = "1";
													} else if ($scope.userresponse[i].response[19] == "2") {

														$scope.userresponse[i].q10 = "2";
													}

													else if ($scope.userresponse[i].response[19] == "3") {

														$scope.userresponse[i].q10 = "3";
													} else if ($scope.userresponse[i].response[19] == "4") {

														$scope.userresponse[i].q10 = "4";
													}

													else {

														$scope.userresponse[i].q10 = "5";
													}
													
													
													
													
													
													if ($scope.userresponse[i].response[21] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q11 = "1";
													} else if ($scope.userresponse[i].response[21] == "2") {

														$scope.userresponse[i].q11 = "2";
													}

													else if ($scope.userresponse[i].response[21] == "3") {

														$scope.userresponse[i].q11 = "3";
													} else if ($scope.userresponse[i].response[21] == "4") {

														$scope.userresponse[i].q11 = "4";
													}

													else {

														$scope.userresponse[i].q11 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[23] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q12 = "1";
													} else if ($scope.userresponse[i].response[23] == "2") {

														$scope.userresponse[i].q12 = "2";
													}

													else if ($scope.userresponse[i].response[23] == "3") {

														$scope.userresponse[i].q12 = "3";
													} else if ($scope.userresponse[i].response[23] == "4") {

														$scope.userresponse[i].q12 = "4";
													}

													else {

														$scope.userresponse[i].q12 = "5";
													}
													
													
													
													
													
													
													if ($scope.userresponse[i].response[25] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q13 = "1";
													} else if ($scope.userresponse[i].response[25] == "2") {

														$scope.userresponse[i].q13 = "2";
													}

													else if ($scope.userresponse[i].response[25] == "3") {

														$scope.userresponse[i].q13 = "3";
													} else if ($scope.userresponse[i].response[25] == "4") {

														$scope.userresponse[i].q13 = "4";
													}

													else {

														$scope.userresponse[i].q13 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[27] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q14 = "1";
													} else if ($scope.userresponse[i].response[27] == "2") {

														$scope.userresponse[i].q14 = "2";
													}

													else if ($scope.userresponse[i].response[27] == "3") {

														$scope.userresponse[i].q14 = "3";
													} else if ($scope.userresponse[i].response[27] == "4") {

														$scope.userresponse[i].q14 = "4";
													}

													else {

														$scope.userresponse[i].q14 = "5";
													}
													
													
													
													
													
													if ($scope.userresponse[i].response[29] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q15 = "1";
													} else if ($scope.userresponse[i].response[29] == "2") {

														$scope.userresponse[i].q15 = "2";
													}

													else if ($scope.userresponse[i].response[29] == "3") {

														$scope.userresponse[i].q15 = "3";
													} else if ($scope.userresponse[i].response[29] == "4") {

														$scope.userresponse[i].q15 = "4";
													}

													else {

														$scope.userresponse[i].q15 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[31] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q16 = "1";
													} else if ($scope.userresponse[i].response[31] == "2") {

														$scope.userresponse[i].q16 = "2";
													}

													else if ($scope.userresponse[i].response[31] == "3") {

														$scope.userresponse[i].q16 = "3";
													} else if ($scope.userresponse[i].response[31] == "4") {

														$scope.userresponse[i].q16 = "4";
													}

													else {

														$scope.userresponse[i].q16 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[33] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q17 = "1";
													} else if ($scope.userresponse[i].response[33] == "2") {

														$scope.userresponse[i].q17 = "2";
													}

													else if ($scope.userresponse[i].response[33] == "3") {

														$scope.userresponse[i].q17 = "3";
													} else if ($scope.userresponse[i].response[33] == "4") {

														$scope.userresponse[i].q17 = "4";
													}

													else {

														$scope.userresponse[i].q17 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[35] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q18 = "1";
													} else if ($scope.userresponse[i].response[35] == "2") {

														$scope.userresponse[i].q18 = "2";
													}

													else if ($scope.userresponse[i].response[35] == "3") {

														$scope.userresponse[i].q18 = "3";
													} else if ($scope.userresponse[i].response[35] == "4") {

														$scope.userresponse[i].q18 = "4";
													}

													else {

														$scope.userresponse[i].q18 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[37] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q19 = "1";
													} else if ($scope.userresponse[i].response[37] == "2") {

														$scope.userresponse[i].q19 = "2";
													}

													else if ($scope.userresponse[i].response[37] == "3") {

														$scope.userresponse[i].q19 = "3";
													} else if ($scope.userresponse[i].response[37] == "4") {

														$scope.userresponse[i].q19 = "4";
													}

													else {

														$scope.userresponse[i].q19 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[39] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q20 = "1";
													} else if ($scope.userresponse[i].response[39] == "2") {

														$scope.userresponse[i].q20 = "2";
													}

													else if ($scope.userresponse[i].response[39] == "3") {

														$scope.userresponse[i].q20 = "3";
													} else if ($scope.userresponse[i].response[39] == "4") {

														$scope.userresponse[i].q20 = "4";
													}

													else {

														$scope.userresponse[i].q20 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[41] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q21 = "1";
													} else if ($scope.userresponse[i].response[41] == "2") {

														$scope.userresponse[i].q21 = "2";
													}

													else if ($scope.userresponse[i].response[41] == "3") {

														$scope.userresponse[i].q21 = "3";
													} else if ($scope.userresponse[i].response[41] == "4") {

														$scope.userresponse[i].q21 = "4";
													}

													else {

														$scope.userresponse[i].q21 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[43] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q22 = "1";
													} else if ($scope.userresponse[i].response[43] == "2") {

														$scope.userresponse[i].q22 = "2";
													}

													else if ($scope.userresponse[i].response[43] == "3") {

														$scope.userresponse[i].q22 = "3";
													} else if ($scope.userresponse[i].response[43] == "4") {

														$scope.userresponse[i].q22 = "4";
													}

													else {

														$scope.userresponse[i].q22 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[45] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q23 = "1";
													} else if ($scope.userresponse[i].response[45] == "2") {

														$scope.userresponse[i].q23 = "2";
													}

													else if ($scope.userresponse[i].response[45] == "3") {

														$scope.userresponse[i].q23 = "3";
													} else if ($scope.userresponse[i].response[45] == "4") {

														$scope.userresponse[i].q23 = "4";
													}

													else {

														$scope.userresponse[i].q23 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[47] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q24 = "1";
													} else if ($scope.userresponse[i].response[47] == "2") {

														$scope.userresponse[i].q24 = "2";
													}

													else if ($scope.userresponse[i].response[47] == "3") {

														$scope.userresponse[i].q24 = "3";
													} else if ($scope.userresponse[i].response[47] == "4") {

														$scope.userresponse[i].q24 = "4";
													}

													else {

														$scope.userresponse[i].q24 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[49] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q25 = "1";
													} else if ($scope.userresponse[i].response[49] == "2") {

														$scope.userresponse[i].q25 = "2";
													}

													else if ($scope.userresponse[i].response[49] == "3") {

														$scope.userresponse[i].q25 = "3";
													} else if ($scope.userresponse[i].response[49] == "4") {

														$scope.userresponse[i].q25 = "4";
													}

													else {

														$scope.userresponse[i].q25 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[51] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q26 = "1";
													} else if ($scope.userresponse[i].response[51] == "2") {

														$scope.userresponse[i].q26 = "2";
													}

													else if ($scope.userresponse[i].response[51] == "3") {

														$scope.userresponse[i].q26 = "3";
													} else if ($scope.userresponse[i].response[51] == "4") {

														$scope.userresponse[i].q26 = "4";
													}

													else {

														$scope.userresponse[i].q26 = "5";
													}
													

												}
												
												
												

												else if ($scope.userresponse[i].section_id == "S3") {

													if ($scope.userresponse[i].response[1] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q1 = "6";
													} else if ($scope.userresponse[i].response[1] == "2") {

														$scope.userresponse[i].q1 = "5";
													}

													else if ($scope.userresponse[i].response[1] == "3") {

														$scope.userresponse[i].q1 = "4";
													} else if ($scope.userresponse[i].response[1] == "4") {

														$scope.userresponse[i].q1 = "3";
													} else if ($scope.userresponse[i].response[1] == "5") {

														$scope.userresponse[i].q1 = "2";
													}

													else if ($scope.userresponse[i].response[1] == "6"){

														$scope.userresponse[i].q1 = "1";
													}

													if ($scope.userresponse[i].response[3] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q2 = "6";
													} else if ($scope.userresponse[i].response[3] == "2") {

														$scope.userresponse[i].q2 = "5";
													}

													else if ($scope.userresponse[i].response[3] == "3") {

														$scope.userresponse[i].q2 = "4";
													} else if ($scope.userresponse[i].response[3] == "4") {

														$scope.userresponse[i].q2 = "3";
													}

													else if ($scope.userresponse[i].response[3] == "5") {

														$scope.userresponse[i].q2 = "2";
													}

													else if($scope.userresponse[i].response[3] == "6"){

														$scope.userresponse[i].q2 = "1";
													}

													if ($scope.userresponse[i].response[5] == "1") {

														$scope.userresponse[i].q3 = "1";
													} else if ($scope.userresponse[i].response[5] == "2") {

														$scope.userresponse[i].q3 = "2";
													}

													else if ($scope.userresponse[i].response[5] == "3") {

														$scope.userresponse[i].q3 = "3";
													} else if ($scope.userresponse[i].response[5] == "4") {

														$scope.userresponse[i].q3 = "4";
													}
													else if ($scope.userresponse[i].response[5] == "5") {

														$scope.userresponse[i].q3= "5";
													}

													else if ($scope.userresponse[i].response[5] == "6"){

														$scope.userresponse[i].q3 = "6";
													}

													if ($scope.userresponse[i].response[7] == "1") {

														$scope.userresponse[i].q4 = "6";
													} else if ($scope.userresponse[i].response[7] == "2") {

														$scope.userresponse[i].q4 = "5";
													}

													else if ($scope.userresponse[i].response[7] == "3") {

														$scope.userresponse[i].q4 = "4";
													} else if ($scope.userresponse[i].response[7] == "4") {

														$scope.userresponse[i].q4 = "3";
													}
													else if ($scope.userresponse[i].response[7] == "5") {

														$scope.userresponse[i].q4 = "2";
													}

													else if ($scope.userresponse[i].response[7] == "6"){

														$scope.userresponse[i].q4 = "1";
													}

													if ($scope.userresponse[i].response[9] == "1") {

														$scope.userresponse[i].q5 = "6";
													} else if ($scope.userresponse[i].response[9] == "2") {

														$scope.userresponse[i].q5 = "5";
													}

													else if ($scope.userresponse[i].response[9] == "3") {

														$scope.userresponse[i].q5 = "4";
													} else if ($scope.userresponse[i].response[9] == "4") {

														$scope.userresponse[i].q5 = "3";
													}
													else if ($scope.userresponse[i].response[9] == "5") {

														$scope.userresponse[i].q5 = "2";
													}

													else if($scope.useresponse[i].response[9] == "6"){

														$scope.userresponse[i].q5 = "1";
													}
													
													

													if ($scope.userresponse[i].response[11] == "1") {

														
														$scope.userresponse[i].q6 = "6";
													} else if ($scope.userresponse[i].response[11] == "2") {

														$scope.userresponse[i].q6 = "5";
													}

													else if ($scope.userresponse[i].response[11] == "3") {

														$scope.userresponse[i].q6 = "4";
													} else if ($scope.userresponse[i].response[11] == "4") {

														$scope.userresponse[i].q6 = "3";
													}
													else if ($scope.userresponse[i].response[11] == "5") {

														$scope.userresponse[i].q6 = "2";
													}

													else if($scope.userresponse[i].response[11] == "6") {

														$scope.userresponse[i].q6 = "1";
													}

													
													
													if ($scope.userresponse[i].response[13] == "1") {

														$scope.userresponse[i].q7 = "6";
													} else if ($scope.userresponse[i].response[13] == "2") {

														$scope.userresponse[i].q7 = "5";
													}

													else if ($scope.userresponse[i].response[13] == "3") {

														$scope.userresponse[i].q7 = "4";
													} else if ($scope.userresponse[i].response[13] == "4") {

														$scope.userresponse[i].q7 = "3";
													}
													else if ($scope.userresponse[i].response[13] == "5") {

														$scope.userresponse[i].q7 = "2";
													}

													else if($scope.userresponse[i].response[13] == "6"){

														$scope.userresponse[i].q7 = "1";
													}
													
													

													if ($scope.userresponse[i].response[15] == "1") {

														$scope.userresponse[i].q8 = "6";
													} else if ($scope.userresponse[i].response[15] == "2") {

														$scope.userresponse[i].q8 = "5";
													}

													else if ($scope.userresponse[i].response[15] == "3") {

														$scope.userresponse[i].q8 = "4";
													} else if ($scope.userresponse[i].response[15] == "4") {

														$scope.userresponse[i].q8 = "3";
													}
													
													else if ($scope.userresponse[i].response[15] == "5") {

														$scope.userresponse[i].q8 = "2";
													}

													else if($scope.userresponse[i].response[15] == "6") {

														$scope.userresponse[i].q8 = "1";
													}

													if ($scope.userresponse[i].response[17] == "1") {

														$scope.userresponse[i].q9 = "6";
													} else if ($scope.userresponse[i].response[17] == "2") {

														$scope.userresponse[i].q9 = "5";
													}

													else if ($scope.userresponse[i].response[17] == "3") {

														$scope.userresponse[i].q9 = "4";
													} else if ($scope.userresponse[i].response[17] == "4") {

														$scope.userresponse[i].q9 = "3";
													}
													else if ($scope.userresponse[i].response[17] == "5") {

														$scope.userresponse[i].q9 = "2";
													}

													else {

														//$scope.userresponse[i].q9 = "no";
														$scope.userresponse[i].q9 = "1";
													}

												}

												else if ($scope.userresponse[i].section_id == "S4") {

													if ($scope.userresponse[i].response[1] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q1 = "1";
													} else if ($scope.userresponse[i].response[1] == "2") {

														$scope.userresponse[i].q1 = "2";
													}

													else if ($scope.userresponse[i].response[1] == "3") {

														$scope.userresponse[i].q1 = "3";
													} else if ($scope.userresponse[i].response[1] == "4") {

														$scope.userresponse[i].q1 = "4";
													}

													else {

														$scope.userresponse[i].q1 = "5";
													}

													if ($scope.userresponse[i].response[3] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q2 = "1";
													} else if ($scope.userresponse[i].response[3] == "2") {

														$scope.userresponse[i].q2 = "2";
													}

													else if ($scope.userresponse[i].response[3] == "3") {

														$scope.userresponse[i].q2 = "3";
													} else if ($scope.userresponse[i].response[3] == "4") {

														$scope.userresponse[i].q2 = "4";
													}

													else {

														$scope.userresponse[i].q2 = "5";
													}

													if ($scope.userresponse[i].response[5] == "1") {

														// console.log("hellow");
														$scope.userresponse[i].q3 = "1";
													} else if ($scope.userresponse[i].response[5] == "2") {

														$scope.userresponse[i].q3 = "2";
													}

													else if ($scope.userresponse[i].response[5] == "3") {

														$scope.userresponse[i].q3 = "3";
													} else if ($scope.userresponse[i].response[5] == "4") {

														$scope.userresponse[i].q3 = "4";
													}

													else {

														$scope.userresponse[i].q3 = "5";
													}

													if ($scope.userresponse[i].response[7] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q4 = "1";
													} else if ($scope.userresponse[i].response[7] == "2") {

														$scope.userresponse[i].q4 = "2";
													}

													else if ($scope.userresponse[i].response[7] == "3") {

														$scope.userresponse[i].q4 = "3";
													} else if ($scope.userresponse[i].response[7] == "4") {

														$scope.userresponse[i].q4 = "4";
													}

													else {

														$scope.userresponse[i].q4 = "5";
													}

													if ($scope.userresponse[i].response[9] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q5 = "1";
													} else if ($scope.userresponse[i].response[9] == "2") {

														$scope.userresponse[i].q5 = "2";
													}

													else if ($scope.userresponse[i].response[9] == "3") {

														$scope.userresponse[i].q5 = "3";
													} else if ($scope.userresponse[i].response[9] == "4") {

														$scope.userresponse[i].q5 = "4";
													}

													else {

														$scope.userresponse[i].q5 = "5";
													}
													
													
													

													if ($scope.userresponse[i].response[11] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q6 = "1";
													} else if ($scope.userresponse[i].response[11] == "2") {

														$scope.userresponse[i].q6 = "2";
													}

													else if ($scope.userresponse[i].response[11] == "3") {

														$scope.userresponse[i].q6 = "3";
													} else if ($scope.userresponse[i].response[11] == "4") {

														$scope.userresponse[i].q6 = "4";
													}

													else {

														$scope.userresponse[i].q6 = "5";
													}
													
													
													
													
													
													if ($scope.userresponse[i].response[13] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q7 = "1";
													} else if ($scope.userresponse[i].response[13] == "2") {

														$scope.userresponse[i].q7 = "2";
													}

													else if ($scope.userresponse[i].response[13] == "3") {

														$scope.userresponse[i].q7 = "3";
													} else if ($scope.userresponse[i].response[13] == "4") {

														$scope.userresponse[i].q7 = "4";
													}

													else {

														$scope.userresponse[i].q7 = "5";
													}
													
													
													
													
													
													if ($scope.userresponse[i].response[15] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q8 = "1";
													} else if ($scope.userresponse[i].response[15] == "2") {

														$scope.userresponse[i].q8 = "2";
													}

													else if ($scope.userresponse[i].response[15] == "3") {

														$scope.userresponse[i].q8 = "3";
													} else if ($scope.userresponse[i].response[15] == "4") {

														$scope.userresponse[i].q8 = "4";
													}

													else {

														$scope.userresponse[i].q8 = "5";
													}
													
													
													
													
													
													if ($scope.userresponse[i].response[17] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q9 = "1";
													} else if ($scope.userresponse[i].response[17] == "2") {

														$scope.userresponse[i].q9 = "2";
													}

													else if ($scope.userresponse[i].response[17] == "3") {

														$scope.userresponse[i].q9 = "3";
													} else if ($scope.userresponse[i].response[17] == "4") {

														$scope.userresponse[i].q9 = "4";
													}

													else {

														$scope.userresponse[i].q9 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[19] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q10 = "1";
													} else if ($scope.userresponse[i].response[19] == "2") {

														$scope.userresponse[i].q10 = "2";
													}

													else if ($scope.userresponse[i].response[19] == "3") {

														$scope.userresponse[i].q10 = "3";
													} else if ($scope.userresponse[i].response[19] == "4") {

														$scope.userresponse[i].q10 = "4";
													}

													else {

														$scope.userresponse[i].q10 = "5";
													}
													
													
													

												}

												
												
												
												
												
												else {

													if ($scope.userresponse[i].response[1] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q1 = "1";
													} else if ($scope.userresponse[i].response[1] == "2") {

														$scope.userresponse[i].q1 = "2";
													}

													else if ($scope.userresponse[i].response[1] == "3") {

														$scope.userresponse[i].q1 = "3";
													} else if ($scope.userresponse[i].response[1] == "4") {

														$scope.userresponse[i].q1 = "4";
													}

													else {

														$scope.userresponse[i].q1 = "5";
													}
													
													
													

													if ($scope.userresponse[i].response[3] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q2 = "1";
													} else if ($scope.userresponse[i].response[3] == "2") {

														$scope.userresponse[i].q2 = "2";
													}

													else if ($scope.userresponse[i].response[3] == "3") {

														$scope.userresponse[i].q2 = "3";
													} else if ($scope.userresponse[i].response[3] == "4") {

														$scope.userresponse[i].q2 = "4";
													}

													else {

														$scope.userresponse[i].q2 = "5";
													}

													if ($scope.userresponse[i].response[5] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q3 = "1";
													} else if ($scope.userresponse[i].response[5] == "2") {

														$scope.userresponse[i].q3 = "2";
													}

													else if ($scope.userresponse[i].response[5] == "3") {

														$scope.userresponse[i].q3 = "3";
													} else if ($scope.userresponse[i].response[5] == "4") {

														$scope.userresponse[i].q3 = "4";
													}

													else {

														$scope.userresponse[i].q3 = "5";
													}

													if ($scope.userresponse[i].response[7] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q4 = "1";
													} else if ($scope.userresponse[i].response[7] == "2") {

														$scope.userresponse[i].q4 = "2";
													}

													else if ($scope.userresponse[i].response[7] == "3") {

														$scope.userresponse[i].q4 = "3";
													} else if ($scope.userresponse[i].response[7] == "4") {

														$scope.userresponse[i].q4 = "4";
													}

													else {

														$scope.userresponse[i].q4 = "5";
													}

													if ($scope.userresponse[i].response[9] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q5 = "1";
													} else if ($scope.userresponse[i].response[9] == "2") {

														$scope.userresponse[i].q5 = "2";
													}

													else if ($scope.userresponse[i].response[9] == "3") {

														$scope.userresponse[i].q5 = "3";
													} else if ($scope.userresponse[i].response[9] == "4") {

														$scope.userresponse[i].q5 = "4";
													}

													else {

														$scope.userresponse[i].q5 = "5";
													}

													if ($scope.userresponse[i].response[11] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q6 = "1";
													} else if ($scope.userresponse[i].response[11] == "2") {

														$scope.userresponse[i].q6 = "2";
													}

													else if ($scope.userresponse[i].response[11] == "3") {

														$scope.userresponse[i].q6 = "3";
													} else if ($scope.userresponse[i].response[11] == "4") {

														$scope.userresponse[i].q6 = "4";
													}

													else {

														$scope.userresponse[i].q6 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[13] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q7 = "1";
													} else if ($scope.userresponse[i].response[13] == "2") {

														$scope.userresponse[i].q7 = "2";
													}

													else if ($scope.userresponse[i].response[13] == "3") {

														$scope.userresponse[i].q7 = "3";
													} else if ($scope.userresponse[i].response[13] == "4") {

														$scope.userresponse[i].q7 = "4";
													}

													else {

														$scope.userresponse[i].q7 = "5";
													}
													
													
													if ($scope.userresponse[i].response[15] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q8 = "1";
													} else if ($scope.userresponse[i].response[15] == "2") {

														$scope.userresponse[i].q8 = "2";
													}

													else if ($scope.userresponse[i].response[15] == "3") {

														$scope.userresponse[i].q8 = "3";
													} else if ($scope.userresponse[i].response[15] == "4") {

														$scope.userresponse[i].q8 = "4";
													}

													else {

														$scope.userresponse[i].q8 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[17] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q9 = "1";
													} else if ($scope.userresponse[i].response[17] == "2") {

														$scope.userresponse[i].q9 = "2";
													}

													else if ($scope.userresponse[i].response[17] == "3") {

														$scope.userresponse[i].q9 = "3";
													} else if ($scope.userresponse[i].response[17] == "4") {

														$scope.userresponse[i].q9 = "4";
													}

													else {

														$scope.userresponse[i].q9 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[19] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q10 = "1";
													} else if ($scope.userresponse[i].response[19] == "2") {

														$scope.userresponse[i].q10 = "2";
													}

													else if ($scope.userresponse[i].response[19] == "3") {

														$scope.userresponse[i].q10 = "3";
													} else if ($scope.userresponse[i].response[19] == "4") {

														$scope.userresponse[i].q10 = "4";
													}

													else {

														$scope.userresponse[i].q10 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[21] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q11 = "1";
													} else if ($scope.userresponse[i].response[21] == "2") {

														$scope.userresponse[i].q11 = "2";
													}

													else if ($scope.userresponse[i].response[21] == "3") {

														$scope.userresponse[i].q11 = "3";
													} else if ($scope.userresponse[i].response[21] == "4") {

														$scope.userresponse[i].q11 = "4";
													}

													else {

														$scope.userresponse[i].q11 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[23] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q12 = "1";
													} else if ($scope.userresponse[i].response[23] == "2") {

														$scope.userresponse[i].q12 = "2";
													}

													else if ($scope.userresponse[i].response[23] == "3") {

														$scope.userresponse[i].q12 = "3";
													} else if ($scope.userresponse[i].response[23] == "4") {

														$scope.userresponse[i].q12 = "4";
													}

													else {

														$scope.userresponse[i].q12 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[25] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q13 = "1";
													} else if ($scope.userresponse[i].response[25] == "2") {

														$scope.userresponse[i].q13 = "2";
													}

													else if ($scope.userresponse[i].response[25] == "3") {

														$scope.userresponse[i].q13 = "3";
													} else if ($scope.userresponse[i].response[25] == "4") {

														$scope.userresponse[i].q13 = "4";
													}

													else {

														$scope.userresponse[i].q13 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[27] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q14 = "1";
													} else if ($scope.userresponse[i].response[27] == "2") {

														$scope.userresponse[i].q14 = "2";
													}

													else if ($scope.userresponse[i].response[27] == "3") {

														$scope.userresponse[i].q14 = "3";
													} else if ($scope.userresponse[i].response[27] == "4") {

														$scope.userresponse[i].q14 = "4";
													}

													else {

														$scope.userresponse[i].q14 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[29] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q15 = "1";
													} else if ($scope.userresponse[i].response[29] == "2") {

														$scope.userresponse[i].q15 = "2";
													}

													else if ($scope.userresponse[i].response[29] == "3") {

														$scope.userresponse[i].q15 = "3";
													} else if ($scope.userresponse[i].response[29] == "4") {

														$scope.userresponse[i].q15 = "4";
													}

													else {

														$scope.userresponse[i].q15 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[31] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q16 = "1";
													} else if ($scope.userresponse[i].response[31] == "2") {

														$scope.userresponse[i].q16 = "2";
													}

													else if ($scope.userresponse[i].response[31] == "3") {

														$scope.userresponse[i].q16 = "3";
													} else if ($scope.userresponse[i].response[31] == "4") {

														$scope.userresponse[i].q16 = "4";
													}

													else {

														$scope.userresponse[i].q16 = "5";
													}
													
													
													
													

													if ($scope.userresponse[i].response[33] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q17 = "1";
													} else if ($scope.userresponse[i].response[33] == "2") {

														$scope.userresponse[i].q17 = "2";
													}

													else if ($scope.userresponse[i].response[33] == "3") {

														$scope.userresponse[i].q17 = "3";
													} else if ($scope.userresponse[i].response[33] == "4") {

														$scope.userresponse[i].q17 = "4";
													}

													else {

														$scope.userresponse[i].q17 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[35] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q18 = "1";
													} else if ($scope.userresponse[i].response[35] == "2") {

														$scope.userresponse[i].q18 = "2";
													}

													else if ($scope.userresponse[i].response[35] == "3") {

														$scope.userresponse[i].q18 = "3";
													} else if ($scope.userresponse[i].response[35] == "4") {

														$scope.userresponse[i].q18 = "4";
													}

													else {

														$scope.userresponse[i].q18 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[37] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q19 = "1";
													} else if ($scope.userresponse[i].response[37] == "2") {

														$scope.userresponse[i].q19 = "2";
													}

													else if ($scope.userresponse[i].response[37] == "3") {

														$scope.userresponse[i].q19 = "3";
													} else if ($scope.userresponse[i].response[37] == "4") {

														$scope.userresponse[i].q19 = "4";
													}

													else {

														$scope.userresponse[i].q19 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[39] == "1") {

														//console.log("hellow");
														$scope.userresponse[i].q20 = "1";
													} else if ($scope.userresponse[i].response[39] == "2") {

														$scope.userresponse[i].q20 = "2";
													}

													else if ($scope.userresponse[i].response[39] == "3") {

														$scope.userresponse[i].q20 = "3";
													} else if ($scope.userresponse[i].response[39] == "4") {

														$scope.userresponse[i].q20 = "4";
													}

													else {

														$scope.userresponse[i].q20 = "5";
													}												

												}

											}

										}).error(function(res) {

								})
					}

					$scope.userresponse();

					$scope.exportDat32 = function() {

						$scope.userresponses = [];

						for ( var i in $scope.userresponse) {

							$scope.userresponses
									.push({

										Name : $scope.userresponse[i].name,
										Section_id : $scope.userresponse[i].section_id,
										Timestamp : $scope.userresponse[i].time,
										Q1 : $scope.userresponse[i].q1,
										Q2 : $scope.userresponse[i].q2,
										Q3 : $scope.userresponse[i].q3,
										Q4 : $scope.userresponse[i].q4,
										Q5 : $scope.userresponse[i].q5,
										Q6 : $scope.userresponse[i].q6,
										Q7 : $scope.userresponse[i].q7,
										Q8 : $scope.userresponse[i].q8,
										Q9 : $scope.userresponse[i].q9,
										Q10 : $scope.userresponse[i].q10,
										Q11 : $scope.userresponse[i].q11,
										Q12 : $scope.userresponse[i].q12,
										Q13 : $scope.userresponse[i].q13,
										Q14 : $scope.userresponse[i].q14,
										Q15 : $scope.userresponse[i].q15,
										Q16 : $scope.userresponse[i].q16,
										Q17 : $scope.userresponse[i].q17,
										Q18 : $scope.userresponse[i].q18,
										Q19 : $scope.userresponse[i].q19,
										Q20 : $scope.userresponse[i].q20,
										Q21 : $scope.userresponse[i].q21,
										Q22 : $scope.userresponse[i].q22,
										Q23 : $scope.userresponse[i].q23,
										Q24 : $scope.userresponse[i].q24,
										Q25 : $scope.userresponse[i].q25,
										Q26 : $scope.userresponse[i].q26

									})

						}

						alasql(
								'SELECT * INTO XLSX("userresponse.xlsx",{headers:true}) FROM ?',
								[ $scope.userresponses ]);

					}

				})
