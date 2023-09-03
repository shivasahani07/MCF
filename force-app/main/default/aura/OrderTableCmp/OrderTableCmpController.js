({
	doInit : function(component, event, helper) {
        debugger;
        var accId = component.get("v.accIdForChild");
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
    
    newOrder : function(component,event,helper){
        debugger;
         var modalFade1 = component.find('eventPopId');    
        component.find("eventPopId").submitDR(modalFade1);
    },
    
    orderDetail : function(component, event, helper) {
        debugger;
        var navigateEvent = $A.get("e.force:navigateToComponent");
        navigateEvent.setParams({
            componentDef: "c:OrderDetailsCmp"
            //You can pass attribute value from Component1 to Component2
            //componentAttributes :{ }
        });
        navigateEvent.fire();  
    }
})