import { LightningElement,api,wire,track } from 'lwc';
import getDocuments from '@salesforce/apex/lwc_DocumentCategory.getDocuments';
export default class DocumentCategory extends LightningElement {
     recordId='0060k00000GVNYYAA5';
    selectedItemValue;
    returnwiredData=[];

    @wire(getDocuments, { dealId:'0060k00000GVNYYAA5' })
    wiredData({ error, data }) {
    debugger;
      if (data) {
          this.returnwiredData=data;
        console.log('Data', data);
      } else if (error) {
         console.error('Error:', error);
      }
    }
















    handleOnselect(event) {
        this.selectedItemValue = event.detail.name;
    }

    items = [
        {
            label: 'User',
            name: 'user',
            disabled: false,
            expanded: true,
            items: [
                {
                    label: 'Standard User',
                    name: 'standard',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
                {
                    label: 'Chatter User',
                    name: 'chatter',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
            ],
        },
        {
            label: 'Administrator',
            name: 'admin',
            disabled: false,
            expanded: true,
            items: [
                {
                    label: 'System Administrator',
                    name: 'sysadmin',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
                {
                    label: 'Chatter Administrator',
                    name: 'chatter',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
            ],
        },
        {
            label: 'Community User',
            name: 'community',
            disabled: false,
            expanded: true,
            items: [
                {
                    label: 'Community Login User',
                    name: 'community_login',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
                {
                    label: 'Community Plus Login User',
                    name: 'community_plus',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
            ],
        },
    ];
}