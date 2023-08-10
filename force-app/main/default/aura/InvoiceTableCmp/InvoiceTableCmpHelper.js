({
	getInvoices : function(component, event) {
		var action = component.get("c.getInvoiceList");
        
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var result = response.getReturnValue();
                component.set("v.invList",result);
            }
        });
        $A.enqueueAction(action);
	}
})