var app = angular.module('userVisit',[]);   
app.controller('userVisitController',function($scope,$window, $location){
    $scope.today = new Date();
    $scope.accounts = [];
    $scope.position = {lat:0.0, lng:0.0};
    $scope.userId = userId;
    $scope.temp = [];
    $scope.compVisit = [];
    $scope.pendingVisit = [];
    $scope.startVisitLocation = [{"lat":"","lng":""}];
    $scope.visitData = true;
    $scope.newVisitDate = '';
    $scope.amendVisitDate = '';
    $scope.amendVisitId = '';
    $scope.amendVisitHandling = false;
    $scope.start_ur_day = dayplanCreated;
    debugger;
    console.log('dayplanCreated::'+dayplanCreated);
    
    $scope.getGeoLocation = () => {
        debugger;
        console.log('getGeoLocation');
        var options = {
        maximumAge: Infinity,
        timeout: 60000,
        enableHighAccuracy: false
    };
    
    function _onSuccess(callback, position) {
        console.log('LAT: ' + position.coords.latitude + ' - LON: ' +  position.coords.longitude);
        $scope.position.lat = position.coords.latitude;
        $scope.position.lng = position.coords.longitude;
        //$scope.init($scope.today, $scope.position.lat, $scope.position.lng);
    }
    function _onError (callback, error) {
        console.log(error);
        if(callback) callback();
        
    }
    function _getLocation (callback) {
        navigator.geolocation.getCurrentPosition(
            _onSuccess.bind(this, callback),
            _onError.bind(this, callback), 
            options
        );
    }
    _getLocation();
}				
    $scope.getGeoLocation();

$scope.counter = 1; 
$scope.addDays = function(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy;
}

let getSelected = (dateToValidate) => {
    return dateToValidate.getDate() == $scope.today.getDate() && dateToValidate.getMonth() == $scope.today.getMonth() && dateToValidate.getFullYear() == $scope.today.getFullYear();
}
$scope.monthName = '';
$scope.year = '';
$scope.updateWeek = function(){
    debugger;
    $scope.currentDateArray = [];
    $scope.currentDateMap = [];
    $scope.todaysDate = $scope.today.getDate();
    console.log($scope.counter);
    console.log($scope.counter*7-7);
    let curr = new Date 
    let week = []
    
    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i 
        let weekDate = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(weekDate);
        $scope.currentDateMap.push({day: first, date: weekDate,selected : getSelected(curr)});
    }
    //var secondNextMonday = new Date(curr).getNextWeekDay(1); 
    //console.log('secondNextMonday::'+secondNextMonday);
    /*for(var i=$scope.counter*7-7; i < $scope.counter*7; i++){
        var currDate = $scope.addDays($scope.today,i);
        $scope.currentDateMap.push({day: currDate.getDate(), date: currDate, selected : getSelected(currDate)});
    }*/
    console.log($scope.currentDateMap);
    const date = curr;  // 2009-11-10
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    console.log('month'+ month);
    $scope.monthName = month;
    $scope.year = year;
    /*Date.prototype.getNextWeekDay = function(d) {
        if (d) {
            var next = this;
            next.setDate(this.getDate() - this.getDay() + 7 + d);
            return next;
        }
    }*/
}

$scope.updateWeek();

$scope.visitDetail = function(visitId) {
    debugger;
    let mainURL = window.location.origin+'/apex';
    window.location.replace(mainURL + "/VisitPlanningDetailPage?id="+visitId);
}

$scope.getVisits = function(index) {
    debugger;
    let objIndex = $scope.currentDateMap.findIndex((date => date.selected == true));
    if(objIndex != -1)
        $scope.currentDateMap[objIndex].selected = false;
    $scope.currentDateMap[index].selected = true;
    let curr = new Date($scope.currentDateMap[index].date);
    console.log('curr::'+curr);
    const month = curr.toLocaleString('default', { month: 'long' });
    const year = curr.toLocaleString('default', { year: 'numeric' });
    console.log('month'+ month);
    $scope.monthName = month;
    $scope.year = year;
    ProjectTrackingController.userPopulated($scope.currentDateMap[index].date,$scope.userId,function(result,event){
        debugger;
        console.log('result::'+result);
        console.log(result);
        nextLocationList = result.visitstr;
        complatedVisit = result.visitCompstr;
        $scope.pendingVisit = result.visitList;
        console.log($scope.pendingVisit);
        $scope.compVisit = result.visitCompList;
        $scope.$apply();
        initMap();
    },{escape: false});
    //$scope.init($scope.currentDateMap[index].date, $scope.position.lat, $scope.position.lng);
}

// utility Functions
var nextCounter =0;
var prevCounter = 0;
$scope.nextWeek = function() {                      
    debugger;
    ++nextCounter;
    --prevCounter;
    let curr = new Date()
    var date = new Date();
    date.setDate(date.getDate() + (7 * nextCounter));
    console.log(date);
    let week = []
    curr = date;
    $scope.currentDateMap = [];
    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i 
        let weekDate = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(weekDate);
        $scope.currentDateMap.push({day: curr.getDate(), date: weekDate});
    }
    console.log('currentDateMap::'+$scope.currentDateMap);
}

