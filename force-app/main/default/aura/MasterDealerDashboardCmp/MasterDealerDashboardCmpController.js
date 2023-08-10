({
	navigate : function(component, event, helper) {
        var navigateEvent = $A.get("e.force:navigateToComponent");
        navigateEvent.setParams({
            componentDef:"c:CompTwo"
        });
        navigateEvent.fire();
	},
    
    navigateDB : function(component, event, helper) {
        var navigateEvent = $A.get("e.force:navigateToComponent");
        navigateEvent.setParams({
            componentDef:"c:DealerDashboardCmp"
        });
        navigateEvent.fire();
	},
    
    navigateProd : function(component, event, helper) {
        var navigateEvent = $A.get("e.force:navigateToComponent");
        navigateEvent.setParams({
            componentDef:"c:ProductTableCmp"
        });
        navigateEvent.fire();
	},
    
    navigateLivInv : function(component, event, helper) {
        var navigateEvent = $A.get("e.force:navigateToComponent");
        navigateEvent.setParams({
            componentDef:"c:LiveInventoryTableCmp"
        });
        navigateEvent.fire();
	},
    
    navigateOrd : function(component, event, helper) {
        var navigateEvent = $A.get("e.force:navigateToComponent");
        navigateEvent.setParams({
            componentDef:"c:OrderTableCmp"
        });
        navigateEvent.fire();
	},
    
    navigateInv : function(component, event, helper) {
        var navigateEvent = $A.get("e.force:navigateToComponent");
        navigateEvent.setParams({
            componentDef:"c:InvoiceTableCmp"
        });
        navigateEvent.fire();
	},
})