public class BeatPlannerHelper {
    @auraEnabled
    Public Static List<Monthly_Beat_Plan__c> BeetplannerDatareturn(String month,string year){
        List<Monthly_Beat_Plan__c> MBPlist=[SELECT id,Year__c,Status__c,Start_Date__c,OwnerId,Sales_User__c,Name,Month__c,End_Date__c,Month_Name__c,(SELECT id,Year__c,Name,Week_Identifier__c,Start_Day_of_Week__c,End_Day_of_Week__c,OwnerId,Monthly_Beat_Plan__c FROM Weekly_Beat_Plans__r) FROM Monthly_Beat_Plan__c WHERE Month_year__c=:year AND Month_Name__c=:month];
        system.debug('Monthly_Beat_Plan__c---------->'+MBPlist);
        //userinfo.getName();
        return MBPlist;
        
        
    }
    //this method will be used in trigger to fill month name 
    Public static void updateMonthname(List<Monthly_Beat_Plan__c> updateMBp){
        for(Monthly_Beat_Plan__c mbp:updateMBp){
            Datetime now = mbp.Start_Date__c;
            String monthName = now.format('MMMM');
            String year = String.valueOf(now.year());
            mbp.Month_Name__c=monthName;
            mbp.Month_year__c=year;
        }
    }
    
}