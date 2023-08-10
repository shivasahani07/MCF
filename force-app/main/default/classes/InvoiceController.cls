public class InvoiceController {
	@AuraEnabled
    public static List<Invoices__c> getInvoiceList(){
        List<Invoices__c> invList = new List<Invoices__c>();
        invList = [Select Id,Name,Invoice_Date__c,Due_Date__c,Status__c FROM Invoices__c];
        return invList;
    }
}