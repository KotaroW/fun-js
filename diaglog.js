/********************************************************************************
 * Dialog class: generate and display confirmation/notification dialog box
********************************************************************************/

class Dialog {
	static get CONTAINER_DIALOG_MASK() { return 'dialog-mask'; }
	static get CONTAINER_DIALOG_BOX() { return 'dialog-box'; }
	static get CONTAINER_BUTTON_BOX() { return 'button-box'; }
	static get CANCEL_BUTTON() { return 'Cancel'; }
	static get OK_BUTTON() { return 'OK'; }
	static get MSG_NS() { return 'dialog-msg'; }
    
	constructor (msg) {
		this.msg = msg;
	}
    
	generateContainer (containerType) {
		var container = document.createElement("div");

		var namespace = 
		(containerType == Dialog.CONTAINER_DIALOG_MASK) ? 
		Dialog.CONTAINER_DIALOG_MASK :
		(containerType == Dialog.CONTAINER_DIALOG_BOX) ? 
		Dialog.CONTAINER_DIALOG_BOX :
		Dialog.CONTAINER_BUTTON_BOX;

		container.setAttribute("data-namespace", namespace);
        
		return container;
	}
	
	generateActionButton (buttonType, callback) {
		var actionButton = document.createElement("button");
		actionButton.setAttribute("data-namespace", "action-button");
		actionButton.textContent = (buttonType == Dialog.CANCEL_BUTTON) ? Dialog.CANCEL_BUTTON : Dialog.OK_BUTTON;
		actionButton.addEventListener(
			"click",
			function () {
				document.body.removeChild(document.querySelector("div[data-namespace=dialog-mask]"));
				document.body.style.overflow = "scroll";

				callback();
			},
			false
		);
		
		return actionButton;
	}
	
	generateMsgParagraph (msg) {
		var msgParagraph = document.createElement("p");
		msgParagraph.setAttribute("data-namespace", Dialog.MSG_NS);
		msgParagraph.innerHTML = msg;
		
		return msgParagraph;
	}
	
	displayDialog (dialog) {
		document.body.style.overflow = "hidden";
		document.body.appendChild(dialog);
	}
}

class Confirmation extends Dialog {

	constructor (msg, cancelCallback, okCallback) {
		super(msg);
		this.buildConfirmation(msg, cancelCallback, okCallback);
	}
    
	buildConfirmation(msg, cancelCallback, okCallback) {
		var mask = super.generateContainer(Dialog.CONTAINER_DIALOG_MASK);
		var dialogBox = super.generateContainer(Dialog.CONTAINER_DIALOG_BOX);
		var buttonBox = super.generateContainer(Dialog.CONTAINER_BUTTON_BOX);
		var msgParagraph = super.generateMsgParagraph(msg);
		var cancelButton = super.generateActionButton(Dialog.CANCEL_BUTTON, cancelCallback);
		var okButton = super.generateActionButton(Dialog.OK_BUTTON, okCallback);

		buttonBox.appendChild(cancelButton);
		buttonBox.appendChild(okButton);
		dialogBox.appendChild(msgParagraph);
		dialogBox.appendChild(buttonBox);
		mask.appendChild(dialogBox);

		super.displayDialog(mask);
	}
}

class Notification extends Dialog {
	constructor (msg, okCallback) {
		super(msg);
		this.buildNotification(msg, okCallback);
	}
    
	buildNotification(msg, okCallback) {
		var mask = super.generateContainer(Dialog.CONTAINER_DIALOG_MASK);
		var dialogBox = super.generateContainer(Dialog.CONTAINER_DIALOG_BOX);
		var buttonBox = super.generateContainer(Dialog.CONTAINER_BUTTON_BOX);
		var msgParagraph = super.generateMsgParagraph(msg);
		var okButton = super.generateActionButton(Dialog.OK_BUTTON, okCallback);

		buttonBox.appendChild(okButton);        
		dialogBox.appendChild(msgParagraph);
		dialogBox.appendChild(buttonBox);
		mask.appendChild(dialogBox);
		
		super.displayDialog(mask);
	}
}

// test
new Confirmation(
	"Any unsaved changes will be lost.<br>Continue?", 
	() => { alert("Cancel pressed"); }, 
	() => { alert("OK pressed"); }
);
