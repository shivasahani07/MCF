trigger TriggerOnDocumentCategory on Documents_Attachment__c (before insert,after insert) {
    if(trigger.isInsert && trigger.isAfter){
        TriggerOnDocumentCategoryheler.updateActiveFieldAfterInsert(trigger.new);
    }
	
}