$scope.previousWeek = function(dt) {
    debugger;
    ++prevCounter;
    --nextCounter;
    let curr = new Date()
    var date = new Date();
    date.setDate(date.getDate() - (7 * prevCounter));
    console.log(date);
    let week = []
    curr = date;
    $scope.currentDateMap = [];
    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i 
        let weekDate = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(weekDate);
        $scope.currentDateMap.push({day: curr.getDate(), date: weekDate});
    }
    console.log('currentDateMap::'+$scope.currentDateMap);
}
$scope.angularInit = function(){
    debugger;
    console.log('angular initiated:::'+$scope.userId)
    $scope.pendingVisit = JSON.parse(penVisit);
    console.log($scope.pendingVisit)
    $scope.compVisit = JSON.parse(compVisit);
    //initMap();
}

$scope.cancelAmendVisit = function(){
    $scope.amendVisitHandling = false;
}
$scope.amendVisit = function(param,visitId){
    debugger;
    $scope.amendVisitHandling = true;
    console.log('list::'+$scope.pendingVisit[param]);
    $scope.amendVisitDate = $scope.pendingVisit[param].Planned_visit_date__c;
    var date = new Date($scope.amendVisitDate);
    
    
    // Will display time in 10:30:23 format
    $scope.amendVisitDate = date;
    $scope.amendVisitId = visitId;
}

$scope.changeAmendVisit = function(){
    debugger;
    console.log('$scope.amendVisitDate::'+$scope.amendVisitDate);
    console.log('$scope.amendVisitId::'+$scope.amendVisitId);
    console.log('new visit date::'+$scope.newVisitDate);
    
    var newDate = new Date($scope.newVisitDate);
    var dd1 = String(newDate.getDate()).padStart(2, '0');
    var mm1 = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy1 = newDate.getFullYear();
    newDate = mm1 + '/' + dd1 + '/' + yyyy1;
    var existingDate = new Date();
    var dd = String(existingDate.getDate()).padStart(2, '0');
    var mm = String(existingDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = existingDate.getFullYear();
    
    existingDate = mm + '/' + dd + '/' + yyyy;
    if(newDate < existingDate){
        $scope.amendVisitHandling = false;
        Swal.fire({title:'Date Warnig',text:'Please choose future date.'},function(isConfirm) {
            if(isConfirm){
                $scope.amendVisitHandling = true;
                $scope.$apply();
            }
            
        })
    }else{
        ProjectTrackingController.changePlannedVisitdate($scope.newVisitDate,$scope.amendVisitId,function(result,event){
            if(result != null){
                debugger;
                $scope.amendVisitHandling = false;
                $scope.$apply();
                Swal.fire({title:'Visit Plan Change',text:'Your visit plan has been changed successfully.'},function(isConfirm) {
                    if(isConfirm){
                        location.reload(); 
                        
                    }
                    
                })
            }
        })
    }
    
}


$scope.startVisit = function(accId,visitId){
    debugger;
    let mainURL = window.location.origin+'/apex';
    window.location.replace(mainURL + "/ProjectStartVisit?id="+accId+"&vistId="+visitId);
}

$scope.startDay = function(){
    debugger;
    
    console.log('$scope.position.lat:'+$scope.position.lat);
    ProjectTrackingController.createVisitPlanAcrossUser($scope.position.lat,$scope.position.lng,$scope.userId
                                                          ,function(result,event){
                                                              if(result != null){
                                                                  Swal.fire({title:'VISIT PLAN',text:result},function(isConfirm) {
                                                                      $scope.visitData = true;
                                                                      $scope.$apply();
                                                                      //window.location.reload();
                                                                  });
                                                                  
                                                              }
                                                          },{escape: false});
}
});



