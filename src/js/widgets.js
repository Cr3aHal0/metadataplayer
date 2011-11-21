/* the widget classes and definitions */

IriSP.Widget = function(Popcorn, config, Serializer) {

  if (config === undefined || config === null) {
    config = {}
  }
  
  this._Popcorn = Popcorn;
  this._config = config;  
  this._serializer = Serializer;
  
  if (config.hasOwnProperty("container")) {
     this._id = config.container;
     this.selector = IriSP.jQuery("#" + this._id);
  }

  if (config.hasOwnProperty("spacer")) {
     this._spacerId = config.spacer;
     this.spacer = IriSP.jQuery("#" + this._spacerId);
  }


  if (config.hasOwnProperty("width")) {
     // this.width and not this._width because we consider it public.
     this.width = config.width;     
  }
  
  if (config.hasOwnProperty("height")) {    
     this.height = config.height;     
  }
  
  if (config.hasOwnProperty("heightmax")) {
     this.heightmax = config.heightmax;     
  }

  if (config.hasOwnProperty("widthmax")) {
     this.widthmax = config.widthmax;     
  }
  
};

IriSP.Widget.prototype.draw = function() {
  /* implemented by "sub-classes" */  
};

IriSP.Widget.prototype.redraw = function() {
  /* implemented by "sub-classes" */  
};
