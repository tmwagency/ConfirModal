ConfirModal
----------

###Note – This is still a work in progress project.  It currently only has a limited subset of its planned functionality.

ConfirModal is a dependency–free, lightweight JS library for displaying confirmation modal boxes.

When called, it displays a modal confirmation box based on the options passed to it that you can then style with your own CSS.


##Usage

Include confirmodal.js in your JavaScript bundle, or add it to your HTML page like this:

	<script type='application/javascript' src='/path/to/confirmodl.js'></script>

The script must be loaded before attempting to call ConfirModal.

To initiate your modal, this is currently the recommended method of use:

	window.addEventListener('load', function() {
	    ConfirModal({
		…
	    });
	}, false);

Don't forget to add a shim for addEventListener if you want to support IE8 and below.

If you’re using Browserify or another Common–JS module system, the ConfirModal.attach function will be returned when you call require('confirmodal'). As a result, the easiest way to use ConfirModal with these loaders is as follows:

var ConfirModal = require('confirmodal');
ConfirModal({
	…
});

##Properties

Currently, the following properties are supported when calling ConfirModal:

**title** : The title to be displayed in your modal box

**content** : The content to be displays inside your modal box

**buttons** : Array of buttons displayed inside the modal box.  Each button is specified as an object such that

	{
		text: 'Confirm',
		event: 'confirm',
		className: 'className'
	}

**className** : A classname to add to the modal wrapper

**targetURL** : Defaults to the target URL of the event active when ConfirModal was called (i.e. the href of a link that was clicked).  This can be overridden here, or specified for events where this cannot be inherited.

