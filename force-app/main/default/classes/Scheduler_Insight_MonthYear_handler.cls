public class Scheduler_Insight_MonthYear_handler {

    @AuraEnabled
    public static Monthly_Beat_Plan__c getMonthBeatPlan(){
        Monthly_Beat_Plan__c getAllMBPList = [Select Id,Name,Sales_User__c,Sales_User__r.Name,CreatedDate From Monthly_Beat_Plan__c Where Sales_User__c =: userInfo.getUserId() LIMIT 1];
        System.debug('getAllMBPList ==>'+getAllMBPList.Sales_User__r.Name);
        return getAllMBPList;
    }
}