/**
 * Cart
 * @Author Curtis M. Janczak
 * @Version 0.1
 * @Namespace CART
 * @Param {Object} window
 * @Param {Object} document
 */
 var CART = ( function ( window, document ) {

 	/**
 	 * Params
 	 * Private
 	 * @Memberof CART
 	 * @Param {Boolean} inited
 	 * @Param items
 	 * @Param subtotal
 	 * @Param {Object} storage
 	 * @Param {Object} _options
 	 */
 	var inited = false;
 	var items=0, subtotal=0;
	var storage = window.storage;
	var _options = {
		dataPath: "/data/",
		itemsEleId: "items",
		subtotalEleId: "subtotal"
	};

	/**
	 * Initialize Cart
	 * @Memberof CART
	 * @Private
	 * @Function init
	 */
	function _init(){
		if(!inited){
			storage.clear();

			setCart();
			
			inited = true;
		}
	}

	/**
	 * Setup default values to local storage and update cart
	 * @Memberof CART
	 * @Private
	 * @Function setCart
	 */
	function setCart(){
		storage.set({ 
			items: 0, 
			subtotal: 0
		}, function(){
			updateCart();
		});
	}

	/**
	 * Add Item to Cart
	 * @Memberof CART
	 * @Private
	 * @Function _addItem
	 * @Param {integer} id
	 */
	function _addItem( id ){

		var url = _options.dataPath + "product-" + id + ".json";

		// query data and get product info
		$.getJSON( url, function( data ){
			if(console) console.log( "Product: " + JSON.stringify( data ) );
		
			// get price
			var price = data.properties.price;
			var quantity = Number(document.getElementById( "qty-" + id ).value);

			// increment items and calculate new subtotal
			items = Number(items) + quantity;
			subtotal = subtotal + (quantity * price);

			// store new values in local storage
			storage.set({
				items: items, 		// increment number of items in cart
				subtotal: subtotal 	// update value of subtotal
			}, function(err) {
				updateCart();		// update cart
			});
		});
	}

	/**
	 * Count items in Cart
	 * @Memberof CART
	 * @Private
	 * @Function _countItems
	 * @Param {Function} callback
	 * @Example countItems( function(){alert( items )} );
	 */
	function _countItems( callback ){
		storage('items', function(err, val){
			items = val

			// return items to callback function if defined
			if( callback ) callback( items );
		});
	}

	/**
	 * Get Cart and update DOM
	 * @Memberof CART
	 * @Private
	 * @Function updateCart
	 */
	function updateCart(){
		storage(['items', 'subtotal'], function(err, col){
			//console.log("Cart Collection - " + JSON.stringify(col));

			//items = col[0];
			//subtotal = col[1];

			//if(console) console.log("Items in Cart: " + items);
			//if(console) console.log("Subtotal of Cart: " + subtotal);
			
			// update DOM Here
			document.getElementById( _options.itemsEleId ).innerHTML = items;
			document.getElementById( _options.subtotalEleId ).value = "$" + subtotal.toFixed(2);
		});
	}

	/**
	 * Reveal public functions
	 * @Memberof CART
	 * @Public
	 * @Returns {Function} init()
	 * @Returns {Function} addItem()
	 * @Returns {Function} countItems()
	 */
	return {
		init: _init,
		addItem: _addItem,
		countItems: _countItems
	};

}( CART || window, document ));