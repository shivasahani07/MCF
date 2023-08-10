({
    getCardData: function(component) {
        // Sample data for demonstration purposes
        var cardData = [
            { Title: 'Total Prospects', Description: '600' ,cl: '#FFC300' ,Padding: '2%', View: 'View' ,listviewId: '00BN0000008KOYlMAO', wi:'70%' ,ml:'14%' ,br:'8px' ,mr:'-1%'},
            { Title: 'Existing To Business', Description: '100' ,cl: '#3498DB' ,Padding: '2%' ,View: 'View' ,listviewId: '00B0k000002cOcgEAE',wi:'70%' ,ml:'14%' ,br:'8px' ,mr:'0%'},
            { Title: 'New To Business', Description: '50' ,cl: '#27AE60' ,Padding: '2%' ,View: 'View' ,listviewId: '00B0k000002cOclEAE',wi:'70%' ,ml:'14%' ,br:'8px' ,mr:'0%'},
            { Title: 'Lost Clients', Description: '6' ,cl: '#E74C3C' ,Padding: '2%' ,View: 'View' ,listviewId: '00B0k000002cOcqEAE',wi:'70%' ,ml:'14%' ,br:'8px' ,mr:'-1%'}
        ];
        // Set the data in the component attribute
        component.set('v.cardData', cardData);
    }
})