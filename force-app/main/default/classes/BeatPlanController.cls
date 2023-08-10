public class BeatPlanController {


    @AuraEnabled
    Public  static List<Roles_and_KPI__c> AllRolesXKPICurrentUser(){
        List<Roles_and_KPI__c> RKPList=[Select Id,Name From Roles_and_KPI__c Where Sales_User__c='005N000000AkhoZIAR']; //:UserInfo.getUserId()
        return RKPList;
    }
    
    @AuraEnabled
    Public Static void GetAllMonthlyBeatPlanner(String StartDate,String LastDate){

        
        DateTime startDateTime = DateTime.valueOf(StartDate); // Replace with your actual start date
        DateTime endDateEndDateTime = DateTime.valueOf(LastDate); // Replace with your actual end date
        Integer weeksBetween = 0;
       
        System.debug('Weeks between start and end dates: ' + weeksBetween);
 
        Monthly_Beat_Plan__c MBP=new Monthly_Beat_Plan__c();
        List<Weekly_Beat_Plan__c> WBPList=new List<Weekly_Beat_Plan__c>();
        if(StartDate!=null && LastDate!=null){
            MBP.Start_Date__c=Date.valueOf(StartDate);
            MBP.End_Date__c=Date.valueOf(LastDate);
            MBP.Sales_User__c=UserInfo.getUserId(); 
            insert MBP;
             /*Date SelectedDate=Date.valueOf(StartDate);
             Integer month = SelectedDate.month();
             Integer DaysInMonth=date.daysInMonth(SelectedDate.year(), month);
             Date WeekStartDate=SelectedDate.toStartofWeek();
             Date WeekEndDate=WeekStartDate.addDays(7);*/
            if(MBP.Id!=null){

                Weekly_Beat_Plan__c WBP=new Weekly_Beat_Plan__c();
                WBP.Monthly_Beat_Plan__c=MBP.Id;

                Date WeekStartDate=Date.valueOf(startDateTime).toStartofWeek();
                WBP.Start_Day_of_Week__c=WeekStartDate;

                while (startDateTime < endDateEndDateTime) {
                    if (string.valueof(startDateTime.format('E')) == 'Sun') {
                          weeksBetween++; 
                              
                        if (string.valueof(startDateTime.format('E')) == 'Sun'){
                                 
                            WBP.End_Day_of_Week__c=Date.valueOf(LastDate);
                            WBP.Start_Day_of_Week__c=Date.valueOf(LastDate).addDays(1);
                        }
                              
                        
                        WBPList.add(WBP);
                        
                    }
                    startDateTime = startDateTime.addDays(1);
                }
            }
            if(!WBPList.isEmpty()){
                Insert WBPList;
            }
        }
       
              
    }

    

    
    
   /* public Static Integer weekOfMonth(Date todaysDate){
        Integer weekCount = 0;
        Integer startWeekResidue = 0;
        Integer endWeekResidue = 0;
        
        //Calculating startWeekResidue
        Date dt = todaysDate.toStartOfMonth().addDays(-1);
        Date dtFirstWeekend = dt.toStartOfWeek().addDays(6);
        startWeekResidue = dt.daysBetween(dtFirstWeekend);
        
        //Calculating endWeekResidue
        Date dtLastWeekend = todaysDate.toStartOfWeek().addDays(-1);
        endWeekResidue = dtLastWeekend.daysBetween(todaysDate);
        
        //Counting the weeks
        weekCount = (todaysDate.day() - (startWeekResidue + endWeekResidue))/7;
        weekCount += (startWeekResidue > 0 ? 1:0)+(endWeekResidue > 0 ? 1:0);
        System.Debug('Week Number: ' + weekCount);
        return weekCount;
    }*/

}