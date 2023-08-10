({
    init: function(component, event, helper) {
        debugger;
        // Define the list of months
       
        component.set('v.months', [
            'January 2023', 'February 2023', 'March 2023', 'April 2023', 'May 2023', 'June 2023',
            'July 2023', 'August 2023', 'September 2023', 'October 2023', 'November 2023', 'December 2023'
        ]);

        // Get the current date and extract the month and year information
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth()+1;
        var currentYear = currentDate.getFullYear();
        // Set the current month and year in the component attributes
        component.set('v.currentMonth', currentMonth);
        if(currentMonth == 1){
            component.set('v.selectedMonth', 'January');
        }
        if(currentMonth == 8){
            component.set('v.selectedMonth', 'August');
        }
        component.set('v.currentYear', currentYear);
        
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

    }    
  
})