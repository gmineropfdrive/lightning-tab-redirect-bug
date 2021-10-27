import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PmgsContainer extends LightningElement{
    connectedCallback(){
        const evt = new ShowToastEvent({
            title: "redirected",
            message: "this should be displayed every time",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }
}