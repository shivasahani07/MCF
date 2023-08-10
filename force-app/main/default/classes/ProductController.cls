public class ProductController {
	@AuraEnabled
    public static List<Product2> getProductList(){
        List<Product2> prodList = new List<Product2>();
        prodList = [SELECT Id, Name,ProductCode FROM Product2];
        return prodList;
    }
}