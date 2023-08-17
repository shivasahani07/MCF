public class Scheduler_Insight_MonthYear_handler {

    @AuraEnabled
    public static Monthly_Beat_Plan__c getMonthBeatPlan(String month,string year){
        Monthly_Beat_Plan__c getAllMBPList = [Select Id,Name,Sales_User__c,Sales_User__r.Name,CreatedDate,Month__c,Month_Name__c,Year__c,Status__c From Monthly_Beat_Plan__c Where Sales_User__c =: userInfo.getUserId() AND Month_year__c=:year AND Month_Name__c=:month LIMIT 1];
        System.debug('getAllMBPList ==>'+getAllMBPList.Sales_User__r.Name);
         System.debug('getAllMBPList ==>'+getAllMBPList);
        return getAllMBPList;
    }
}