//var Avals;
var userTracking;
//You can calculate directions (using a variety of methods of transportation) by using the DirectionsService object.    
var directionsService;    
//Define a variable with all map points.    
var _mapPoints = new Array();  
var _polyPoints = new Array();
//Define a DirectionsRenderer variable.    
var _directionsRenderer = '';   


function initMap() {
    debugger;
    userTracking = complatedVisit;
    var userTrackingPosition;
    debugger;
    if(userTracking != undefined)
    	userTrackingPosition =JSON.parse(userTracking); 
    var locationListtopass = [];
    var myMapCenter = {lat: 40.785091, lng: -73.968285};
    var myOptions = {    
        zoom: 6,    
        center: new google.maps.LatLng(21.7679, 78.8718),    
        mapTypeId: google.maps.MapTypeId.ROADMAP    
    };
    
   /* var map = new google.maps.Map(document.getElementById('map'), {
		center: myMapCenter,
		zoom: 14
	});*/
    /*if(userTrackingPosition != undefined && userTrackingPosition.length> 0){
        for(var key in userTrackingPosition){
        if(key != 'remove'){
          _polyPoints.push(new google.maps.LatLng(userTrackingPosition[key].lat, userTrackingPosition[key].lng));  
        }
        
    	}
    }
    
    _polyPoints.push(new google.maps.LatLng(12.9352, 77.6245));*/
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: new google.maps.LatLng(12.917799, 77.6150895),
    });
    var flightPath = new google.maps.Polyline({
        path: _polyPoints,
        strokeColor: "black",
        strokeOpacity: 1,
        strokeWeight: 2
    });
    flightPath.setMap(map);
    shortestroute();
    
}

