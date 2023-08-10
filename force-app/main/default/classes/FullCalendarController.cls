public class FullCalendarController {
    @AuraEnabled
    public static List<Event> getEvents(){
        return [SELECT AccountId,EndDateTime,Id,StartDateTime,Subject FROM Event];
    }
    
    @AuraEnabled
    Public Static alldataWrapper BeetplannerDatareturn(){
        string MBPid='a8A0k000000Cpn5EAC';
        List<Monthly_Beat_Plan__c> MBPlist=[SELECT id,Year__c,Status__c,Start_Date__c,OwnerId,Sales_User__c,Name,Month__c,End_Date__c,(SELECT id,Year__c,Name,Week_Identifier__c,Start_Day_of_Week__c,End_Day_of_Week__c,OwnerId,Monthly_Beat_Plan__c,Week_Number__c FROM Weekly_Beat_Plans__r) FROM Monthly_Beat_Plan__c];
        system.debug('Monthly_Beat_Plan__c---------->'+MBPlist);
        List<Visit__c> getAllvisitRecordList = [Select Id,KPI_Target__r.Name,Account__c,Account__r.Name,Lead__c,Lead__r.Name,Start_Date_Time__c,Route__c,Route__r.Name,Visit_Status__c From Visit__c Where KPI_Target__c !=null AND MBPID__c =:MBPid];
        alldataWrapper sw = new alldataWrapper();
        sw.MBPlist=MBPlist;
        sw.visitRecList=getAllvisitRecordList;
        system.debug('----------sw'+sw);
        return sw;
        
    }
    
    class alldataWrapper {
        @AuraEnabled
        public List<Visit__c> visitRecList {get;set;}
        @AuraEnabled
        public List<Monthly_Beat_Plan__c> MBPlist {get; set;}
        //@AuraEnabled
        //Public integer totalvisitRecord {get; set;}
        //@AuraEnabled
        //Public integer totalCP {get; set;} 
        // @AuraEnabled
        // Public integer total {get; set;} 
    }
    
}