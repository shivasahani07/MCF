public class InvoiceController {
	@AuraEnabled
    public static List<Invoices__c> getInvoiceList(Integer pageSize, Integer pageNumber, string accountId){
        Integer offset = (pageNumber - 1) * pageSize;
        List<Invoices__c> invList = new List<Invoices__c>();
        invList = [Select Id,Name,Invoice_Date__c,Due_Date__c,Status__c FROM Invoices__c WHERE Account__c=:accountId LIMIT :pageSize OFFSET :offset];
        return invList;
    }
}