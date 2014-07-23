function ConfirModal(options) {
	'use strict';

	options = options || {};

	/**
	 * Define options – can be passed in or set as defaults
	 *
	 * title
	 * content
	 * buttons
	 * clickOutSideToClose
	 * clickOutsideEvent
	 * className
	 */
	this.options = {
		/**
		 * The title to be displayed on the modal box
		 *
		 * @type string
		 */
		title : options.title || 'Confirm',

		/**
		 * The content to be displayed inside the modal box
		 *
		 * @type string
		 */
		content : options.content || 'Are you sure you want to do this?',

		/**
		 * The buttons to be displayed inside the modal box
		 *
		 * @type Array
		 */
		buttons : options.buttons || [
			{
				text: 'Cancel',
				event: 'cancel',
				className: 'btn btn--dour',
				keyCodes: [ 27 ]
			},
			{
				text: 'Confirm',
				event: 'confirm',
				className: 'btn',
				keyCodes: [ 27 ]
			}
		],

		/**
		 * Whether clicking outside the modal closes it
		 *
		 * @type Boolean
		 */
		clickOutsideToClose: options.clickOutsideToClose || false,

		/**
		 * What event gets fired when clicked outside
		 *
		 * @type String
		 */
		clickOutsideEvent: options.clickOutsideEvent || 'cancel',

		/**
		 * Classname to be applied to the modal
		 *
		 * @type String
		 */
		className: options.className || '',

		/**
		 * Target URL
		 *
		 * @type String
		 */
		targetURL : options.targetURL || event.target.href
	};


	// Some old versions of Android don't have Function.prototype.bind
	function bind(method, context) {
		return function() { return method.apply(context, arguments); };
	}


	// Bind the context of our object to our methods
	var methods = ['constructModal', 'show', 'createButton'];
	var context = this;
	for (var i = 0, l = methods.length; i < l; i++) {
		context[methods[i]] = bind(context[methods[i]], context);
	}

	//Construct our modal
	this.constructModal();

}

var addEvent = function (el, type, fn) {
	if (el.addEventListener)
		el.addEventListener(type, fn, false);
	else
		el.attachEvent('on'+type, fn);
};

ConfirModal.prototype.constructModal = function() {

	//create the modal html and attach to the dom
	//
	//.modal-overlay
	//	.modal-content
	//	h2.modal-title
	//	p.modal-text
	//	.modal-controls
	//		button.btn

	var modalWrapper = document.createElement('div'),
		modalContent = document.createElement('div');
		modalTitle = document.createElement('h2'),
		modalText = document.createElement('p'),
		modalControls = document.createElement('div');

	modalWrapper.id = 'modal';
	modalWrapper.className = 'modal-overlay' + (this.options.className !== '' ? ' ' + this.options.className : '');
	modalContent.className = 'modal-content';
	modalTitle.className = 'modal-title';
	modalText.className = 'modal-text';
	modalControls.className = 'modal-controls';

	modalTitle.innerHTML = this.options.title;
	modalText.innerHTML = this.options.content;

	//fill the controls with our buttons
	for (var i = 0, btnLength = this.options.buttons.length; i < btnLength; i++) {
		modalControls.appendChild( this.constructBtn(this.options.buttons[i]) );
	}

	//now add all the different parts together
	modalContent.appendChild(modalTitle);
	modalContent.appendChild(modalText);
	modalContent.appendChild(modalControls);

	modalWrapper.appendChild(modalContent);

	this.modal = modalWrapper;
	this.show();

}

ConfirModal.prototype.show = function(event) {

	//check if a modal is already showing (in the DOM)
	document.body.appendChild(this.modal);

}

ConfirModal.prototype.hide = function(event) {

	//show our modal window
	var modal = document.getElementById('modal');
	modal.parentElement.removeChild(modal);

}

ConfirModal.prototype.constructBtn = function(btnOptions) {

	var btn = document.createElement('button');

	btn.className = btnOptions.className;
	btn.innerHTML = btnOptions.text;

	var _self = this;

	addEvent(btn, 'click', function (event) {
		_self.modalEvent(btnOptions.event);
	});

	return btn;

}

ConfirModal.prototype.modalEvent = function(event) {

	this.hide();

	//if confirmation, use the link from our initial event
	if (event === 'confirm') {
		window.location.href = this.options.targetURL;
	}
	//act on event
}



/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 * @param {Object} options The options to override the defaults
 */
ConfirModal.attach = function(options) {
	'use strict';
	return new ConfirModal(options);
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = ConfirModal.attach;
	module.exports.ConfirModal =  ConfirModal;
} else {
	window.ConfirModal = ConfirModal;
}