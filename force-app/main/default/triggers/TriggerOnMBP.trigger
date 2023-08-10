trigger TriggerOnMBP on Monthly_Beat_Plan__c (before insert) {
    if(trigger.isInsert && trigger.isBefore){
        BeatPlannerHelper.updateMonthname(trigger.new);
    }
}