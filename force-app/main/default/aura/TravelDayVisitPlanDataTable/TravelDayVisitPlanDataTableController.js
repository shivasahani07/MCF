({
	doInit : function(component, event, helper) {
        debugger;
        var action = component.get('c.getAllDateOfSchdeularSight');
        action.setCallback(this, function(response) {
            if(response.getState() === "SUCCESS"){
                var data = response.getReturnValue();
                if(data.dayVisitPlanList !=null && data.dayVisitPlanList.length >0){
                    component.set("v.dayVisitPlanList",data.dayVisitPlanList);
                }
            }
        });
        $A.enqueueAction(action);
    },
})