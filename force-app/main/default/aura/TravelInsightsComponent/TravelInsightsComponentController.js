({
    init: function(component, event, helper) {
        debugger;
        // Define the list of months
       
        var action = component.get('c.getMonthBeatPlan');
         action.setCallback(this, function(response) {
             if(response.getState() === "SUCCESS"){
                 var data = response.getReturnValue();
                 if(data !=null){
                     component.set("v.MonthlyBeatPlanDataList",data);
                      component.set("v.userName",data.Sales_User__r.Name);
                 }
             }
        
        });
           $A.enqueueAction(action);

    },

})