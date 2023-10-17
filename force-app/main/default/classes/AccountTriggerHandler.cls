public class AccountTriggerHandler {
	static AccountTriggerHandler accTriggerHandler;
    public static AccountTriggerHandler getInstance(){
        if(accTriggerHandler==null)
            accTriggerHandler = new AccountTriggerHandler();
        return accTriggerHandler;
    }
    
    
    public void afterInsert(Map<Id,Account> accMap){
        Explorer_Configuration__c  accDocConfig = Explorer_Configuration__c.getValues('Account');
        String accFoldersString = accDocConfig.Folders__c;
        
        List<String> accFolders = accFoldersString.split(';');
        
        List<Folder__c> folders = new List<Folder__c>();
        
        for(Account acc : accMap.values()){
            for(String fName : accFolders){
                Folder__c folder = new Folder__c(Name=fName, Account__c = acc.Id);
                folders.add(folder);
            }
        }
        
        if(!folders.isEmpty()){
         	insert folders; 
        }
    }
    
        public void CreateDocumentCategories(List<Account> accList){
        String document_cat = [select Category_Names__c from Document_Categories__c WHERE Name = 'Account'].Category_Names__c;
        List<String> document_cat_list = document_cat.split(',');
        List<Document_Category__c> DocCatListToBeInserted = new List<Document_Category__c>();
        for(Account acc : accList){
            for(String doccat:document_cat_list){
                Document_Category__c doc_cat = new Document_Category__c();
                doc_cat.Name = doccat;
                doc_cat.Deal__c = acc.Id;
                DocCatListToBeInserted.add(doc_cat);
            } 
        }
        insert DocCatListToBeInserted;
    }
}