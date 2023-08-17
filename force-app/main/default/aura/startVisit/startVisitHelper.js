({
    getVisitRecord : function(component, event, helper){
        debugger;
        var visitRecId = component.get('v.visitId');
        //var visitRecId = 'a220k000000VO41AAG';
        var action = component.get('c.getSelectedVisitDetails');
        action.setParams({
            visitId :  visitRecId
        });
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                var result = response.getReturnValue();
                component.set('v.visitRec', result);
                component.set('v.accID', result.Account__c);
                var street = result.Account__r.BillingStreet;
                var city = result.Account__r.BillingCity;
                var state = result.Account__r.BillingState;
                var zipCode = result.Account__r.BillingPostalCode;
                var fullAddress = street + ', ' + city + ', ' + state+ '- ' + zipCode;
                component.set('v.accountAddress', fullAddress);
            } 
            
        });
        $A.enqueueAction(action);
    },
    
    getPastVisitRecord : function(component, event, helper){
        debugger;
        var accountId = component.get('v.accID');
        var action = component.get('c.getPastVisitDetails');
        action.setParams({
            accId : accountId 
        });
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                var result = response.getReturnValue();
                component.set('v.pastVisitList', result);
            } 
            
        });
        $A.enqueueAction(action);
    },
    
        getAccRelatedOppList : function(component, event, helper){
        debugger;
            var accountId = component.get('v.accID');
        var action = component.get('c.getRelOppList');
            action.setParams({
                accId : accountId
            });
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                var result = response.getReturnValue();
                component.set('v.relOppList', result);
            } 
            
        });
        $A.enqueueAction(action);
    },
    
    getRelatedInvoiceList : function(component, event, helper){
        debugger;
            var accountId = component.get('v.accID');
        var action = component.get('c.getRelInvoiceList');
            action.setParams({
                accId : accountId
            });
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                var result = response.getReturnValue();
                component.set('v.relInvoicesList', result);
            } 
            
        });
        $A.enqueueAction(action);
    },
    
    getRelatedCaseList : function(component, event, helper){
        debugger;
            var accountId = component.get('v.accID');
        var action = component.get('c.getRelCaseList');
            action.setParams({
                accId : accountId
            });
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                var result = response.getReturnValue();
                component.set('v.relCaseList', result);
            } 
            
        });
        $A.enqueueAction(action);
    },
    
    CheckInVisithelper : function(component,lat,long){
        debugger;
        var action = component.get("c.checkInVisitUpdate");
        action.setParams({
            checkInLat: lat,
            checkInLang: long
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue(); 
                if(data !=null){
                    component.set("v.ShowCheckInButton",true);
                    component.set("v.ShowCheckOutButton",false);
                }
                alert('Check In Done Successfully');
            } else if (state === "ERROR") {
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert(errors[0].message);
                    }
                }
            } else if (state === "INCOMPLETE") {
                alert('No response from server or client is offline.');
            }
        })
        $A.enqueueAction(action);
    },
    callNavigation:function(component,event,helper,accId){
        debugger;
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": accId,
            "slideDevName": "related"
        });
        navEvt.fire();
    }

});