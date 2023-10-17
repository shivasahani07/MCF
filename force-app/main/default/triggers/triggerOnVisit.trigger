trigger triggerOnVisit on Visit__c (before insert, after insert) {
    if(trigger.isInsert && trigger.isAfter){
        visitTriggerHelper.CreateDocumentCategories(trigger.new);
    }
}