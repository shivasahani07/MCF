({
    doInit : function(component,event,helper){
        debugger;
        helper.getStageNameHelper(component, event, helper);    
    },
    
    statusPicklistSelect : function(component,event,helper){
        debugger;
        var stepName = event.getParam("detail").value;
        alert('stepName'+stepName);
        component.set("v.statusField.Status",stepName);
        
        component.find("record").saveRecord($A.getCallback(function(response){
             if (response.state === "SUCCESS") {
                $A.get('e.force:refreshView').fire();
            }
        }));
    },
})