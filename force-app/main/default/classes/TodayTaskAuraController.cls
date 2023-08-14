public class TodayTaskAuraController {
    
    //method for getting all visit records based on date passed
    @AuraEnabled
    public static todaytaskWrapper getAllVisitTodays(String visitDate){
        List<Visit__c> visitListToShow = new List<Visit__c>();
        try{
            if(String.isNotBlank(visitDate)){
                String[] arrTest = visitDate.split('T');
                string[] dateArray = arrTest[0].split('-');
                Integer year = Integer.valueOf(dateArray[0]);
                Integer month = Integer.valueOf(dateArray[1]);
                Integer day = Integer.valueOf(dateArray[2]);
                date VisitFormatedDate = date.newInstance(year, month, day);
                visitListToShow = [SELECT Id, Name, Status__c, Account__c, Duration__c, Account__r.Name, Account__r.Website, Account__r.Email__c, Account__r.Phone,  Visit_Time__c, Planned_visit_date__c, Weekly_Beat_Plan__c, KPI_Target__c, KPI_Target__r.KPI_Target_Name__c,Account__r.BillingStreet, Account__r.BillingCity, Account__r.BillingState,Account__r.BillingPostalCode,Account__r.BillingCountry FROM Visit__c WHERE Planned_visit_date__c=:VisitFormatedDate AND Account__r.BillingStreet !=null AND Account__r.BillingCity !=null LIMIT 5];
                if(visitListToShow.size()>0){
                    integer compVisitCount=0;
                    integer pendingVisitCount =0;
                    for(Visit__c vs : visitListToShow){
                        if(vs.Status__c == 'PENDING'){
                            compVisitCount =  compVisitCount + 1;
                        }
                        if(vs.Status__c == 'COMPLETED'){
                            pendingVisitCount = pendingVisitCount + 1;
                        }
                    }
                    String userId = userInfo.getUserId();
                    system.debug('userId::'+userId);
                    List<Day_Visit_Plan__c> dayVisitList = [SELECT Id FROM Day_Visit_Plan__c WHERE Start_Date__c=today AND Service_Executive__c =: userId];
                    System.debug('dayVisitList === >'+dayVisitList);
                    System.debug('compVisitCount === >'+compVisitCount);
                    System.debug('pendingVisitCount === >'+pendingVisitCount);
                    todaytaskWrapper wrap = new todaytaskWrapper();
                    wrap.visitList = visitListToShow;
                    wrap.completedVisit = compVisitCount;
                    wrap.pendingVisit = pendingVisitCount;
                    if(!dayVisitList.isEmpty()){
                        wrap.dvpList = dayVisitList;
                    }
                    System.debug('wrap Data === >'+wrap);
                    return wrap;
                }
            }
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
        return null;
    }
    
    // ==========================================================================================================================================================================================================
    // Method get Selected Vist Recor Details
    @AuraEnabled
    public static Visit__c getSelectedVisitDetails(String visitId){
        Visit__c visitRec = new Visit__c();
        try{
            if(String.isNotBlank(visitId)){
                visitRec = [SELECT Id, Name, Status__c, Account__c, Duration__c, Account__r.Name, Account__r.Website, Account__r.Email__c, Account__r.Phone,  Visit_Time__c, Planned_visit_date__c, Weekly_Beat_Plan__c, KPI_Target__c, KPI_Target__r.KPI_Target_Name__c,Account__r.BillingStreet, Account__r.BillingCity, Account__r.BillingState,Account__r.BillingPostalCode,Account__r.BillingCountry FROM Visit__c WHERE Id=:visitId LIMIT 1];
                if(visitRec !=null){
                    System.debug('visitRec === >'+visitRec);
                    return visitRec;
                }
            }
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
        return null;
    }
    
    public class todaytaskWrapper{
        @AuraEnabled
        public Integer completedVisit;
        @AuraEnabled
        public Integer pendingVisit;
        @AuraEnabled
        public List<Visit__c> visitList;
        @AuraEnabled
        public List<Day_Visit_Plan__c> dvpList;
    }
    
    // ==========================================================================================================================================================================================================
    // Method for Creating Day Visit Plan on Start Day Button Click
    @AuraEnabled
    public static Day_Visit_Plan__c StartDayVisitForVistitRecord(String startLat,String startLang,List<Visit__c> visitRecList){
        System.debug('startLat == >'+startLat + ' && startLang === >'+startLang + ' && visitRecList === >'+visitRecList);
        List<Visit__c> visitListToUpdate = new List<Visit__c>();
        Monthly_Travel_Expense__c mte = [select id from Monthly_Travel_Expense__c limit 1];
        try{
            if(String.isNotBlank(startLat) && string.isNotBlank(startLang)){
                Day_Visit_Plan__c vstPlan = new Day_Visit_Plan__c();
                vstPlan.Start_Location__Latitude__s =Decimal.valueOf(startLat);
                vstPlan.Start_Location__Longitude__s = Decimal.valueOf(startLang);
                vstPlan.Service_Executive__c = Userinfo.getUserId();
                vstPlan.Monthly_Travel_Expense__c = mte.Id;
                vstPlan.Start_Date__c = system.today();
                insert vstPlan;
                if(String.isNotBlank(vstPlan.Id)){
                    for(Visit__c vs : visitRecList){ 
                        vs.Visit_Plan__c = vstPlan.id;
                        visitListToUpdate.add(vs);
                    }
                    if(visitListToUpdate.size()>0){
                        update visitListToUpdate;
                        System.debug('Updated Visit Record ==== >'+visitListToUpdate);
                        if(visitListToUpdate.size()>0){
                            System.debug('Day Visit Plan Record ==>'+vstPlan);
                            return vstPlan;
                        }
                    }
                }
            }
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
        return null;
    }
    
    // ==========================================================================================================================================================================================================
    // Method for End Day Visit / Update End Location Update
    @AuraEnabled
    public static Day_Visit_Plan__c updateEndDayVisitRecord(String endLat,String endLong,String dayvisitId){
        Day_Visit_Plan__c  vstPlan = new Day_Visit_Plan__c();
        vstPlan = [select id from Day_Visit_Plan__c where Service_Executive__c =:UserInfo.getUserId() and Start_Date__c = today];
        try{
            if(vstPlan != null){
                vstPlan.Id = vstPlan.Id;
                if(endLat != null)
                vstPlan.End_Location__Latitude__s = Decimal.valueOf(endLat);
                if(endLong != null)
                vstPlan.End_Location__Longitude__s = Decimal.valueOf(endLong);
                vstplan.End_Date__c = system.now();
                update vstPlan;
                System.debug('Updated Day Visit Plan Record ==== >'+vstPlan);
                return vstPlan;
            }
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
        return null;
    }
    
    // ==========================================================================================================================================================================================================
    // Method for Ahmed Visit Update
    @AuraEnabled
    public static Visit__c updateAmendVisitRecord(Visit__c visitRec){
        Visit__c vsRec = new Visit__c();
        try{
            if(visitRec != null){
                update visitRec;
            }
            System.debug('visitRec === >'+visitRec);
            return visitRec;
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
        return null;
    }

    //==========================================================================================================================================================================================================
    @AuraEnabled
    public static void saveTask(Task taskRec){
        try{
            if(taskRec !=null){
                System.debug('taskRec === >'+taskRec);
                taskRec.OwnerId = userInfo.getUserId();
                insert taskRec;
            }
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
    }

    //==========================================================================================================================================================================================================
    @AuraEnabled
    public static void saveLogCall(Task taskRec){
        try{
            if(taskRec !=null){
                System.debug('taskRec === >'+taskRec);
                taskRec.OwnerId = userInfo.getUserId();
                DateTime dt = System.Now();
                Date myDate = date.newinstance(dT.year(), dT.month(), dT.day());
                taskRec.ActivityDate = myDate;
                insert taskRec;
            }
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
    }
    
    //==========================================================================================================================================================================================================
    @AuraEnabled
    public static void saveOpportunity(Opportunity oppRec){
        try{
            if(oppRec !=null){
                System.debug('oppRec === >'+oppRec);
                insert oppRec;
            }
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
    }
    
    //==========================================================================================================================================================================================================
    @AuraEnabled
    public static void saveCase(Case caseRec){
        try{
            if(caseRec !=null){
                System.debug('caseRec === >'+caseRec);
                insert caseRec;
            }
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
    }

    //==========================================================================================================================================================================================================
    // Method for Check in on Visit Record
    @AuraEnabled
    public static Visit__c  checkInVisitUpdate(String checkInLat,String checkInLang){
        Visit__c visRec = [SELECT Id,Name,Actual_visit_date__c,CheckIn__Latitude__s,CheckIn__Longitude__s,Visit_Status__c FROM Visit__c WHERE Actual_visit_date__c=TODAY LIMIT 1 ];
        try{
            if(String.isNotBlank(checkInLat) && String.isNotBlank(checkInLang) && String.isNotBlank(visRec.Id)){
                visRec.Id = visRec.Id;
                visRec.CheckIn__Latitude__s = Decimal.valueOf(checkInLat);
                visRec.CheckIn__Longitude__s =  Decimal.valueOf(checkInLang);
                visRec.Visit_Status__c = 'In Progress';
                visRec.Check_In_Time__c = System.now();
                update visRec;
                System.debug('Check In Visit Update Record === >'+visRec);
                return visRec;
            }
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
       return null;
    }

    //==========================================================================================================================================================================================================
    // Method for Check Out in Visit Record
    public static Visit__c checkOutVisitUpdate(String checkOutLat,string checkOutLong){
        Visit__c visRec =[SELECT Id,Name,Actual_visit_date__c,CheckIn__Latitude__s,CheckIn__Longitude__s,Visit_Status__c FROM Visit__c WHERE CheckIn__Latitude__s !=null AND CheckIn__Longitude__s !=null LIMIT 1];
        try{
            return null;
        }catch(Exception e){
            System.debug('The Error ::'+e.getMessage() +' AND Error Line No :'+e.getLineNumber());
        }
        return null;
    }
    
    
}