//Під`єднюємо ангуляр
var app = angular.module('app', ['ngRoute']);
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);
app.config(function($routeProvider){
    $routeProvider
    .otherwise({
        redirectTo: '/'
    });
})

//Створюємо контроллер
app.controller('myCtrl', function ($scope) {

});

app.controller('firstCtrl', function () {
this.title="111"
});

app.controller('secondCtrl', function () {
this.title="Oleh"
});

//Директива Menu
app.directive('headerBlock', function () {
    return {
        replace: true,
        templateUrl:'template/menu.html' ,
        controller: function ($scope) {
            $scope.home = true;
            $scope.blog = false;
            $scope.contact = false;

            $scope.menuButtons = [
                {
                    action: function () {
                        $scope.home = true;
                        $scope.contact = false;
                        $scope.blog = false;
                        $scope.peopleAboutUs = false;
                    },
                    name: "Про нас"
                 }, {
                    action: function () {
                        $scope.home = false;
                        $scope.contact = false;
                        $scope.blog = true;
                        $scope.peopleAboutUs = false;
                    },
                    name: "Актуальні поради"
                 }, {
                    action: function () {
                        $scope.home = false;
                        $scope.contact = true;
                        $scope.blog = false;
                        $scope.peopleAboutUs = false;
                    },
                    name: "Наші контакти"
                 }, {
                    action: function () {
                        $scope.home = false;
                        $scope.contact = false;
                        $scope.blog = false;
                        $scope.peopleAboutUs = true;
                    },
                    name: "Відгуки"
                 }
             ]
        }
    }
});
//Директива Сторінок
app.directive('pagesBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/pages.html',
        controller: function ($scope) {
            $scope.arr = [{
                title: "Apple",
                text: "Even as a series of anti-trust investigations and an ugly pricing dispute with Apple Inc. (AAPL - Get Report) threaten its lucrative licensing business, Qualcomm Inc. (QCOM - Get Report) is looking aggressively ahead to its future opportunities."
    }, {
                title: "Facebook",
                text: "Facebook executive Regina Dugan is stepping down as head of the company's Building 8 research unit after just 18 months."
    }, {
                title: "IBM",
                text: "Warren Buffett just made nearly $800 million in IBM, a stock he doesn’t even like that much"
    },{
                title: "Caterpillar",
                text: "Caterpillar Incorporated (CAT) last reported earnings on July 25th. The company raised its guidance for the year, causing its stock to gap up on the news. "
    }];
        }
    }
});

//Директива заголовку
//app.directive('headBlock', function () {
//    return {
//        replace: true,
//        templateUrl: 'template/head.html',
//        controller: function ($scope) {
//            $scope.arr = [{
//                title: "News1",
//                text: "sdfsdfsdfsdfsdf"
//    }, {
//                title: "News2",
//                text: "sdfsdfsdfsdfsdf34234234"
//    }, {
//                title: "News3",
//                text: "sdfsdfsd2323423sdfsdf"
//    }];
//        }
//    }
//});

//Директива таблиці
app.directive('headBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/head.html',
        controller: function ($scope) {
			$scope.editStatus=false;
            $scope.arrTask = [];
			$scope.sendMessage= function(a){
				$scope.arrTask.push(a);
				$scope.enterText="";
			}
			$scope.deleteTask=function(b){
				$scope.arrTask.splice(b,1);
			}
			$scope.editTask = function(index,c){
				$scope.editStatus=true;
				$scope.indexEditMess = index;
				$scope.editedText = c;
			};
		
			$scope.sendEditedMessage = function(d){
				$scope.arrTask[$scope.indexEditMess] = d;
				$scope.editStatus=false;
			}
        }
    }
});

//Директива Авторизації / Реєстрації
app.directive('loginBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/login.html',
        controller: function ($scope, $http) {
            //Розлогінитись
            $scope.logOut = function () {
//                $scope.newUser = true;
                $scope.ProfileStatus = false;
                localStorage.userName = "default";
            };
//         
            //Авторизація
            $scope.checkUsers = function () {
                let loginObj = {
                    login: $scope.login,
                    pass: $scope.password
                };
                $http.post('http://localhost:8000/login-auth', loginObj)
                    .then(function successCallback(response) {
                        if (response.data == "welcome") {
                            $scope.userIn = "Wellcome " + $scope.login + "!!!";
                            $scope.newUser = false;
                            $scope.enterLogin = true;
                            $scope.user = "";
                            localStorage.userName = $scope.login;
                            
                            //Загрузка авторизованого юзера (якщо є)
            if (localStorage.userName == undefined) {
                localStorage.userName = "default";
            } else {
                if (localStorage.userName != "default") {
                    $scope.userIn = "Wellcome " + localStorage.userName + "!!!";
                    $scope.newUser = false;
                    $scope.ProfileStatus = true;
                    $scope.enterLogin = true;
                    $scope.user = "";
                     let loginObj = {
                    login: localStorage.userName
                };
                     $http.post('http://localhost:8000/user-prof', loginObj)
                    .then(function successCallback(response) {
                        $scope.userProfile = response.data;
                         $scope.nameUserProfile = $scope.userProfile[0].name;
                         $scope.snameUserProfile = $scope.userProfile[0].sname;
                         $scope.dateUserProfile = $scope.userProfile[0].date;
                         $scope.aboutUserProfile = $scope.userProfile[0].about;
                    
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                    

                } else {
                    $scope.newUser = true;
                    $scope.enterLogin = false;
                }
            };
                        } else {
                            $scope.user = response.data;
                            
                            
                            
                            
                        };
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                 
                
            };
         //реєстрація 
		$scope.register = function(){
				 let loginObj = {
                    login: $scope.login,
                    password: $scope.password
                };
				$http.post('http://localhost:8000/login-reg', loginObj)
				.then(function successCallback(response) {
					$scope.user = "Registred!!!"
				}, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                   });
			};
			//змінити пароль 
			$scope.changePassword = function(){
				let loginObj = {
                    login: $scope.newLoginTest,
                    password: $scope.newPasswordTest
                };
				$http.post('http://localhost:8000/login-change', loginObj)
				.then(function successCallback(response) {
					$scope.user = "Changet!!!"
				}, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                   });
			};
			//видалити юзерів
			$scope.deleteUser=function(){
				let loginObj={
					login: $scope.newLoginTest
				};
				$http.post('http://localhost:8000/login-del', loginObj)
				.then(function successCallback(response) {
					$scope.user = "Delete!!!"
				}, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                   });
			};
			//отримати юзерів
			
        }
    }
});



