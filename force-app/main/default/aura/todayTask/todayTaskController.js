({
    doInit: function (component, event, helper) {
        debugger;
        helper.getVisitRecs(component, event, helper); 
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var today = new Date;
        var dateYear = today.toLocaleTimeString('en-us', { year: 'numeric' }).split(' ')[0].replaceAll(',', '');
        var dateMonth = today.toLocaleTimeString('en-us', { month: 'long' }).split(' ')[0].replaceAll(',', '');
        var dateDay = today.toLocaleTimeString('en-us', { day: 'numeric' }).split(' ')[0].replaceAll(',', '');
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        var prnDt = today.toLocaleTimeString('en-us', { weekday: 'long' }).split(' ')[0].replaceAll(',', '');
        var MonthName=monthNames[today.getMonth()].slice(0,3);
        
        component.set('v.dateDay', dateDay);
        component.set('v.dateYear', dateYear);
        component.set('v.dateMonth', dateMonth);
        component.set('v.day', prnDt);
        
        /*var numDaysInMonth;
        
        if (dateYear % 400 == 0) {
            if(dateMonth == 01 || dateMonth == 03 || dateMonth == 05 || dateMonth == 07 || dateMonth == 08 || dateMonth == 10 || dateMonth == 12){
                numDaysInMonth = 31;
            } else if(dateMonth == 02){
                numDaysInMonth = 29;
            }else{
                numDaysInMonth = 30;
            }
        }
        else if (dateYear % 100 == 0) {
            if(dateMonth == 01 || dateMonth == 03 || dateMonth == 05 || dateMonth == 07 || dateMonth == 08 || dateMonth == 10 || dateMonth == 12){
                numDaysInMonth = 31;
            } else if(dateMonth == 02){
                numDaysInMonth = 28;
            }else{
                numDaysInMonth = 30;
            }
        }
            else if (dateYear % 4 == 0) {
                if(dateMonth == 01 || dateMonth == 03 || dateMonth == 05 || dateMonth == 07 || dateMonth == 08 || dateMonth == 10 || dateMonth == 12){
                    numDaysInMonth = 31;
                } else if(dateMonth == 02){
                    numDaysInMonth = 29;
                }else{
                    numDaysInMonth = 30;
                }
            }
                else {
                    if(dateMonth == 01 || dateMonth == 03 || dateMonth == 05 || dateMonth == 07 || dateMonth == 08 || dateMonth == 10 || dateMonth == 12){
                        numDaysInMonth = 31;
                    } else if(dateMonth == 02){
                        numDaysInMonth = 28;
                    }else{
                        numDaysInMonth = 30;
                    }
                }*/
        
        const startDate = new Date(); // You can replace this with your start date
        const numDays = 7; // Number of days to show in the top bar
        const dates = [];
        
        for (let i = 0; i < numDays; i++) {
            const newDate = new Date(startDate);
            newDate.setDate(startDate.getDate() + i);
            var dateObj = {day:'', fullDate:'', month:''};
            dateObj.fullDate = newDate.toISOString().slice(0, 10);
            dateObj.day = newDate.toISOString().slice(8,10);
            dateObj.month = MonthName;
            dates.push(dateObj);
        }
        
        component.set("v.dates", dates);
        
        
    },
    
    handleDateSelect: function (component, event, helper) {
        debugger;
        const selectedDate = event.currentTarget.dataset.date;
        component.set("v.selectedDate", selectedDate);
        helper.getVisitRecs(component, event, helper); 
    },
    
    
    handleAmend: function (component, event, helper) {
        debugger;
        var buttonId =event.getSource().get("v.name");
        component.set("v.selectedVisitPlanedId",buttonId);
        component.set("v.ShowAmedVistPop",true);
        var action = component.get('c.getSelectedVisitDetails');
        action.setParams({
            visitId : buttonId
        });
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var result = response.getReturnValue();
                component.set('v.visitRec', result);
            } 
        });
        $A.enqueueAction(action);
    },
    handleStartVisit: function (component, event, helper) {
        debugger;
        var record = event.getSource().get('v.value');
        var recordId = record.Account__c;
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
            "slideDevName": "related"
        });
        navEvt.fire();
    },
    
    getActualVistiDateChange : function (component, event, helper) {
        debugger;
        var selVisitDate = component.find('auraidActialVisitdate').get('v.value');
        component.set("v.visitPlanedDate",selVisitDate);
        var visitDescription = component.find('visitDescription').get('v.value');
        component.set("v.visitDescription",visitDescription);
    },
    
    StartVisitDay: function (component, event, helper) {
        debugger;
        var lat;
        var long;
        var userLocation = navigator.geolocation;
        if (userLocation) {
            userLocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                if ((lat != null && lat != undefined && lat != '') && (long != null && long != undefined && long != '')) {
                    helper.StartVisitDayhelper(component,lat, long);
                    component.set("v.currentLatitude", lat);
                    component.set("v.currentLongitude", long);
                }
            });
        } 
    },
    EndVisitDay : function (component, event, helper) {
        debugger;
        var lat;
        var long;
        var userLocation = navigator.geolocation;
        if (userLocation) {
            userLocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                if ((lat != null && lat != undefined && lat != '') && (long != null && long != undefined && long != '')) {
                    helper.EndVisitDayhelper(component,lat, long);
                    component.set("v.currentLatitude", lat);
                    component.set("v.currentLongitude", long);
                }
            });
        }
    },
    closeModelPop : function (component, event, helper) {
        component.set("v.ShowAmedVistPop",false);
    },
    updateVisitHandler : function (component, event, helper) {
        debugger;
        var visitRecord = component.get("v.visitRec");
        var visitRecId = visitRecord.Id;
        var action = component.get("c.updateAmendVisitRecord");
        action.setParams({
            visitRec : visitRecord
        });
        action.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                var data = response.getReturnValue();
                if(data !=null){
                    alert("SUCCESS");            }
            }
        });
        $A.enqueueAction(action);
    }
    
})