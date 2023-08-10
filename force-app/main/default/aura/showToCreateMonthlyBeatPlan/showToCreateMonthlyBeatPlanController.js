({       
    doInit:function(component, event, helper) {
            debugger;
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
                    component.set("v.ShowToCreateBeatPlanne",false);
                }
            });
            $A.enqueueAction(action);
        },
    HandleNewBeatPal:function(component, event, helper) {
        debugger;
        component.set("v.ShowToCreateBeatPlanne",true);
    },
    HandleCancel:function(component, event, helper) {
        debugger;
        component.set("v.ShowToCreateBeatPlanne",false);
    },  
    HandleCreate:function(component, event, helper) {
        debugger;
        var TempArray=[{key:'January 2023',value:0},{key:'February 2023',value:1},{key:'March 2023',value:2},{key:'April 2023',value:3},{key:'May 2023',value:4},{key:'June 2023',value:5},
        {key:'July 2023',value:6},{key:'August 2023',value:7},{key:'September 2023',value:8},{key:'October 2023',value:9},{key:'November 2023',value:10},{key:'December 2023',value:11}];
        var SelectedMonth=component.get("v.selectedMonthNumber");
        var startDate=component.get("v.StartDatevalue");
        var EndDate=component.get("v.EndDatevalue");

        var action = component.get("c.GetAllMonthlyBeatPlanner");
        action.setParams({
            "StartDate":startDate,
             "LastDate":EndDate
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == 'SUCCESS') {
                component.set("v.ShowToCreateBeatPlanne",false);
            }else{
                component.set("v.ShowToCreateBeatPlanne",false);
            }
        });
        $A.enqueueAction(action);

    }
})