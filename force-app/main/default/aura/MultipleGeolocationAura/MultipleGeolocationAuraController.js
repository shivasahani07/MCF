({
    doInit : function(component, event, helper) {
        debugger;
        var recordIdList = component.get("v.visitRecordId");
        var baseURL = 'https://sales-production--mfgcloud--c.sandbox.vf.force.com/apex/MultipleGeolocationVF?id='+recordIdList;
        console.log('baseURL === >'+baseURL);
        component.set("v.siteURL",baseURL);
        //  window.location.replace("https://sales-production--mfgcloud--c.sandbox.vf.force.com/apex/MultipleGeolocationVF?core.apexpages.request.devconsole=1");
    },
    
})