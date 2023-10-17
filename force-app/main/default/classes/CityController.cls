public class CityController {
    // Property to store the city name
    public String cityName { get; set; }

    // Constructor for the controller
    public CityController() {
        // Retrieve the city parameter from the URL
        cityName = ApexPages.currentPage().getParameters().get('Faridabad');
    }
}