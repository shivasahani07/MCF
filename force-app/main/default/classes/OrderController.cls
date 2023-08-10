public class OrderController {
	@AuraEnabled
    public static List<Order> getOrderList(){
        List<Order> ordList = new List<Order>();
        ordList = [Select Id,OrderNumber,Status,EffectiveDate,EndDate,TotalAmount FROM Order];
        return ordList;
    }
}