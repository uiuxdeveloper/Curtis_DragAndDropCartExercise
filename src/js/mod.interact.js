/**
 * Interact
 * @Author Curtis M. Janczak
 * @Version 0.1
 * @Namespace MOD_INTERACT
 */
 var MOD_INTERACT = ( function( $, window, CART ) {

 	/**
 	 * Param
 	 * @Memberof MOD_INTERACT
 	 * @Private
 	 * @Param {Boolean} inited
 	 * @Param {Object} _options
 	 */
 	var inited = false;
 	var interact = window.interact;
	var _options = {
		dragEle: ".thmb",
		dropzoneEle: ".dropzone"
	};

	/**
	 * Initialize
	 * @Memberof MOD_INTERACT
	 * @Private
	 * @Function _init
	 */
	function _init(){
		if(!inited){
			initializeDrag();
			initializeDropzone();

			inited = true;
		}
	}

	/**
	 * Initialize Drag Functionality
	 * @Memberof MOD_INTERACT
	 * @Private
	 * @Function initializeDrag
	 */
	function initializeDrag(){
		interact( _options.dragEle ).draggable({
			inertia: true,		// enable inertial throwing
			restrict: {			// keep the element within the area of it's parent
			  //restriction: "parent",
			  endOnly: true,
			  elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
			},
			// call this function on every dragmove event
			onmove: dragMoveListener,
			
			// call this function on every dragend event
			onend: resetPosition
		});
	}

	/**
	 * Initialize Dropzone
	 * @Memberof MOD_INTERACT
	 * @Private
	 * @Function initializeDropzone
	 */
	function initializeDropzone(){
		
		interact( _options.dropzoneEle ).dropzone({
			accept: _options.dragEle,	// only accept elements matching this CSS selector
			overlap: 0.0001, 			// Require a 1% element overlap for a drop to be possible

			// listen for drop related events:
			ondropactivate: function (event) {
				// add active dropzone feedback
				event.target.classList.add('drop-active');
			},
			ondragenter: function (event) {
				var draggableElement = event.relatedTarget,
					dropzoneElement = event.target;

				// feedback the possibility of a drop
				dropzoneElement.classList.add('drop-target');
				draggableElement.classList.add('can-drop');
			},
			ondragleave: function (event) {
				// remove the drop feedback style
				event.target.classList.remove('drop-target');
				event.relatedTarget.classList.remove('can-drop');
			},
			ondrop: function (event) {
				var id = event.relatedTarget.getAttribute("data-id");

				absorbDragDrop( event );
				CART.addItem( id );
			},
			ondropdeactivate: function (event) {
				// remove active dropzone feedback
				event.target.classList.remove('drop-active');
				event.target.classList.remove('drop-target');
			}
		});
	}

	/**
	 * Drag Move Listener
	 * @Memberof MOD_INTERACT
	 * @Private
	 * @Function dragMoveListener
	 * @Param {Object} event
	 */
	function dragMoveListener ( event ) {
		var target = event.target,
			// keep the dragged position in the data-x/data-y attributes
			x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
			y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// translate the element
		target.style.webkitTransform =
		target.style.transform =
		  'translate(' + x + 'px, ' + y + 'px)';
		
		if( target.className.search("dragging") < 0 ){

			$(".thmb").addClass( "faded" );
			// add status class
			target.classList.add('dragging');
		}

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}

	/**
	 * Reset the position of the DOM element that was dragged
	 * @Memberof MOD_INTERACT
	 * @Private
	 * @Function resetPosition
	 * @Param {Object} event
	 */
	function resetPosition ( event ) {
		// reset position of target
		var target = event.target,
			x = 0,
			y = 0;

		target.style.webkitTransform =
		target.style.transform =
		  'translate(' + x + 'px, ' + y + 'px)';

		// remove dragging status class
		$(".thmb").removeClass( "faded" );
		target.classList.remove('dragging');
		target.classList.remove('can-drop');
		target.classList.remove('drop-absorb');

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}

	/**
	 * Absorb drag and drop on the dropzon
	 * @Memberof MOD_INTERACT
	 * @Private
	 * @Function absorbDragDrop
	 * @Param {Object} event
	 * @Description Scale DOM element and fade out once it is dropped in the dropzone
	 */
	function absorbDragDrop ( event ) {
		// reset position of target
		var target = event.relatedTarget;

		// remove dragging status class
		target.classList.add('drop-absorb');
	}

	/**
	 * Reveal public functions
	 * @Memberof MOD_INTERACT
	 * @Public
	 * @Returns {Function} init()
	 */
	return {
		init: _init
	};

}( MOD_INTERACT || jQuery, window, CART ));