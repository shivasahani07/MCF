import { LightningElement, api,track } from 'lwc';
import getproductWarehouseRecords from '@salesforce/apex/Inventory.getproductWarehouseRecords';
import insertWarehouseTransferLog from '@salesforce/apex/Inventory.insertWarehouseTransferLog';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

//import { CloseActionScreenEvent } from 'lightning/actions';
export default class WarehouseTransfer extends LightningElement 
{
    @api recordId;
    @track saveDraftValues =[];
      Textval ;
      rowid;
      whList = [];

    @api RemainQuant;
    @track recList = [];
    @track SaveDisable=true;
    @track showErrorPopUp=true;

    connectedCallback(){
        this.handleSearch();
    }
    
    @track selectedRecord=[];
    @track warehouseProductList=[];
    @track searchKey;
    @track pageLength = 10;
    @track page = 0;
    @track searchable=[];
    @api selectedwareHouseId;

    

    handleSearch() {
        debugger;
        getproductWarehouseRecords({ recid: this.recordId })
            .then((result) => {
                this.recList=[];
                for(let i =0; i<result.length; i++){
                   let rec = {...result[i]};
                   rec.onSelectEnable=true;
                   if(rec.In_transit_Quantity__c!=null){
                       rec.RemainQuant = rec.Total_Inventory__c - rec.In_transit_Quantity__c;
                   }else{
                       rec.RemainQuant = rec.Total_Inventory__c - 0;
                   }
                   
                   this.recList[i] = rec;
                   this.warehouseProductList[i]=rec;
                   console.log('this.data[i].url -- ' , rec );
            }
                    for(let i = 0; i < this.pageLength; i++){
                    this.searchable.push(this.recList[i]);
                }

            })
            .catch((error) => {
                this.error = error;
            });
            
    }
    // getSelectedName(event) {
    //     debugger;
    //     const selectedRows = event.detail.selectedRows;
    //     console.log('selectedRows',selectedRows);
    //    // alert(JSON.stringify(selectedRows));
    //     this.selectedRecord=selectedRows;
    // }

