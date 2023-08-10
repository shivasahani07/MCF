public class DealerWrapper {
	public TargetWrapper DealerTargetWrapperInstance;
    public OrderWrapper DealerOrderWrapperInstance;
    public InvoiceWrapper DealerInvoiceWrapperInstance;
    public TicketWrapper DealerTicketWrapperInstance;
    
    public DealerWrapper(){
        DealerTargetWrapperInstance = new TargetWrapper(2000,1000,1000);
        DealerOrderWrapperInstance = new OrderWrapper(200,100,100);
        DealerInvoiceWrapperInstance = new InvoiceWrapper(20,10,10);
        DealerTicketWrapperInstance = new TicketWrapper(5,3,2);
    }
    
    @AuraEnabled
    public static DealerWrapper getDealerData(String accId){
        return new DealerWrapper();
    }
    
	class InvoiceWrapper {
        public Integer InvoiceByCompany;
        public Integer InvoiceAcheived;
        public Integer InvoicePending;
        
        InvoiceWrapper(Integer ic,Integer ia,Integer ip){
            this.InvoiceByCompany = ic;
            this.InvoiceAcheived = ia;
            this.InvoicePending = ip;
        }
	}
	
    class TicketWrapper {
        public Integer TicketByCompany;
        public Integer TicketAcheived;
        public Integer TicketPending;
        
        TicketWrapper(Integer tc,Integer ta,Integer tp){
            this.TicketByCompany = tc;
            this.TicketAcheived = ta;
            this.TicketPending = tp;
        }
    }
	class OrderWrapper {
        public Integer OrderSetByCompany;
        public Integer OrderAcheived;
        public Integer OrderPending;
        
        OrderWrapper(Integer oc,Integer oa,Integer op){
            this.OrderSetByCompany = oc;
            this.OrderAcheived = oa;
            this.OrderPending = op;
        }
    }
    class TargetWrapper {
        public Integer targetSetByCompany;
        public Integer targetAcheived;
        public Integer targetPending;
        
        TargetWrapper(Integer toc,Integer ta,Integer tp){
            this.targetSetByCompany = toc;
            this.targetAcheived = ta;
            this.targetPending = tp;
        }
    }
	    
}