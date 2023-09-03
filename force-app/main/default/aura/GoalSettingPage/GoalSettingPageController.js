({
	doInit : function(component, event, helper) {
        debugger;
        var accId = component.get("v.accIdForChild");
		helper.goalSetting(component, event);
	},
    
    handleNext : function(component, event, helper) { 
        debugger;
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber+1);
        helper.goalSetting(component, helper);
    },
     
    handlePrev : function(component, event, helper) {  
        debugger;
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber-1);
        helper.goalSetting(component, helper);
    },
})