({
    loadDataToCalendar :function(component,data){  
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day}`;
        debugger;
        
        var ele = component.find('calendar').getElement();
        $(ele).fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultDate:formattedDate,
            editable: true,
            eventLimit: true,
            events:data,
            drop: function(info) {
                var draggedEvent = JSON.parse(info.draggedEl.getAttribute('data-event'));
                var date = info.date;  
                var newEvent = {
                    id: draggedEvent.id,
                    title: draggedEvent.title,
                    start: date
                };
                calendar.addEvent(newEvent);
                
            }
        });
    },
    
    tranformToFullCalendarFormat : function(component,events) {
        debugger;
        var eventArr = [];
        for(var i = 0;i < events.length;i++){
            eventArr.push({
                'id':events[i].Id,
                'start':events[i].Actual_visit_date__c,
                'end':events[i].Actual_visit_date__c,	
                'title':events[i].Account__r.Name+' >'+events[i].KPI_Target_Name__c,
            });
        }
        return eventArr;
    },
    
    fetchEvents : function(component) {
        debugger
        var Month = component.get("v.month");
        var Year = component.get("v.year"); 
        //Set the handler attributes based on event data 
        var action = component.get("c.BeetplannerDatareturn");
        action.setParams({ 
            month : Month,
            year:Year
        });
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
    
    eventClick: function(info) {
        var clickedEvent = info.event;
        var start = clickedEvent.start;
        
        // Open a modal
        var modal = component.find('eventModal');
        var modalComponent = modal || component;
        modalComponent.set('v.startDate', start);
        modalComponent.set('v.isModalOpen', true);
    },
    setupDragAndDrop: function(component, event, helper) {
        var draggableEvent = component.find('draggableEvent').getElement();
        var calendarEl = component.find('calendar').getElement();
        
        draggableEvent.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', ''); // Required for dragging
        });
        
        calendarEl.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        calendarEl.addEventListener('drop', function(e) {
            e.preventDefault();
            
            // Get the dropped coordinates on the calendar
            var x = e.clientX - calendarEl.getBoundingClientRect().left;
            var y = e.clientY - calendarEl.getBoundingClientRect().top;
            
            // Convert coordinates to a FullCalendar date
            var date = calendar.getDateFromEl(x, y);
            
            // Create a new event at the dropped date and time
            var eventData = {
                title: 'New Event',
                start: date,
                allDay: false
            };
            
            // Add the new event to the FullCalendar
            calendar.addEvent(eventData);
        });
    },
    setupDragAndDrop: function(component, event, helper) {
        debugger;
        var draggableEvent = component.find('draggableEvent').getElement();
        var calendarEl = component.find('calendar').getElement();
        
        draggableEvent.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', ''); // Required for dragging
        });
        
        calendarEl.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        calendarEl.addEventListener('drop', function(e) {
            e.preventDefault();
            
            // Get the dropped coordinates on the calendar
            var x = e.clientX - calendarEl.getBoundingClientRect().left;
            var y = e.clientY - calendarEl.getBoundingClientRect().top;
            
            // Convert coordinates to a FullCalendar date
            var date = calendar.getDateFromEl(x, y);
            
            // Create a new event at the dropped date and time
            var eventData = {
                title: 'New Event',
                start: date,
                allDay: false
            };
            
            // Add the new event to the FullCalendar
            calendar.addEvent(eventData);
        });
    },
    
    
})