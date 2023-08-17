({  
    doinit :  function(component, event, helper) {
        component.set('v.withoutlabel',true);
        component.set('v.withlabel',false);
    },
    
	toggleRightSidebar: function(component, event, helper) {
        component.set('v.right',false);
        component.set('v.left',true);
        component.set('v.withlabel',true);
        component.set('v.withoutlabel',false);
        
    },
    
    toggleLeftSidebar: function(component, event, helper) {
        component.set('v.left',false);
        component.set('v.right',true);
        component.set('v.withlabel',false);
        component.set('v.withoutlabel',true);
      
    },
    navigateMenuDetails : function(component,event,helper){
        component.set('v.menus',true);
        component.set('v.icons',true);
        component.set('v.dashBoard',false);
        component.set('v.dealerProduct',false);
        component.set('v.livInventory',false);
        component.set('v.order',false);
        component.set('v.invoice',false);
    },
    
    navigateDB : function(component, event, helper) {
        debugger;
       	
        component.set('v.dashBoard',true);
        component.set('v.dealerProduct',false);
        component.set('v.livInventory',false);
        component.set('v.order',false);
        component.set('v.invoice',false);
	},
    
    navigateProd : function(component, event, helper) {
        component.set('v.dashBoard',false);
        component.set('v.livInventory',false);
        component.set('v.order',false);
        component.set('v.invoice',false);
        component.set('v.dealerProduct',true);
	},
    
    navigateLivInv : function(component, event, helper) {
        component.set('v.dashBoard',false);
        component.set('v.dealerProduct',false);
        component.set('v.order',false);
        component.set('v.invoice',false);
        component.set('v.livInventory',true);
	},
    
    navigateOrd : function(component, event, helper) {
        component.set('v.dashBoard',false);
        component.set('v.dealerProduct',false);
        component.set('v.livInventory',false);
        component.set('v.invoice',false);
        component.set('v.order',true);
	},
    
    navigateInv : function(component, event, helper) {
        component.set('v.dashBoard',false);
        component.set('v.dealerProduct',false);
        component.set('v.livInventory',false);
        component.set('v.order',false);
        component.set('v.invoice',true);
	},
})