////Директива Авторизація
//app.directive('loginBlock', function () {
//    return {
//        replace: true,
//        templateUrl: 'template/login.html',
//        controller: function ($scope, $http) {
//            $scope.checkUsers = function() {
//                let obj = { 
//                    login: $scope.login,
//                    pass: $scope.password
//                }
//                $http.post('http://localhost:8000/login', obj)
//                .then(function successCallback(response){
//                    console.log(response.data);
//                },
//                     function errorCallback(response){
//                    console.log("Error!!!"+ response.err);
//                });
//            }
//        }
//    }
//});


//Директива Профайлу
app.directive('profileBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/profile.html',
        controller: function ($scope) {
        }
    }
});




//Директива чату
app.directive('chatBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/chat.html',
        controller: function ($scope, $http) {
            $scope.textInput = "";
            $scope.newUser = "Anonim";
            $scope.changeName = function () {
                $scope.newUser = $scope.Name;
            };
            $scope.arrTwit = [];
            $scope.SendTwit = function () {
                $scope.date = new Date();
                $scope.arrTwit.push({
                    date: $scope.date,
                    newUser: $scope.newUser,
                    textInput: $scope.textInput
                });
                $scope.textInput = "";
            }
        }
    }
});

//Директива пошуку
app.directive('test2Block', function () {
    return {
        replace: true,
        templateUrl: 'template/test2.html',
        controller: function ($scope, $http) {
        var a = new Date();
			$scope.arrTest2=[
//			 {
//				 title: "Ihor",
//				 text: "kkk"
//			 }
			 
			 
			  {
				 title: a	
			 },{
				 title: a	
			 },{
				 title: a	
			 }
		 ]
        }
    }
});
















//Директива слайдера
app.directive('sliderBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/slider.html',
        controller: function ($scope) {
(function ($) {
var hwSlideSpeed = 700;
var hwTimeOut = 3000;
var hwNeedLinks = true;

$(document).ready(function(e) {
	$('.slide').css(
		{"position" : "absolute",
		 "top":'0', "left": '0'}).hide().eq(0).show();
	var slideNum = 0;
	var slideTime;
	slideCount = $("#slider .slide").size();
	var animSlide = function(arrow){
		clearTimeout(slideTime);
		$('.slide').eq(slideNum).fadeOut(hwSlideSpeed);
		if(arrow == "next"){
			if(slideNum == (slideCount-1)){slideNum=0;}
			else{slideNum++}
			}
		else if(arrow == "prew")
		{
			if(slideNum == 0){slideNum=slideCount-1;}
			else{slideNum-=1}
		}
		else{
			slideNum = arrow;
			}
		$('.slide').eq(slideNum).fadeIn(hwSlideSpeed, rotator);
		$(".control-slide.active").removeClass("active");
		$('.control-slide').eq(slideNum).addClass('active');
		}
if(hwNeedLinks){
var $linkArrow = $('<a id="prewbutton" href="#">&lt;</a><a id="nextbutton" href="#">&gt;</a>')
	.prependTo('#slider');		
	$('#nextbutton').click(function(){
		animSlide("next");
		return false;
		})
	$('#prewbutton').click(function(){
		animSlide("prew");
		return false;
		})
}
	var $adderSpan = '';
	$('.slide').each(function(index) {
			$adderSpan += '<span class = "control-slide">' + index + '</span>';
		});
	$('<div class ="sli-links">' + $adderSpan +'</div>').appendTo('#slider-wrap');
	$(".control-slide:first").addClass("active");
	$('.control-slide').click(function(){
	var goToNum = parseFloat($(this).text());
	animSlide(goToNum);
	});
	var pause = false;
	var rotator = function(){
			if(!pause){slideTime = setTimeout(function(){animSlide('next')}, hwTimeOut);}
			}
	$('#slider-wrap').hover(	
		function(){clearTimeout(slideTime); pause = true;},
		function(){pause = false; rotator();
		});
	rotator();
});
})(jQuery);

        }
    }
});

//меню
//слайдер
//чат 
//авторизація