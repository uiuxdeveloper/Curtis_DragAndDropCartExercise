/**
 * Products
 * @Author Curtis M. Janczak
 * @Version 0.1
 * @Namespace PRODUCTS
 * @Param {Object} $
 * @Param {Object} window
 * @Param {Object} document
 */
 var PRODUCTS = ( function ( $, window, document ) {

 	/**
 	 * Params
 	 * Private
 	 * @Memberof PRODUCTS
 	 * @Param {Boolean} inited
 	 * @Param items
 	 * @Param subtotal
 	 * @Param {Object} storage
 	 * @Param {Object} _options
 	 */
 	var inited = false;
	var _options = {
		eleClass: ".product",
		randomMax: 20
	};

	/**
	 * Initialize Products
	 * @Memberof PRODUCTS
	 * @Private
	 * @Function init
	 */
	function _init(){
		if(!inited){
			_updateProducts();
			inited = true;
		}
	}

	/**
	 * Update Products Default Quantity
	 * @Memberof PRODUCTS
	 * @Private
	 * @Function updateProducts
	 * @Description
	 * Update input fields of each product displayed on the page
	 */
	function _updateProducts(){
		var newVal = 1;
		var products = $( _options.eleClass );

		// loop through products and update DOM
		$.each( products, function(){
			newVal = Math.floor((Math.random() * _options.randomMax ) + 1 );
			
			$(this).find( "input" ).val( newVal )
		});
	}

	/**
	 * Reveal public functions
	 * @Memberof PRODUCTS
	 * @Public
	 * @Returns {Function} init()
	 * @Returns {Function} updateProducts()
	 */
	return {
		init: _init,
		updateProducts: _updateProducts
	};

}( PRODUCTS || jQuery, window, document ));