    handleInputChange(event)
    {
        
        debugger;
        this.rowid = event.target.dataset.id;
        for(let i=0; i<this.recList.length; i++){
            if(this.rowid == this.recList[i].Id){
                if(this.recList[i].Total_Inventory__c!=null  ){
                    if(Number(event.target.value) > this.recList[i].Total_Inventory__c){
                        alert('Should Not Be Greater Than Current Inventory');
                        //this.recList[i].In_transit_Quantity__c = '';
                        //this.recList[i].RemainQuant = '' ;
                        //  this.recList[i].RemainQuant = this.recList[i].Current_Inventory__c - this.recList[i].Actual_Inventory__c ;
                    }else if(Number(event.target.value) < this.recList[i].Total_Inventory__c){
                         this.recList[i].RemainQuant = this.recList[i].Total_Inventory__c - Number(event.target.value);
                    }
                }
                
                  this.recList[i].In_transit_Quantity__c=Number(event.target.value);

                   if(this.selectRecord.find(record => record.Id === this.rowid)){

                       let record=this.selectRecord.filter(record => record.Id !== this.rowid);

                        this.selectRecord = this.selectRecord.filter(record => record.Id !== this.rowid);

                        if((record!=null || record!=undefined) && record.checkedvalue==true){
                            this.recList[i].checkedvalue=true;
                            this.selectRecord.push(this.recList[i]);
                        }else{
                          this.selectRecord.push(this.recList[i]);
                        }
                         
                    } this.recList[i].RemainQuant = this.recList[i].Total_Inventory__c - Number(event.target.value);  
            }
            
            
        }
        console.log('recList--',JSON.stringify(this.recList));
        console.log('selectRecord--',JSON.stringify(this.selectRecord));
    } 
   @track selectRecord =[];   
    changeHandler(event)
    {
        debugger;
          const recId = event.target.dataset.id;
          console.log('RECiD===>',recId);
          if (event.target.checked){
              for(let i=0; i<this.recList.length; i++)
              {
              if(this.recList[i].Id == recId)
              {
                  
                 this.recList[i].onSelectEnable=false;  
                 if(this.selectRecord.find(record => record.Id === recId)){
                    
                       this.recList[i].checkedvalue = true;
                       
                       console.log('This Record Exist');
                 }else{
                     this.recList[i].checkedvalue = true;
                    this.selectRecord.push(this.recList[i])
                 } 
                if(this.selectRecord.length>0){
                    this.SaveDisable=false;
                }
                
              }
            }
          }
          else{
               for(let i=0; i<this.recList.length; i++){
                   if(this.recList[i].Id == recId){
                        this.recList[i].onSelectEnable=true;  
                       this.recList[i].checkedvalue = false; 
                   }
               }
            this.selectRecord = this.selectRecord.filter(record => record.Id !== recId);
               if(this.selectRecord.length>0){
                    this.SaveDisable=false;
                }else{
                   this.SaveDisable=true; 
                }
          }
          
          console.log('selectRecord--',JSON.stringify(this.selectRecord));

    }
    ONSave(event)
    {
         debugger;
         let booleanValue=false;
         let count=0;
         for(let i=0;i<this.selectRecord.length;i++){
              if(this.selectRecord[i].In_transit_Quantity__c>0){
                 //booleanValue=true;
                 count=count+1; 
                  
              }else{
                 booleanValue=false;  
              }
         }
         if(this.selectRecord.length==count){
             booleanValue=true;
         }else{
             booleanValue=false;
         }
         console.log('recordId--',this.recordId);
         console.log('SelectedWareHouse--',this.selectedwareHouseId);
         if(booleanValue==true){
                insertWarehouseTransferLog({ prodList:this.selectRecord,warehouseMasterId:this.recordId,SelectedWareHouseId:this.selectedwareHouseId})
                        .then((result) => {
                            console.log('result---->',result);
                            if(result ==='success')
                            {
                                this.showToast();
                                //this.closeLWc();
                                this.closeModal();
                                console.log('result==>',result);
                            }
                        })
                        .catch((error) => {
                            console.log('error===>',error);
                            this.closeModal();
                        });
           
         }else{
             window.alert('Error Provide Quantity Transfer');
         }
          
    }
   
   
    handleClick()
    {
       debugger; 
       if(this.selectedRecord.length >0)
       {
           // inserting product data
        insertProduct({prodList:this.selectedRecord})
        .then((result) => {
           console.log('result===>',result);
            this.showToast();
            this.closeQuickAction();
           
        })
        .catch((error) => {
            this.error = error;
          
        });
    }
}
@track records=[];
@track tempArray=this.searchable;
handleKeyChange(event){
        debugger;
        this.searchKey = event.target.value;
        const searchKey = event.target.value.toLowerCase();  
        console.log( 'Search Key is ' + searchKey );
 
        if ( searchKey ) {  
            this.records = this.recList;
 
             if ( this.records ) {
                let recs = [];
                 for (let rec of this.records) {

                     if ((rec.Product__r.Name).toLowerCase().includes(searchKey)) {
                         recs.push(rec);
                         //break;
                     }

                     console.log('Rec is ' + JSON.stringify(rec));
                     /*let valuesArray = Object.values( rec );
                     console.log( 'valuesArray is ' + valuesArray );
                     for ( let val of valuesArray ) {
                         if ( val ) {
                             if ( val.toLowerCase().includes( searchKey ) ) {
                                 recs.push( rec );
                                 break;
                             }
                         }
                     }*/
                 }
                console.log( 'Recs are ' + JSON.stringify( recs ) );
                this.recList = recs;
             }
        }  else {
            this.recList = this.warehouseProductList;
        }

    }


nextpage(){
    debugger;
        let results = [];
        if(this.page <= (Math.floor(this.recList.length/this.pageLength))){
            this.page = this.page + 1;
            for(let i = 0; i < this.pageLength; i++){
                if((i + (this.page * this.pageLength)) < this.recList.length){
                    results.push(this.recList[i + (this.page * this.pageLength)]);
                }
            }
            this.searchable = results;
            console.log('searchable--',this.searchable);
        }
        if(this.page==this.recList.length){
            this.disable=true;
        }
    }   

    prevpage(){
        debugger;
        let results = [];
        if(this.page >= 1){
            this.page = this.page - 1;
            for(let i = 0; i < this.pageLength; i++){
                if((i + (this.page * this.pageLength)) < this.recList.length){
                    results.push(this.recList[i + (this.page * this.pageLength)]);
                }            
            }
            this.searchable = results;
            console.log('searchable--',this.searchable);
        }
        if(this.page==this.recList.length){
            this.disable=true;
        }
    }
showToast() {
    const event = new ShowToastEvent({
        title: 'Transfer Product Warehouse',
        message: 'Successfully Transfered',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(event);
}

closeModal() {
    debugger;
    this.dispatchEvent(new CustomEvent('close')) 
}


    
    closeLWc()
    {
        const navigateNextEvent = new FlowNavigationFinishEvent();
            this.dispatchEvent(navigateNextEvent);
    }
}