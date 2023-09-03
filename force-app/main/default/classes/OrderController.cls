public class OrderController {
	@AuraEnabled
    public static List<Order> getOrderList(Integer pageSize, Integer pageNumber, string accountId){
        Integer offset = (pageNumber - 1) * pageSize;
        List<Order> ordList = new List<Order>();
        ordList = [Select Id,OrderNumber,Status,EffectiveDate,EndDate,TotalAmount FROM Order WHERE AccountId=: accountId LIMIT :pageSize OFFSET :offset];
        return ordList;
    }
}