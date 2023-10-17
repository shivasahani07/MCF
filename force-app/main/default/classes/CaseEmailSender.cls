public class CaseEmailSender {
    public static void sendEmailOnCase(String caseId) {
        try {
            // Retrieve Case details
            Case myCase = [SELECT Id, Subject, AccountId, Account.Name, Account.Email__c, Status, Priority
                           FROM Case
                           WHERE Id = :caseId LIMIT 1];

            // Check if the related Account has an email address
            if (myCase.Account != null && myCase.Account.Email__c != null) {
                // Build email message
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                email.setToAddresses(new String[] {myCase.Account.Email__c});
                email.setSubject('Case Update: ' + myCase.Subject);

                String body = 'Hello,\n\n';
                body += 'This is an update for Case "' + myCase.Subject + '"\n';
                body += 'Account: ' + myCase.Account.Name + '\n';
                body += 'Status: ' + myCase.Status + '\n';
                body += 'Priority: ' + myCase.Priority + '\n\n';
                body += 'Thank you,\nYour Organization';

                email.setPlainTextBody(body);

                // Send email
                Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
            } else {
                System.debug('Account does not have an email address');
            }
        } catch (Exception e) {
            // Handle exceptions
            System.debug('Exception occurred: ' + e.getMessage());
        }
    }
}