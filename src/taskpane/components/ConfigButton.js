import * as React from 'react';

var configDialog;

export default function ConfigButton () {
	return (
		<button onClick={clicked}>Config....</button>
	);
}

function clicked(){
	const fullUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/src/taskpane/configdialog.html';
	Office.context.ui.displayDialogAsync(fullUrl,
		{height: 60, width: 30}, 
		(result) => {
			console.log("Dialog has initialized. Wiring up events");
			configDialog = result.value;
			configDialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, processMessage);
	});
}

// This handler responds to the success or failure message that the pop-up dialog receives from the identity provider
    // and access token provider.
    function processMessage(arg) {
        console.log("Message received in processMessage: " + JSON.stringify(arg));
        if (arg.message === "success") {
            // We now have a valid access token in the database.
            configDialog.close();

            window.location.href = redirectTo;
        } else {
            // Something went wrong with authentication or the authorization of the web application.
            configDialog.close();
           // app.showNotification("User authentication and application authorization", "Unable to successfully authenticate user or authorize application. Status is " + arg.message);
        }
    }