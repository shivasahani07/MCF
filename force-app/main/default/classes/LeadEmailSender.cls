public class LeadEmailSender {

    public static void sendEmailOnLead(String leadId) {
        try {
            // Retrieve Lead details
            Lead myLead = [SELECT Id, FirstName, LastName, Company, Email, Status, Industry
                           FROM Lead
                           WHERE Id = :leadId LIMIT 1];

            // Check if the Lead has an email address
            if (myLead.Email != null) {
                // Build email message
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                email.setToAddresses(new String[] {myLead.Email});
                email.setSubject('Lead Update: ' + myLead.FirstName + ' ' + myLead.LastName);

                String body = 'Hello,\n\n';
                body += 'This is an update for Lead "' + myLead.FirstName + ' ' + myLead.LastName + '"\n';
                body += 'Company: ' + myLead.Company + '\n';
                body += 'Status: ' + myLead.Status + '\n';
                body += 'Industry: ' + myLead.Industry + '\n\n';
                body += 'Thank you,\nYour Organization';

                email.setPlainTextBody(body);

                // Send email
                Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
            } else {
                System.debug('Lead does not have an email address');
            }
        } catch (Exception e) {
            // Handle exceptions
            System.debug('Exception occurred: ' + e.getMessage());
        }
    }
}