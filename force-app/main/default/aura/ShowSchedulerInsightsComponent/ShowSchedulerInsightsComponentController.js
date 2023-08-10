({
	parentComponentEvent : function(component, event, helper) {
        debugger;
        var message = event.getParam("message"); 
        //Set the handler attributes based on event data 
        component.set("v.ShowToCreateMonthlyBeatPlan",message);
		
	}
})