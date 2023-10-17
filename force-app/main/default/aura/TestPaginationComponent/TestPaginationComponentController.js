({
    doInit : function(component, event, helper) {
     debugger;
        helper.helperMethod(component);
    },

    handleNext : function(component, event, helper){
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber+1);
        helper.helperMethod(component, helper);
    },
    
    handlePrev : function(component, event, helper){
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber-1);
          helper.helperMethod(component, helper);
    },
})