function shortestroute(){
    
    debugger;
    directionsService = new google.maps.DirectionsService();
    _directionsRenderer = new google.maps.DirectionsRenderer();    
    //Set the your own options for map.    
    var myOptions = {    
        zoom: 6,    
        center: new google.maps.LatLng(21.7679, 78.8718),    
        mapTypeId: google.maps.MapTypeId.ROADMAP    
    }; 
    _mapPoints = new Array();    
    userTracking = complatedVisit;
    var userTrackingPosition;
    Avals = nextLocationList;
    console.log(nextLocationList)
    //[{"lng":77.603722,"lat":12.987361},{"lng":null,"lat":null},{"lng":77.626579,"lat":12.934533},{"lng":null,"lat":null}]
    
    debugger;
    if(userTracking != undefined)
    	userTrackingPosition =JSON.parse(userTracking); 
    var salesRepsPositions =JSON.parse(Avals);
    
    /*var locationlist = [{"long":77.5946,"lat":12.9716},{"long":77.6408,"lat":12.9784},{"long":77.6408,"lat":12.9784},{"long":77.6408,"lat":12.9784},{"long":77.6408,"lat":12.9784}];
    console.log('locationlist::'+locationlist);*/
    var locationListtopass = [];
    /*for(var key in userTrackingPosition){
        locationListtopass.push(new google.maps.LatLng(userTrackingPosition[key].lat, userTrackingPosition[key].long));
    }*/
    /*for(var key in userTrackingPosition){
        if(key != 'remove'){
             _polyPoints.push(new google.maps.LatLng(userTrackingPosition[key].lat, userTrackingPosition[key].lng));
        }
        //_mapPoints.push(new google.maps.LatLng(userTrackingPosition[key].lat, userTrackingPosition[key].long)); 
    }*/
    
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: new google.maps.LatLng(12.917799, 77.6150895),
    });
    // line no 30 to 35 is used for Polyline without marker
    var flightPath = new google.maps.Polyline({
        path: _polyPoints,
        strokeColor: "green",
        strokeOpacity: 1,
        strokeWeight: 2
    });
    flightPath.setMap(map);
    _directionsRenderer.setMap(map);
    if(salesRepsPositions.length < 2){
        
    }
    for(var key in salesRepsPositions){
        if(key != 'remove'){
            _mapPoints.push(new google.maps.LatLng(salesRepsPositions[key].lat, salesRepsPositions[key].lng)); 
        }
        
    }
    console.log('_mapPoints::'+_mapPoints);
    // below method is used to generate maproad with marker
    getRoutePointsAndWaypoints();  
    
    
    
}
function getRoutePointsAndWaypoints() {    
    //Define a variable for waypoints.    
	debugger;
    var _waypoints = new Array();    
    if (_mapPoints.length > 2) //Waypoints will be come.    
    {    
        for (var j = 1; j < _mapPoints.length - 1; j++) {    
            var address = _mapPoints[j];    
            if (address !== "") {    
                _waypoints.push({    
                    location: address,    
                    stopover: true  //stopover is used to show marker on map for waypoints    
                });    
            }    
        }    
        //Call a drawRoute() function  
        console.log(_mapPoints[0],_mapPoints[_mapPoints.length-1],_waypoints)  
        drawRoute(_mapPoints[0], _mapPoints[_mapPoints.length - 1], _waypoints);    
    } else if (_mapPoints.length > 1) {    
        //Call a drawRoute() function only for start and end locations    
        drawRoute(_mapPoints[_mapPoints.length - 2], _mapPoints[_mapPoints.length - 1], _waypoints);    
    } else {    
        //Call a drawRoute() function only for one point as start and end locations.    
        drawRoute(_mapPoints[_mapPoints.length - 1], _mapPoints[_mapPoints.length - 1], _waypoints);    
    }
} 
function drawRoute(originAddress, destinationAddress, _waypoints) {    
    //Define a request variable for route . 
    console.log(originAddress,destinationAddress,_waypoints)   
    var _request = '';    
    //This is for more then two locatins    
    if (_waypoints.length > 0) {    
        _request = {    
            origin: originAddress,    
            destination: destinationAddress,    
            waypoints: _waypoints, //an array of waypoints    
            optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.    
            travelMode: google.maps.DirectionsTravelMode.DRIVING    
        };    
    } else {    
        //This is for one or two locations. Here noway point is used.    
        _request = {    
            origin: originAddress,    
            destination: destinationAddress,    
            travelMode: google.maps.DirectionsTravelMode.DRIVING    
        };    
    }    
    console.log(_request)
    
    //This will take the request and draw the route and return response and status as output    
    directionsService.route(_request, function (_response, _status) {   
        debugger;
        console.log(_response);
        if (_status == google.maps.DirectionsStatus.OK) {    
            _directionsRenderer.setDirections(_response);    
        }    
        else{
            console.log(_status);
        }
    });   
    
    
} 


/*function initMap() {
	var myMapCenter = {lat: 40.785091, lng: -73.968285};

	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: myMapCenter,
		zoom: 14
	});


	function markStore(storeInfo){

		// Create a marker and set its position.
		var marker = new google.maps.Marker({
			map: map,
			position: storeInfo.location,
			title: storeInfo.name
		});

		// show store info when marker is clicked
		marker.addListener('click', function(){
			showStoreInfo(storeInfo);
		});
	}

	// show store info in text box
	function showStoreInfo(storeInfo){
		var info_div = document.getElementById('info_div');
		info_div.innerHTML = 'Store name: '
			+ storeInfo.name
			+ '<br>Hours: ' + storeInfo.hours;
	}

	var stores = [
		{
			name: 'Store 1',
			location: {lat: 40.785091, lng: -73.968285},
			hours: '8AM to 10PM'
		},
		{
			name: 'Store 2',
			location: {lat: 40.790091, lng: -73.968285},
			hours: '9AM to 9PM'
		}
	];

	stores.forEach(function(store){
		markStore(store);
	});

}*/
