import { LightningElement, wire, api } from 'lwc';
import getOpportunityLineItemStatusPicklistValues from '@salesforce/apex/OppLineItemStatusPathCtrl.getOpportunityLineItemStatusPicklistValues';
import updatePicklistValue from '@salesforce/apex/OppLineItemStatusPathCtrl.updatePicklistValue';

export default class OpportunityLineItemStatusPath extends LightningElement {
    currentvalue = '';
    selectedvalue;
    picklistValues = [];
    @api recordId;
    wiredPicklistValues;
    selectedIndex;

    @wire(getOpportunityLineItemStatusPicklistValues, { recordId: '$recordId' })
    retrievePicklistValues(result) {
        this.wiredPicklistValues = result;
        if (result.data) {
            this.picklistValues = result.data;
            console.log('nsajnsjnsja----------->', result.data);
            this.selectedIndex = this.picklistValues.findIndex(item => item.includes('.'));
            this.selectedvalue = this.picklistValues[this.selectedIndex];
            this.currentvalue = this.selectedvalue;
        } else if (result.error) {
            console.error(result.error);
        }
    }

    pathHandler(event) {
        let targetValue = event.target.value;
        let selectedValue = event.target.label;
        this.selectedIndex = event.target.dataset.index;

        if (targetValue === this.currentvalue) {
            this.currentvalue = this.selectedvalue;
        } else {
            this.currentvalue = targetValue;
            this.selectedvalue = selectedValue;
        }
    }

    handleMarkAsCurrent() {
        updatePicklistValue({ recordId: this.recordId, selectedValue: this.selectedvalue })
            .then(result => {
                if (result) {
                    this.reloadPage();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    reloadPage() {
        // Reload the entire page
        window.location.reload();
    }
}