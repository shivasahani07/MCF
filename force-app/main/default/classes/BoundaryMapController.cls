public class BoundaryMapController {
    public String selectedCity { get; set; }
    
    public BoundaryMapController() {
        selectedCity = ApexPages.currentPage().getParameters().get('cityName');
        if (String.isBlank(selectedCity)) {
            selectedCity = 'Delhi'; // Default to Delhi if no city is specified
        }
    }
}