({
    handleCancel : function(component, event, helper) {
            var navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
                "recordId": component.get("v.recordId"),
                "isredirect": true
            });
            navEvt.fire();
    },

    navigate : function(component, event, helper) {
            var recordId = component.get("v.recordId");
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": `/lightning/n/custom_app#tab=Something&id=${recordId}`
            });
            urlEvent.fire();
     },
});
