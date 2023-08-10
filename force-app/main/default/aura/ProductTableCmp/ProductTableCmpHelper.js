({
	getProducts : function(component, event) {
        var action = component.get("c.getProductList");
        
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                
                component.set("v.prodList", result);
            }
        });
        $A.enqueueAction(action);
    },
})