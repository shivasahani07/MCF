({
	helperMethod : function(component) {
		var action = component.get('c.getAllDateOfSchdeularSight');
        var pageSize = component.get("v.pageSize").toString();
        var pageNumber = component.get("v.pageNumber").toString();
         action.setParams({
            "pageSize" : pageSize,
            "pageNumber" : pageNumber
        });
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                var data = response.getReturnValue();
                if (data.visitRecList != null && data.visitRecList.length > 0) {
                    component.set("v.visitList", data.visitRecList);
                }
                if(data.LeadRecList !=null && data.LeadRecList.length >0){
                    component.set("v.LeadList",data.LeadRecList);
                }
            }
        });
        $A.enqueueAction(action);
	},
})