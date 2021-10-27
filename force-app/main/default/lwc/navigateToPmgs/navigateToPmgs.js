import { LightningElement, api, wire} from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';


export default class NavigateToPmgs extends NavigationMixin(LightningElement) {
    @api recordId;
    @api variant = "neutral";
    @api label = ""
    currentPageReference;

     // Injects the page reference that describes the current page
     @wire(CurrentPageReference)
     setCurrentPageReference(currentPageReference) {
         this.currentPageReference = currentPageReference;
 
         if (this.connected) {
             // We need to have the currentPageReference, and to be connected before
             // we can use NavigationMixin
             this.generateUrls();
         } else {
             // NavigationMixin doesn't work before connectedCallback, so if we have 
             // the currentPageReference, but haven't connected yet, queue it up
             this.generateUrlOnConnected = true;
         }
     }
 
     showPanelUrl;
     noPanelUrl;
 
     // Determines the display for the component's panel
     get showPanel() {
         // Derive this property's value from the current page state
         return this.currentPageReference &&
             this.currentPageReference.state.c__recordId == this.recordId;
     }
     
     generateUrls() {
         this[NavigationMixin.GenerateUrl](this.showPanelPageReference)
             .then(url => this.showPanelUrl = url);
         this[NavigationMixin.GenerateUrl](this.noPanelPageReference)
             .then(url => this.noPanelUrl = url);
     }
 
     // Returns a page reference that matches the current page
     // but sets the 'c__showPanel' page state property to 'true'
     get showPanelPageReference() {
         return this.getUpdatedPageReference({
             c__recordId: this.recordId // Value must be a string
         });
     }
 
     // Returns a page reference that matches the current page
     // but removes the 'c__showPanel' page state property
     get noPanelPageReference() {
         return this.getUpdatedPageReference({
             // Removes this property from the state
             c__showPanel: undefined
         });
     }
 
     // Utility function that returns a copy of the current page reference
     // after applying the stateChanges to the state on the new copy
     getUpdatedPageReference(stateChanges) {
         // The currentPageReference property is read-only.
         // To navigate to the same page with a modified state,
         // copy the currentPageReference and modify the copy.
         return Object.assign({}, this.currentPageReference, {
             // Copy the existing page state to preserve other parameters
             // If any property on stateChanges is present but has an undefined
             // value, that property in the page state is removed.
             state: Object.assign({}, this.currentPageReference.state, stateChanges)
         });
     }

     handleNavigate() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'custom_app',
            },
            state: {
                c__recordId: this.recordId,
                c__tab: 'Create'
            }
        });
    }
 

}
