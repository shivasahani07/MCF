({
      
	afterScriptsLoaded: function(component,event ,helper){
        debugger;
        var events = component.get("v.events");
        console.log('events--------IN',events);
        if(!events.length)
        {
            helper.fetchEvents(component);
        }
    }
    
    
})