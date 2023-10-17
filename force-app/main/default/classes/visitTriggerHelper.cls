public class visitTriggerHelper {
	 public static void CreateDocumentCategories(List<Visit__c> visitList){
        String document_cat = [select Category_Names__c from Document_Categories__c WHERE Name = 'Visit__c'].Category_Names__c;
        List<String> document_cat_list = document_cat.split(',');
        List<Document_Category__c> DocCatListToBeInserted = new List<Document_Category__c>();
        for(Visit__c acc : visitList){
            for(String doccat:document_cat_list){
                Document_Category__c doc_cat = new Document_Category__c();
                doc_cat.Name = doccat;
                doc_cat.Visit__c = acc.Id;
                DocCatListToBeInserted.add(doc_cat);
            } 
        }
        insert DocCatListToBeInserted;
    }
}