public class DealerProductController {
	@AuraEnabled
    public static List<Dealer_Product__c> getDealerProductList(Integer pageSize, Integer pageNumber){
        Integer offset = (pageNumber - 1) * pageSize;
        List<Dealer_Product__c> dealerProdList = new List<Dealer_Product__c>();
        dealerProdList = [SELECT Id, Name,Dealer__r.Name,Product__r.Name,Product_Code__c FROM Dealer_Product__c LIMIT :pageSize OFFSET :offset];
        return dealerProdList;
    }
}