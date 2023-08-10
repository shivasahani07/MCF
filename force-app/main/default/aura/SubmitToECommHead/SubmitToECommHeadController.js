({
    doInit : function(component, event, helper) {
        debugger;
        var action = component.get("c.submitForApproval");
        action.setParams({
            "caseId": component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS"){
                var serverResponse = response.getReturnValue();
                if(serverResponse == 'SUCCESS'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Success',
                        message: 'Approval Process has been initiated successfully!',
                        duration:' 5000',
                        key: 'info_alt',
                        type: 'success',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
                else if(serverResponse == 'Pending'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Warning',
                        message: 'Either an Approval process was initiated earlier / current Lead is in Approval Process.',
                        duration:' 5000',
                        key: 'info_alt',
                        type: 'warning',
                        mode: 'sticky'
                    });
                    toastEvent.fire();
                }
            } else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'error',
                    message: response.getState(),
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
            }    
            var dismissActionPanel = $A.get("e.force:closeQuickAction");
            dismissActionPanel.fire();
            $A.get('e.force:refreshView').fire();
        });
        $A.enqueueAction(action);	
    },
})