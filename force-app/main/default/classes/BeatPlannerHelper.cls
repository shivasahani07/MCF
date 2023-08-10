public class BeatPlannerHelper {
    @auraEnabled
    Public Static List<Monthly_Beat_Plan__c> BeetplannerDatareturn(){
        List<Monthly_Beat_Plan__c> MBPlist=[SELECT id,Year__c,Status__c,Start_Date__c,OwnerId,Sales_User__c,Name,Month__c,End_Date__c,(SELECT id,Year__c,Name,Week_Identifier__c,Start_Day_of_Week__c,End_Day_of_Week__c,OwnerId,Monthly_Beat_Plan__c FROM Weekly_Beat_Plans__r) FROM Monthly_Beat_Plan__c];
        system.debug('Monthly_Beat_Plan__c---------->'+MBPlist);
        return MBPlist;
        
        
    }
    //this method will be used in trigger to fill month name 
    Public static void updateMonthname(List<Monthly_Beat_Plan__c> updateMBp){
        Datetime now = Datetime.now();
        String monthName = now.format('MMMM');
        String year = String.valueOf(now.year());
        for(Monthly_Beat_Plan__c mbp:updateMBp){
            mbp.Month_Name__c=monthName;
        }
    }
    
}