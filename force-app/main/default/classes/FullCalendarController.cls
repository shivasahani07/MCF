public class FullCalendarController {
    
    @AuraEnabled
    public static List<Event> getEvents(){
        return [SELECT AccountId,EndDateTime,Id,StartDateTime,Subject FROM Event];
    }
    
    @AuraEnabled
    Public Static alldataWrapper BeetplannerDatareturn(String month,string year){
        string MBPid;
        List<Monthly_Beat_Plan__c> MBPlist=[SELECT id,Year__c,Status__c,Start_Date__c,OwnerId,Sales_User__c,Name,Month__c,End_Date__c,(SELECT id,Year__c,Name,Week_Identifier__c,Start_Day_of_Week__c,End_Day_of_Week__c,OwnerId,Monthly_Beat_Plan__c,Week_Number__c FROM Weekly_Beat_Plans__r) FROM Monthly_Beat_Plan__c WHERE Month_year__c=:year AND Month_Name__c=:month];
        system.debug('Monthly_Beat_Plan__c---------->'+MBPlist);
        MBPid=MBPlist[0].Id;
        system.debug('MBPid----'+MBPid);
        List<Visit__c> getAllvisitRecordList = [Select Id,KPI_Target__r.Name,Account__c,Account__r.Name,Lead__c,Lead__r.Name,Start_Date_Time__c,Route__c,Route__r.Name,Visit_Status__c,Actual_visit_date__c,KPI_Target_Name__c From Visit__c Where (Account__c!=NUll or Lead__c !=Null) and MBPID__c =:MBPid];
        system.debug('getAllvisitRecordList-------'+getAllvisitRecordList);
        List<KPI_Target__c> getAllKpiTargetRecList  = [Select Id,Monthly_Beat_Plan__c,Roles_and_KPI__c from KPI_Target__c];

        alldataWrapper sw = new alldataWrapper();
        sw.MBPlist=MBPlist;
        sw.visitRecList=getAllvisitRecordList;
        sw.KpiTList=getAllKpiTargetRecList;
        system.debug('----------sw'+sw);
        return sw;
        
    }
    
    class alldataWrapper {
        @AuraEnabled
        public List<Visit__c> visitRecList {get;set;}
        @AuraEnabled
        public List<Monthly_Beat_Plan__c> MBPlist {get; set;}
        @AuraEnabled
        Public List<KPI_Target__c> KpiTList {get; set;}
        //@AuraEnabled
        //Public integer totalCP {get; set;} 
        // @AuraEnabled
        // Public integer total {get; set;} 
    }
    
}