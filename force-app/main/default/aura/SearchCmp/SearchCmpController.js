({
	doInit: function (component, evt, helper) {
      debugger;   
    },
    
    onChange1: function (component, evt, helper) {
        debugger;
        var selectedLimit = component.find('searchField').get('v.value');
        component.set('v.searchKeyword', selectedLimit);
        helper.SearchHelper(component, event);
    }
})