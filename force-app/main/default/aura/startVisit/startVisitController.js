({
    doInit : function(component, event, helper) { 
        debugger;
        helper.getVisitRecord(component, event, helper);
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
                component.set('v.taskRec', '');
            }else{
                alert(JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
    },
    
    /* saveLogCall : function(component, event, helper) {
        debugger;
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
            }else{
                alert(JSON.stringify(response.getError()));
            }
            component.set("v.showCreateCallLogTask",false);
        });
        $A.enqueueAction(action);
    },*/
    
    saveLogCall : function(component, event, helper) {
        debugger;
        /*const startDate = new Date();
            const newDate = new Date(startDate);
            newDate.setDate(startDate.getDate() + i);
            var formattedDate = newDate.toISOString().slice(0, 10);*/
            component.set("v.showCreateCallLogTask",false);
            var taskRecord = component.get('v.taskRec');
            var accId = component.get('v.accID');
            taskRecord.WhatId = accId;
            taskRecord.Priority = 'Normal';
            //taskRecord.ActivityDate = formattedDate;
            var action = component.get('c.saveLogCall');
            action.setParams({
                taskRec :  taskRecord
            });
            action.setCallback(this, function(response){
                if(response.getState() ==='SUCCESS'){
                    alert('record Saved Successfully');
                    component.set('v.taskRec', '');
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
            }else{
                alert(JSON.stringify(response.getError()));
            }
            component.set("v.showCreateCase",false);
        });
        $A.enqueueAction(action);
    },
})