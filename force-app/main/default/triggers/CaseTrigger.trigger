trigger CaseTrigger on Case (before insert,before update) {
    if(Trigger.isInsert && trigger.isBefore){
        //SkillbaseRouting.skillBasedRouting(trigger.new);
    }
    if(Trigger.isUpdate && trigger.isBefore){
        //SkillbaseRouting.updateField(trigger.new);
    }
    if(Trigger.isUpdate && trigger.isAfter){
        if (UserInfo.getUserType() == 'Standard'){
            DateTime completionDate = System.now(); 
            List<Id> updateCases = new List<Id>();
            for (Case c : Trigger.new){
                if (((c.isClosed == true)||(c.Status == 'Closed'))&&((c.SlaStartDate 
                                                                      <= completionDate)&&(c.SlaExitDate == null)))
                    updateCases.add(c.Id);
            }
            if (updateCases.isEmpty() == false)
                milestoneUtils.completeMilestone(updateCases, 'Resolution Time', completionDate);
        }
    }
}