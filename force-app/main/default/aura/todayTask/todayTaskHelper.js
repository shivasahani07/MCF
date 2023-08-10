({
    getVisitRecs : function(component, event, helper) {
        debugger;
        var helper = this;
        var today = new Date();
        var selectedDate = component.get('v.selectedDate');        
        // Get the year, month, and day from the Date object
        var year = today.getFullYear();
        var month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        var day = String(today.getDate()).padStart(2, '0');
        
        // Format the date in "YYYY-MM-DD" format
        var formattedDate = year + '-' + month + '-' + day;
        if(selectedDate != null && selectedDate != undefined){
            formattedDate = selectedDate;
        }
        component.set('v.selectedDate', formattedDate);
        var action = component.get('c.getAllVisitTodays');
        action.setParams({
            visitDate :  formattedDate
        });
        action.setCallback(this, function(response){ // AccountAddressList
            if(response.getState()==='SUCCESS'){
                var result = response.getReturnValue();
                if(result != null && result != undefined && result != ''){
                    if(result.visitList != null && result.visitList != undefined && result.visitList != ''){
                        component.set('v.taskList', result.visitList);
                        component.set('v.completedVisit', result.completedVisit); 
                        component.set('v.pendingVisit', result.pendingVisit);
                        if(result.dvpList != undefined && result.dvpList.length != 0){
                            component.set("v.ShowStartDay",true);
                            component.set("v.ShowEndDay",false);
                        }else{
                            component.set("v.ShowStartDay",false);
                            component.set("v.ShowEndDay",true);
                        }
                        
                        var objlocation = [];
                        var accountAddressOBj = [];
                        var  location = {Street : '',City:'',State:'',PostalCode : '',Country : ''}
                        for(var i=0;i<result.visitList.length;i++){
                            var dataccc = result.visitList[i].Account__r;
                            accountAddressOBj.push(dataccc);
                        }
                        component.set("v.AccountAddressList",accountAddressOBj);
                        var dataAddress = component.get("v.AccountAddressList");
                        for(var i=0;i<dataAddress.length;i++){
                            var tempLocat = {};
                            var LocationObj = {};
                            tempLocat.Street = dataAddress[i].BillingStreet;
                            tempLocat.City  = dataAddress[i].BillingCity;
                            tempLocat.State = dataAddress[i].BillingState;
                            tempLocat.PostalCode = dataAddress[i].BillingPostalCode;
                            tempLocat.Country = dataAddress[i].BillingCountry;
                            LocationObj.location = tempLocat;
                            objlocation.push(LocationObj);
                        }
                        component.set("v.AccountMapList",objlocation)
                        this.MapinitMethod(component, event, helper);
                    }
                    else{
                        this.showError(component, event, helper);
                        return;
                    }
                }
                else{
                    this.showError(component, event, helper);
                    return;
                }
            }else{
                console.log(JSON.stringify(response.getError()));
                this.showErrorMessage(component, event, helper);
                return;
            }
            
        });
        
        $A.enqueueAction(action);
    },
    
    MapinitMethod: function (component, event, helper) {
        debugger;
        component.set('v.mapMarkers',component.get("v.AccountMapList") );
        component.set('v.zoomLevel', 12);
    },
    showsuccessMessage : function (component, event, helper) {
        debugger;
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'SUCCESS',
            message: 'Your day has been successfully started !',
            duration:' 5000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
    },
    showErrorMessage : function (component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'ERROR',
            message:'Something went Wrong !',
            duration:' 5000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
    },
    StartVisitDayhelper : function (component, lat, long){
        debugger;
        var taskrecords = component.get("v.taskList");
        var action = component.get("c.StartDayVisitForVistitRecord");
        action.setParams({
            startLat: lat,
            startLang: long,
            visitRecList: taskrecords
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue(); 
                if(data !=null){
                    component.set("v.ShowStartDay",true);
                    component.set("v.ShowEndDay",false);
                }
                //this.showsuccessMessage(component, event);
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
    EndVisitDayhelper : function (component, lat, long){
        debugger;
        var visitId = 'a23N0000004Rt2KIAS';
        var action = component.get("c.updateEndDayVisitRecord");
        action.setParams({
            endLat: lat,
            endLong: long,
            dayvisitId : visitId
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                alert('Record is Created Successfully');
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
    
    showInfo : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Info',
            message: 'This is an information message.',
            duration:' 3000',
            key: 'info_alt',
            type: 'info',
            mode: 'dismissible'
        });
        toastEvent.fire();
    },
    showSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Success',
            message: 'Record created Successfully',
            duration:' 3000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
    },
    showError : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Error',
            message:'No Records To Display',
            duration:' 3000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
    },
    showWarning : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Warning',
            message: 'This is a warning message.',
            duration:' 3000',
            key: 'info_alt',
            type: 'warning',
            mode: 'sticky'
        });
        toastEvent.fire();
    }
    
    
})