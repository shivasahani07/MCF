({
    doinit : function(component, event, helper) {
        debugger;
        var recordId = component.get('v.recordId');
        var action = component.get("c.GetVisitdetails");
        action.setParams({ AccrecordId :recordId  });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                var apikey = 'AIzaSyB4SPqkO0ZQbxT-EU4l886H9Y3ipf1NMW0';
                var responsevalue = response.getReturnValue();
                    var  destinationLat= responsevalue.destLat; 
                    var  destinationlong= responsevalue.destLong;
                    var originlat = responsevalue.DayvisitPlanRec.Start_Location__Latitude__s;
                    var originlong = responsevalue.DayvisitPlanRec.Start_Location__Longitude__s;
                    var Url = "https://www.google.com/maps/dir/?api=1&origin="+originlat+","+originlong+"&destination="+destinationLat+", "+destinationlong+"&travelmode=driving" + '&key=' + apikey; //window.open( 
                        //src="https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_API_KEY&origin=YOUR_ORIGIN&destination=YOUR_DESTINATION"
                component.set("v.mapdirectUrl", Url);
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    }
})