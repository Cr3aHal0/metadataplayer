/* the widget classes and definitions */

/**
 * @class IriSP.Widget is an "abstract" class. It's mostly used to define some properties common to every widget.
 *
 *  Note that widget constructors are never called directly by the user. Instead, the widgets are instantiated by functions
 *  defined in init.js
 *
 * @constructor
 * @param player - a reference to the player widget
 * @param config - configuration options for the widget
 */
IriSP.Widget = function(player, config) {

    if( typeof player === "undefined") {
        /* Probably an abstract call of the class when
         * individual widgets set their prototype */
        return;
    }
    
    /* Setting all the configuration options */
    var _type = config.type,
        _config = IriSP._.defaults({}, config, _player.config.gui.default_options, IriSP.widgetsDefaults[_type]),
        _this = this;
    
    /* Creating containers if needed */
    if (typeof _config.container === "undefined") {
        var _divs = _player.layoutDivs(_type);
        _config.container = _divs[0];
        _config.spacer = _divs[1];
    }
    
    IriSP._(_config).forEach(function(_value, _key) {
       _this[_key] = _value;
    });
    
    /* Setting this.player at the end in case it's been overriden
     * by a configuration option of the same name :-(
     */
    this.player = player;
    
    /* Getting metadata */
    this.source = _player.loadMetadata(this.metadata);
    
    /* Call draw when loaded */
    this.source.onLoad(function() {
        _this.draw();
    })
   
    /* Adding classes and html attributes */
    this.selector = IriSP.jQuery(this.container);
    this.selector.addClass("Ldt-TraceMe").addClass("Ldt-Widget").attr("widget-type", _type);
    
    /* Does the widget require other widgets ? */
    if (typeof this.requires !== "undefined") {
        for (var _i = 0; _i < this.requires.length; _i++) {
            var _subconfig = this.requires[_i],
                _div = IriSP.jQuery('<div>');
            _subconfig.container = IriSP.guid(this.container + '_' + _subconfig.type + '_');
            _div.id = _subconfig.container;
            this.selector.append(_div);
            this[_subconfig.type] = new IriSP.Widgets(_player, _subconfig);
        }
    }
    
};

/**
 * This method responsible of drawing a widget on screen.
 */
IriSP.Widget.prototype.draw = function() {
    /* implemented by "sub-classes" */
};
/**
 * Optional method if you want your widget to support redraws.
 */
IriSP.Widget.prototype.redraw = function() {
    /* implemented by "sub-classes" */
};
