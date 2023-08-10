({
	loadDataToCalendar :function(component,data){      
        debugger;
        
            var ele = component.find('calendar').getElement();
            $(ele).fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                },
                defaultDate: '2023-08-08',
                editable: true,
                eventLimit: true,
                events:data
            });
        },

    tranformToFullCalendarFormat : function(component,events) {
        debugger;
        var eventArr = [];
        for(var i = 0;i < events.length;i++){
            eventArr.push({
                'id':events[i].Id,
                'start':events[i].Start_Date_Time__c,
                'end':events[i].Start_Date_Time__c,
                'title':events[i].Account__r.Name,
            });
        }
        return eventArr;
    },

    fetchEvents : function(component) {
        debugger
        var action = component.get("c.BeetplannerDatareturn"); 
        var self = this;
        var wrappersw;
        var weeklist=[];
        var visits=[];
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(component.isValid() && state === "SUCCESS"){
                wrappersw=response.getReturnValue();
                weeklist=wrappersw.MBPlist[0].Weekly_Beat_Plans__r;
                visits=wrappersw.visitRecList;
                for(var i = 0;i <weeklist.length;i++){
                    
                   
                }
                component.set("v.Weeklybp",weeklist);
                var eventArr = self.tranformToFullCalendarFormat(component,visits);
                self.loadDataToCalendar(component,eventArr);
                component.set("v.events",eventArr);
            }
        });

        $A.enqueueAction(action); 
    }, 
})