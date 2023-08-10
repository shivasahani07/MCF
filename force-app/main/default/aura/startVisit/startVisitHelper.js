({
   /* simulateServerRequest: function (onResponse) {
        setTimeout(function () {
            var serverResponse = {
                selectedColorId: 2,
                colors: [
                    { id: 1, label: '--None--' },
                    { id: 2, label: 'Not Started'},
                    { id: 3, label: 'In Progress' },
                    { id: 4, label: 'Completed' }
                ]
            };

            onResponse.call(null, serverResponse);
        }, 2000);
    },*/
    
    getVisitRecord : function(component, event, helper){
        debugger;
        var visitRecId = 'a220k000000VO6WAAW';
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
    }
});