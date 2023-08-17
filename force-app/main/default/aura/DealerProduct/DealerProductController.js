({
	doInit : function(component, event, helper) {
		helper.getDealerProducts(component, event);
	},
    
    handleNext : function(component, event, helper) { 
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber+1);
        helper.getDealerProducts(component, helper);
    },
     
    handlePrev : function(component, event, helper) {        
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber-1);
        helper.getDealerProducts(component, helper);
    },
})