var app = angular.module('startVisit',[]);
app.controller('startvisitController',function($scope){
    debugger;
    console.log('controller initiated::');
    $scope.accDetails = JSON.parse(accDetails);
    $scope.custVisit = JSON.parse(custDetails);
    $scope.visitId = vstId;
    $scope.accId = accId;
    $scope.userId = userId;
    $scope.paymentHandeling = false;
    $scope.caseHandeling = false;
    $scope.returnHandeling = false;
    $scope.position = {lat:0.0, lng:0.0};
    $scope.orderNumber = '';
    $scope.returnOrderList = [];
    $scope.returnOrderHandling = false;
    $scope.selectAll = false;
    $scope.productListTobeReturn = [];
    $scope.addValues = false;
    $scope.onboardHandeling = false;
    $scope.planDate = '';
    $scope.newVisitHandeling = false;
    $scope.visitduringOnboard = false;
    $scope.planvisit = '';
    $scope.checkin_enable = checkin;
    console.log('$scope.accDetails::'+$scope.accDetails);
    
    $scope.onboardDealer = {
        Name : '',
        Phone : '',
        Email__c : '',
        Account_Type__c : '',
        BillingStreet : '',
        BillingCity : '',
        BillingState : '',
        BillingPostalCode : '',
        BillingCountry : ''
    }
    $scope.caseData = {
        Type : '',
        Reason : '',
        Product__c : '',
        Subject : '',
        Status : '',
        Priority : '',
        Origin : ''
    }
    $scope.paymentData = {
        Cheque_Date__c : '',
        Amount__c : '',
        Payment_Date__c : '',
        Cheque_Date__c : ''
    }
    
   
    
    $scope.vstHandle = function(){
        debugger;
        console.log('$scope.visitduringOnboard = false;::'+$scope.visitduringOnboard);
        if($scope.visitduringOnboard)
            $scope.visitduringOnboard = false;
        else
            $scope.visitduringOnboard = true; 
    }
    
    $scope.onboardingDealer = function(){
        debugger;
        console.log('$scope.onboardDealer::'+$scope.onboardDealer);
        console.log('$scope.planvisit::'+$scope.planvisit);
        ProjectSartVisitController.onboardDealer($scope.onboardDealer,$scope.planDate,$scope.userId,function(result,event){
            if(result != null){
                $scope.onboardHandeling = false;
                $scope.$apply();
                Swal.fire({title:'Dealer Onboarding',text:'Dealer onboarding process has been completed.'}
                          ,function(isConfirm) {
                              
                          })
            }
        })
    }
    
    $scope.newDealerOnboarding = function(){
        $scope.onboardHandeling = true;
    }
    
    $scope.cancelDealerOnboarding = function(){
        $scope.onboardHandeling = false;
    }
    
    $scope.returnOrderData = {
        Dealer_Comments__c : ''
    }
    $scope.visitDetailWrapper = new Object();
    
    $scope.temp = function(){
        debugger;
        console.log($scope.returnOrderList);
    }
    $scope.addProductTobeReturn = function(param){
        debugger;
        console.log('$scope.addValues::'+$scope.addValues);
        $scope.productListTobeReturn.push($scope.returnOrderList[param]);
        console.log('$scope.productListTobeReturn::'+$scope.productListTobeReturn);
    }
    $scope.nextbtn = function(){
        debugger;
        console.log('nextbtn::'+$scope.orderNumber);
        ProjectSartVisitController.getOrderItems($scope.orderNumber,function(result,event){
            if(result != null){
                console.log('result::'+result);
                $scope.returnOrderList = result;
                $scope.returnOrderHandling = true;
                $scope.$apply();
            }
        })
    }
    
    $scope.cancelReturnOrderHandling = function(){
        $scope.returnOrderHandling = false;
        $scope.returnHandeling = false;
    }
    
    $scope.createReturnOrder = function(){
        $scope.returnHandeling = true;
    }
    
    $scope.cancelReturnOrder = function(){
        $scope.returnHandeling = false;
    }
    
    $scope.returnOrder = function(){
        debugger;
        $scope.returnOrderHandling = false;
        $scope.visitDetailWrapper.accId = $scope.accId;
        $scope.visitDetailWrapper.userId = $scope.userId;
        $scope.visitDetailWrapper.returnRec = $scope.returnOrderData;
        $scope.visitDetailWrapper.orderLineItem = $scope.productListTobeReturn;
        ProjectSartVisitController.raiseReturnRequest(JSON.stringify($scope.visitDetailWrapper),function(result,event){
            if(result != null){
                $scope.returnHandeling = false;
                
                $scope.$apply();
                Swal.fire({title:'Order Return Request',text:'Your product return has been placed. Please refer order number for future : '+ result},function(isConfirm) {
                                                                  })
            }
        })
    }
    $scope.cancelCase = function(){
        debugger;
        $scope.caseHandeling = false;
    }
    
    $scope.createCase = function(){
        $scope.caseHandeling = true;
    }
    $scope.newCase = function(){
        debugger;
        console.log('$scope.caseData::'+$scope.caseData);
        $scope.visitDetailWrapper.caseRec= $scope.caseData;
        $scope.visitDetailWrapper.accId = $scope.accId;
        $scope.visitDetailWrapper.userId = $scope.userId;
        ProjectSartVisitController.createNewCase(JSON.stringify($scope.visitDetailWrapper),function(result,event){
            if(result != null){
                $scope.caseHandeling = false;
                $scope.$apply();
                Swal.fire({title:'Case',text:'Your request has been raised to OPS team. Please refer case number : '+ result},function(isConfirm) {
                                                                  })
            }
        })
    }
    
    $scope.newOrder = function(){
        debugger;
        let mainURL = window.location.origin+'/apex';
        window.location.replace(mainURL + "/OrderManagement?id="+$scope.accId+"&vistId="+$scope.visitId);
    }
    $scope.newPayment = function(){
        $scope.paymentHandeling = true;
    }
    $scope.cancelPayment = function(){
        $scope.paymentHandeling = false;
    }
    $scope.createPayment = function(){
        debugger;
        console.log('$scope.paymentData::'+$scope.paymentData);
        $scope.visitDetailWrapper.paymentRec= $scope.paymentData;
        $scope.visitDetailWrapper.accId = $scope.accId;
        ProjectSartVisitController.createPaymentRecord(JSON.stringify($scope.visitDetailWrapper),function(result,event){
            debugger;
            console.log(result);
            if(result != null){
                $scope.paymentHandeling = false;
                $scope.$apply();
                Swal.fire({title:'Payment Response',text:result},function(isConfirm) {
                                                                  })
            }
        })
    }
    $scope.checkIn = function(){
        debugger;
        console.log('$scope.position.lat:'+$scope.position.lat);
        console.log('$scope.accDetails.Geo_Location__Latitude__s::'+$scope.accDetails.Geo_Location__Latitude__s);
        $scope.checkin_enable = false;
        ProjectSartVisitController.checkInDealerShop($scope.position.lat,$scope.position.lng,$scope.visitId,$scope.accId,function(result,event){
            if(result != null){
                Swal.fire({title:'Check-In Details',text:result},function(isConfirm) {
                                                                      $scope.visitData = true;
                    													
                                                                      $scope.$apply();
                                                                  })
            }
        })
    }
    
    $scope.checkOut = function(){
        debugger;
        ProjectSartVisitController.checkOutDealerShop($scope.position.lat,$scope.position.lng,$scope.visitId,$scope.accId,function(result,event){
            if(result != null){
                Swal.fire({title:'Check-Out Details',text:result},function(isConfirm) {
                                                                      $scope.visitData = true;
                                                                      $scope.$apply();
                                                                  })
            }
        })
    }
    
    $scope.BackTouserDetails = function(){
        let mainURL = window.location.origin+'/apex';
        window.location.replace(mainURL + "/ProjectTracking");
    }
    
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
        var nexts = [{"lat":$scope.position.lat,"lng":$scope.position.lng},{"lat":$scope.accDetails.Geo_Location__Latitude__s,"lng":$scope.accDetails.Geo_Location__Longitude__s}];
        console.log('nexts::'+nexts);
        nextLocationList = JSON.stringify(nexts);
        initMap();
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

$scope.infoWindow = function(param){
    debugger;
    console.log(param);
}
});
var userTracking;
var _mapPoints = new Array();  
var _polyPoints = new Array();
function initMap() {
    debugger;
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
    var userTrackingPosition;
    Avals = nextLocationList;
    debugger;
    var salesRepsPositions =JSON.parse(Avals);
    
    var map = new google.maps.Map(document.getElementById("visitMap"), {
        zoom: 14,
        center: new google.maps.LatLng(12.917799, 77.6150895),
    });
    var stores = [
		{
			name: 'Store 1',
			location: {lat: 12.971891, lng: 77.641151},
			hours: '8AM to 10PM',
            sampleInfo:'A'
		},
		{
			name: 'Store 2',
			location: {lat: 12.9502, lng: 77.6449},
			hours: '9AM to 9PM',
            sampleInfo:'B'
		},
        {
			name: 'Store 3',
			location: {lat: 12.9500, lng: 77.6400},
			hours: '9AM to 9PM',
            sampleInfo:'C'
		}
	];
    var contentString = '';
        
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    
    function markStore(storeInfo){

		var marker = new google.maps.Marker({
			map: map,
			position: storeInfo.location,
			title: storeInfo.name
		});

		marker.addListener('click', function(){
            debugger;
            contentString = storeInfo.sampleInfo;
            alert(storeInfo.sampleInfo);
            infowindow.setContent('<div id="info-bubble" style="padding:20px;border-radius:5px;max-width:260px;box-shadow:none;"><h2><b>Shop Name : </b>' + storeInfo.name + '</h2><br><h2><b>Shop Open Hours : </b>' + storeInfo.hours + '</h2><button type="button" onclick="myFunction(storeInfo.hours)">Click Me!</button></div>');
            infowindow.open(map, marker);
			showStoreInfo(storeInfo);
		});
	}
    
    function showStoreInfo(storeInfo){
		var info_div = document.getElementById('info_div');
		info_div.innerHTML = 'Store name: '
			+ storeInfo.name
			+ '<br>Hours: ' + storeInfo.hours;
	}
    
        
    
    stores.forEach(function(store){
		markStore(store);
	});
    _directionsRenderer.setMap(map);
    
    for(var key in salesRepsPositions){
        console.log('salesRepsPositions[key].lat::'+salesRepsPositions[key].lat);
        console.log('salesRepsPositions[key].lng::'+salesRepsPositions[key].lng);
        if(salesRepsPositions[key].lat == undefined){
            salesRepsPositions[key].lat = 12.902802;
        }
        if(salesRepsPositions[key].lng == undefined){
            salesRepsPositions[key].lng = 77.580009;
        }
        if(key != 'remove'){
            _mapPoints.push(new google.maps.LatLng(salesRepsPositions[key].lat, salesRepsPositions[key].lng)); 
        }
        
    }
    console.log('_mapPoints::'+_mapPoints);
    getRoutePointsAndWaypoints();  
}

function myFunction(param) {
    console.log(param)
}

function getRoutePointsAndWaypoints() {    
    //Define a variable for waypoints.    
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
        //This is for one or two locatio		ns. Here noway point is used.    
        _request = {    
            origin: originAddress,    
            destination: destinationAddress,    
            travelMode: google.maps.DirectionsTravelMode.DRIVING    
        };    
    }    
    //This will take the request and draw the route and return response and status as output    
    directionsService.route(_request, function (_response, _status) {    
        if (_status == google.maps.DirectionsStatus.OK) {    
            _directionsRenderer.setDirections(_response);    
        }    
    });   
    
    
}