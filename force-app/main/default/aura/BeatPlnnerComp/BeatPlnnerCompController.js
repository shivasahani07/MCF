({
    doinit : function(component ,event ,helper) {
        debugger;
        var Wrapper=[];
        var MPlist=[];
        var KPIrecord=[];
        var VisitRecord=[];
        var action = component.get("c.BeetplannerDatareturn");
        action.setParams({ firstName : component.get("v.firstName") });
        
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                MPlist=response.getReturnValue();
                //alert("From server: " + );
                component.set("v.Weeklybp",MPlist);
                
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
    },
    parentComponentEvent:function(component ,event ,helper) {
        debugger;
        var Month = event.getParam("Month");
        var Year = event.getParam("Year"); 
        component.set("v.selectedMonth",Month);
        component.set("v.selectedYear",Year);
        component.set("v.ShowToCreateMonthlyBeatPlan",true);
        //Set the handler attributes based on event data 
        var action = component.get("c.BeetplannerDatareturn");
        action.setParams({ 
            month : Month,
            year:Year
        });
        
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                MPlist=response.getReturnValue();
                //alert("From server: " + );
                component.set("v.Weeklybp",MPlist);
                
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