public class SearchController {
	@AuraEnabled(cacheable=true)
    public static List<Account> fetchAcc (String searchKey){
        String query= 'SELECT Id, Name FROM Account';
         if ( searchKey != Null ) {
            String key = '%' + searchKey + '%';
            query += ' WHERE Name LIKE :key';
        }system.debug(Database.query( query ));
         return Database.query( query );
        
    }  
}