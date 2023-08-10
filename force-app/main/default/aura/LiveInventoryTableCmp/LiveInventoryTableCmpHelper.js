({
	getStoreInventory : function(component, event) {
        debugger;
		var action = component.get("c.getStoreInventoryList");
        
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var result = response.getReturnValue();
                component.set("v.livInvList",result);
            }
        });
        $A.enqueueAction(action);
	}
})