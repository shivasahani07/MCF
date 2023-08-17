({
    doInit : function(component, event, helper) { 
        debugger;
        var lat;
        var long;
        var userLocation = navigator.geolocation;
        if (userLocation) {
            userLocation.getCurrentPosition(function (position) {
               // lat = position.coords.latitude;
               // long = position.coords.longitude;
                 component.set("v.currentLatitude",position.coords.latitude);
                 component.set("v.currentLongitude",position.coords.longitude);
            });
        } 
        
        
        helper.getVisitRecord(component, event, helper);
        helper.getPastVisitRecord(component, event, helper);
        helper.getAccRelatedOppList(component, event, helper);
        helper.getRelatedInvoiceList(component, event, helper);
        helper.getRelatedCaseList(component, event, helper);
    },
    
    
    
    createTaskHanlde :  function(component, event, helper) {
        debugger;
        component.set("v.showCreateTask",true);
    },
    closeActivityCreate : function(component, event, helper) {
        debugger;
        component.set("v.showCreateTask",false);
    },
    closeBtn : function(component, event, helper) {
        debugger;
        component.set("v.showCreateTask",false);
        component.set("v.showCreateCallLogTask",false);
        component.set("v.showCreateCase",false);
        component.set("v.showOpportunityCreate",false);
    },
    onChangeHandlerStatus : function(component, event, helper) {
        debugger;
        var selPick = component.find('fieldStatus').get('v.value');
    },
    onChangeHandlerPriority : function(component, event, helper) {
        debugger;
        var selPick = component.find('fieldPrority').get('v.value');
    },
    onChangeHandlerCaseStatus : function(component, event, helper) {
        debugger;
        var selPick = component.find('fieldCaseStatus').get('v.value');
    },
    onChangeHandlerOppStage : function(component, event, helper) {
        debugger;
        var selPick = component.find('fieldOppStage').get('v.value');
    },
    createLogCallHanlde : function(component, event, helper) {
        debugger;
        component.set("v.showCreateCallLogTask",true);
    },
    closeCallLogCreate : function(component, event, helper) {
        debugger;
        component.set("v.showCreateCallLogTask",false);
    },
    createCaseHanlde : function(component, event, helper) {
        debugger;
        component.set("v.showCreateCase",true);
    },
    closeCaseHanlde : function(component, event, helper) {
        debugger;
        component.set("v.showCreateCase",false);
    },
    createOpportunityHandle : function(component, event, helper) {
        debugger;
        component.set("v.showOpportunityCreate",true);
    },
    closeOpportunityHandle : function(component, event, helper) {
        debugger;
        component.set("v.showOpportunityCreate",false);
    },
    saveTaskHandler : function(component, event, helper) {
        debugger;
        component.set("v.showCreateTask",false);
        var taskRecord = component.get('v.taskRec');
        var accId = component.get('v.accID');
        taskRecord.WhatId = accId;
        var action = component.get('c.saveTask');
        action.setParams({
            taskRec :  taskRecord
        });
        action.setCallback(this, function(response){
            if(response.getState() ==='SUCCESS'){
                alert('record Saved Successfully');
                component.set("v.showCreateTask",false);
            }else{
                alert(JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
    },
    saveLogCall : function(component, event, helper) {
        debugger;
        var today = new Date();
        var formattedDate = today.toISOString().slice(0, 10);
        var taskRecord = component.get('v.callRec');
        var accId = component.get('v.accID');
        taskRecord.WhatId = accId;
        taskRecord.Priority = 'Normal';
        taskRecord.ActivityDate = formattedDate;
        taskRecord.Status = 'Completed';
        var action = component.get('c.LogCall');
        action.setParams({
            taskRec :  taskRecord
        });
        action.setCallback(this, function(response){
            if(response.getState() ==='SUCCESS'){
                alert('record Saved Successfully');
                component.set("v.showCreateCallLogTask",false);
            }else{
                alert(JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
    },
    createOppHandle : function(component, event, helper) {
        debugger;
        component.set("v.showOpportunityCreate",false);
        var oppRecord = component.get('v.oppRec');
        var accId = component.get('v.accID');
        oppRecord.AccountId = accId;
        var action = component.get('c.saveOpportunity');
        action.setParams({
            oppRec :  oppRecord
        });
        action.setCallback(this, function(response){
            if(response.getState() ==='SUCCESS'){
                alert('record Saved Successfully');
                helper.getAccRelatedOppList(component, event, helper);
                
            }else{
                alert(JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
    },
    createCaseHandle : function(component, event, helper) {
        debugger;
        var caseRecord = component.get('v.caseRec');
        var accId = component.get('v.accID');
        caseRecord.AccountId = accId;
        caseRecord.Origin = 'Web';
        var action = component.get('c.saveCase');
        action.setParams({
            caseRec :  caseRecord
        });
        action.setCallback(this, function(response){
            if(response.getState() ==='SUCCESS'){
                alert('record Saved Successfully');
                helper.getRelatedCaseList(component, event, helper);
            }else{
                alert(JSON.stringify(response.getError()));
            }
            component.set("v.showCreateCase",false);
        });
        $A.enqueueAction(action);
    },
    
    checkInHandler : function(component, event, helper) {
        debugger;
        var lat;
        var long;
        var userLocation = navigator.geolocation;
        if (userLocation) {
            userLocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                if ((lat != null && lat != undefined && lat != '') && (long != null && long != undefined && long != '')) {
                    helper.CheckInVisithelper(component,lat, long);
                    // component.set("v.currentLatitude", lat);
                    // component.set("v.currentLongitude", long);
                }
            });
        } 
        
    },
    /*handleComponentEvent:function(component, event, helper){
        debugger;
        alert('event fired');
        var visitId = event.getParam("visitId"); 
        var accId = event.getParam("accId"); 
        component.set("v.visitId", visitId);
        var visitRecId = component.get('v.visitId');
        var action = component.get('c.getSelectedVisitDetails');
        action.setParams({
            visitId :  visitRecId
        });
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                var result = response.getReturnValue();
                component.set('v.visitRec', result);
                //component.set('v.accID', result.Account__c);
                var street = result.Account__r.BillingStreet;
                var city = result.Account__r.BillingCity;
                var state = result.Account__r.BillingState;
                var zipCode = result.Account__r.BillingPostalCode;
                var fullAddress = street + ', ' + city + ', ' + state+ '- ' + zipCode;
                component.set('v.accountAddress', fullAddress);
                window.setTimeout(
                    $A.getCallback(function() {
                       helper.callNavigation(component, event, helper,accId);
                    }),1000     
                );
            } 
            
        });
        $A.enqueueAction(action);
    },*/
    
    goBackOnePage : function(component, event, helper){
        debugger;
        //location.replace("https://sales-production--mfgcloud.sandbox.lightning.force.com/lightning/n/Field_Visit");
        //component.set('v.showTodaysTaskComponent',true);
        //component.set('v.showStartVisitComponent',false);
        
        var fieldVisitComponentEvent = component.getEvent("fieldVisitComponentEvent"); 
        
        fieldVisitComponentEvent.setParams({
            "showTodaysTaskComponent" : true,
            "showStartVisitComponent" : false
        }); 
        
        fieldVisitComponentEvent.fire(); 
    }
})