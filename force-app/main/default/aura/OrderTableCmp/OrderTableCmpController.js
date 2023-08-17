({
	doInit : function(component, event, helper) {
        debugger;
		helper.getOrders(component, event);
	},
    
    handleNext : function(component, event, helper) { 
        debugger;
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber+1);
        helper.getOrders(component, helper);
    },
     
    handlePrev : function(component, event, helper) {  
        debugger;
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber-1);
        helper.getOrders(component, helper);
    },
    
    accountselected : function(component, event, helper) {
        debugger;
    }
})