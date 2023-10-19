({       
    HandleNewBeatPal:function(component, event, helper) {
        debugger;
        component.set("v.ShowToCreateBeatPlanne",true);
        var action = component.get("c.AllRolesXKPICurrentUser");
        action.setCallback(this, function(response){
            var state = response.getState();
            var result = response.getReturnValue();
            if(state == 'SUCCESS') {
                if(result.length>0){
                    for(let i=0;i<result.length;i++){
                        result[i].targetvalue=null;
                    }
                }
                component.set("v.RoleAndKPIList",result);
            }else{
                
            }
        });
        $A.enqueueAction(action);
    },
    HandleCancel:function(component, event, helper) {
        debugger;
        component.set("v.ShowToCreateBeatPlanne",false);
    },  
    HandleCreate:function(component, event, helper) {
        debugger;
        /*var TempArray=[{key:'January 2023',value:0},{key:'February 2023',value:1},{key:'March 2023',value:2},{key:'April 2023',value:3},{key:'May 2023',value:4},{key:'June 2023',value:5},
        {key:'July 2023',value:6},{key:'August 2023',value:7},{key:'September 2023',value:8},{key:'October 2023',value:9},{key:'November 2023',value:10},{key:'December 2023',value:11}];
        //var SelectedMonth=component.get("v.selectedMonthNumber");*/
        var startDate=component.get("v.StartDatevalue");
        var EndDate=component.get("v.EndDatevalue");
        
        if (startDate > EndDate) {
            alert('Please choose curret date')
            return;
        }
        
        let Month=component.get("v.selectedMonth");
        let Year=component.get("v.selectedYear");
        
        console.log('ROLE KPI---'+JSON.stringify(component.get("v.RoleAndKPIList")));
        console.log('startDate---'+JSON.stringify(startDate));
        console.log('EndDate---'+JSON.stringify(EndDate));
        
        
        var action = component.get("c.GetAllMonthlyBeatPlanner");
        action.setParams({
            "StartDate":startDate,
            "LastDate":EndDate,
            "WrapperRecList":component.get("v.RoleAndKPIList")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == 'SUCCESS') {
                if(response.getReturnValue() == 'ErrorFound'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error',
                        message:'Monthly Beat Plan already available for selected Date Month',
                        duration:' 3000',
                        key: 'info_alt',
                        type: 'error',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                    //alert('Monthly Beat Plan already available for selected Date Month');
                    return;
                }
                component.set("v.ShowToCreateBeatPlanne",false);
                var cmpEvent = component.getEvent("sampleCmpEvent");
                debugger;
                //Set event attribute value
                cmpEvent.setParams({
                    "Month" : Month,
                    "Year":Year
                }); 
                cmpEvent.fire();
            }else{
                component.set("v.ShowToCreateBeatPlanne",false);
            }
        });
        $A.enqueueAction(action);
        
    }
})