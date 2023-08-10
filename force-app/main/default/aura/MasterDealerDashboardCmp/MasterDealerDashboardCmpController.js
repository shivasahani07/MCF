({
	navigate : function(component, event, helper) {
        var navigateEvent = $A.get("e.force:navigateToComponent");
        navigateEvent.setParams({
            componentDef:"c:CompTwo"
        });
        navigateEvent.fire();
	},
    
    navigateDB : function(component, event, helper) {
        debugger;
        component.set('v.dashBoard',true);
        component.set('v.product',false);
        component.set('v.livInventory',false);
        component.set('v.order',false);
        component.set('v.invoice',false);
	},
    
    navigateProd : function(component, event, helper) {
        component.set('v.dashBoard',false);
        component.set('v.livInventory',false);
        component.set('v.order',false);
        component.set('v.invoice',false);
        component.set('v.product',true);
	},
    
    navigateLivInv : function(component, event, helper) {
        component.set('v.dashBoard',false);
        component.set('v.product',false);
        component.set('v.order',false);
        component.set('v.invoice',false);
        component.set('v.livInventory',true);
	},
    
    navigateOrd : function(component, event, helper) {
        component.set('v.dashBoard',false);
        component.set('v.product',false);
        component.set('v.livInventory',false);
        component.set('v.invoice',false);
        component.set('v.order',true);
	},
    
    navigateInv : function(component, event, helper) {
        component.set('v.dashBoard',false);
        component.set('v.product',false);
        component.set('v.livInventory',false);
        component.set('v.order',false);
        component.set('v.invoice',true);
	},
})