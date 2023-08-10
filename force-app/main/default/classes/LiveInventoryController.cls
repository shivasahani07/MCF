public class LiveInventoryController {
	@AuraEnabled
    public static List<Store_Inventory__c> getStoreInventoryList(){
        List<Store_Inventory__c> livInvList = new List<Store_Inventory__c>();
        livInvList = [Select Id,Name,is_Item_Available__c,Store__r.Name, Dealer_Product__r.Name,Dealer_Product__r.Product__r.Id, Dealer_Product__r.Product__r.Name,Dealer_Product__r.Product__r.ProductCode FROM Store_Inventory__c];
        return livInvList;
    }
}