public class TriggerOnDocumentCategoryheler {
    public static void mapActivefor(List<Documents_Attachment__c> dm){
        Map<Id, Documents_Attachment__c> latestAttachmentsMap = new Map<Id, Documents_Attachment__c>();
        
        // Query the latest Documents_Attachments__c for each Document_Category__c
        for (Documents_Attachment__c attachment : [SELECT Id, Name, Document_Category__c, CreatedDate
                                                    FROM Documents_Attachment__c
                                                    WHERE Active__c = true
                                                    ORDER BY Document_Category__c, CreatedDate DESC]) {
                                                        if (!latestAttachmentsMap.containsKey(attachment.Document_Category__c)) {
                                                            latestAttachmentsMap.put(attachment.Document_Category__c, attachment);
                                                        }
                                                    }
        
        // Update the Active__c field based on the latest Documents_Attachments__c
        List<Documents_Attachment__c> attachmentsToUpdate = new List<Documents_Attachment__c>();
        for (Documents_Attachment__c latestAttachment : latestAttachmentsMap.values()) {
            attachmentsToUpdate.add(new Documents_Attachment__c(
                Id = latestAttachment.Id,
                Active__c = true
            ));
        }
        
        // Set Active__c to false for other Documents_Attachments__c related to the same Document_Category__c
        for (Documents_Attachment__c attachment : [SELECT Id, Active__c
                                                    FROM Documents_Attachment__c
                                                    WHERE Document_Category__c IN :latestAttachmentsMap.keySet()
                                                    AND Id NOT IN :latestAttachmentsMap.values()]) {
                                                        attachmentsToUpdate.add(new Documents_Attachment__c(
                                                            Id = attachment.Id,
                                                            Active__c = false
                                                        ));
                                                    }
        
        // Perform the update
        update attachmentsToUpdate;
        
    }
    
    public static void updateActiveFieldAfterInsert(List<Documents_Attachment__c> newAttachments) {
        Map<Id, Documents_Attachment__c> latestAttachmentsMap = new Map<Id, Documents_Attachment__c>();

        // Query the latest Documents_Attachments__c for each Document_Category__c
        for (Documents_Attachment__c attachment : [SELECT Id, Name, Document_Category__c, CreatedDate
                                                     FROM Documents_Attachment__c
                                                     WHERE id IN :newAttachments
                                                     AND Active__c = true
                                                     ORDER BY Document_Category__c, CreatedDate DESC]) {
            latestAttachmentsMap.put(attachment.Document_Category__c, attachment);
        }

        // Update the Active__c field based on the latest Documents_Attachments__c
        List<Documents_Attachment__c> attachmentsToUpdate = new List<Documents_Attachment__c>();
        for (Documents_Attachment__c newAttachment : newAttachments) {
            Documents_Attachment__c latestAttachment = latestAttachmentsMap.get(newAttachment.Document_Category__c);

            if (latestAttachment != null) {
                attachmentsToUpdate.add(new Documents_Attachment__c(
                    Id = latestAttachment.Id,
                    Active__c = true
                ));
            }

            attachmentsToUpdate.add(new Documents_Attachment__c(
                Id = newAttachment.Id,
                Active__c = true
            ));
        }

        // Set Active__c to false for other Documents_Attachments__c related to the same Document_Category__c
        for (Documents_Attachment__c latestAttachment : latestAttachmentsMap.values()) {
            if (!attachmentsToUpdate.contains(latestAttachment)) {
                attachmentsToUpdate.add(new Documents_Attachment__c(
                    Id = latestAttachment.Id,
                    Active__c = false
                ));
            }
        }

        // Perform the update
        update attachmentsToUpdate;
    }




    
}