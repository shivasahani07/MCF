public without sharing class TransferWarehouseProducts{
    

    @AuraEnabled(cacheable=true)
    public static List<sObject> getWarehouseMasterRecords(string searchKey,string recordId){
        List <sObject> returnList = new List <sObject> ();
        List<Clinic__c> ClinicRecodrd=new List<Clinic__c>();
        string sQuery;
        system.Debug('searchKey--'+searchKey);
        try{
            string sWildCardText = '%'+searchKey+'%'  ;
            system.Debug('sWildCardText--'+sWildCardText);
            if(searchKey==null){
                system.debug('First Query');
                ClinicRecodrd=[Select Id,Name,Active__c From Clinic__c Where Id!=:recordId AND Active__c=true];
            }else{
                system.debug(' Second Query');
                ClinicRecodrd=[Select Id,Name,Active__c From Clinic__c Where Name LIKE:sWildCardText AND Id!=:recordId AND Active__c=true];  
            }
            System.debug('returnList---->'+returnList);
            System.debug('ClinicRecodrd---->'+ClinicRecodrd);
            return ClinicRecodrd;
        }
        catch(Exception e){
            System.debug('Exception--->'+e.getMessage());
            System.debug('Exception--->'+e.getLineNumber());
            return ClinicRecodrd;
        }
    } 
}