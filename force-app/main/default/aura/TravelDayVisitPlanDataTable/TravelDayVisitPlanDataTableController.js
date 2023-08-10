({
	doInit : function(component, event, helper) {
        debugger;
        var action = component.get('c.getAllDateOfSchdeularSight');
        action.setCallback(this, function(response) {
            if(response.getState() === "SUCCESS"){
                var data = response.getReturnValue();
                if(data.dayVisitPlanList !=null && data.dayVisitPlanList.length >0){
                    var resultdata = data.dayVisitPlanList;
                    component.set("v.dataList",resultdata);
                   // alert(JSON.stringify(data.dayVisitPlanList)) 
                }
            }
        });
        $A.enqueueAction(action);
    },
})