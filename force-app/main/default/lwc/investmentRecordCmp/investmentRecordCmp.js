import {api, LightningElement, wire,track } from 'lwc';
import getRecordList from '@salesforce/apex/bidBrandingCmpClass.getInvestmentRecords';

export default class investmentRecordCmp extends LightningElement {
    @track recList = [];
    @api url = '';
    @wire(getRecordList,{})
    wiredResponse(result){
        if(result.data){
            debugger;
            console.log('Contacts-------',result.data);
            this.recList = [];
            for(let i =0; i<result.data.length; i++){
                let rec = {...result.data[i]};
                rec.url = 'https://sales-production--fsldemo.sandbox.lightning.force.com/lightning/r/Account/'+rec.Account__c+'/view';
                this.recList[i] = rec;
                console.log('this.recList[i].url -- ' , rec );
            }
             
        }else{
            console.log("Error to fetch Fund",result);
        }
    }
}