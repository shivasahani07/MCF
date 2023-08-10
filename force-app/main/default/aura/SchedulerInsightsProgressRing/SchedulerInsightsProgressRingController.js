({
    init: function(component, event, helper) {
        // Sample data for demonstration purposes
        var progressData = [
            { title: 'Site Visit', progress: 50 ,cl:'#7DC37D' },
            { title: 'CP Visit', progress: 75 ,cl:'#FFBB46' },
            { title: 'New Partner', progress: 10 ,cl:'#B7AAFF' },
            { title: 'Other KPI', progress: 90 ,cl:'#D5A9FF' }
        ];
        component.set('v.progressData', progressData);
    }
})