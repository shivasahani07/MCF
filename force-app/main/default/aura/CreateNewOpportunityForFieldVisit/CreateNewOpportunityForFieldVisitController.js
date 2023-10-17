({
	navigate : function(component, event, helper) {
         var navService = component.find("navService");
     
        var pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'list'
            },
            
        };
        navService.navigate(pageReference);
    }
})