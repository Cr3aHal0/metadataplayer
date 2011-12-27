IriSP.ArrowWidget = function(Popcorn, config, Serializer) {
  IriSP.Widget.call(this, Popcorn, config, Serializer);

  this._oldAnnotation = null;
  
};


IriSP.ArrowWidget.prototype = new IriSP.Widget();

IriSP.ArrowWidget.prototype.clear = function() {

};

IriSP.ArrowWidget.prototype.clearWidget = function() {
};

IriSP.ArrowWidget.prototype.draw = function() {
  var templ = Mustache.to_html(IriSP.arrowWidget_template, {});
  this.selector.append(templ);
  this._Popcorn.listen("timeupdate", IriSP.wrap(this, this.timeUpdateHandler));
};

IriSP.ArrowWidget.prototype.timeUpdateHandler = function(percents) {
  var currentTime = this._Popcorn.currentTime();
  var currentAnnotation = this._serializer.currentAnnotations(currentTime)[0]; // FIXME : use the others ?

  /* move the arrow only if the current annotation changes */
  if (currentAnnotation != this._oldAnnotation) {
    var begin = (+ currentAnnotation.begin) / 1000;
    var end = (+ currentAnnotation.end) / 1000;

    var duration = +this._serializer.currentMedia().meta["dc:duration"] / 1000;
    var middle_time = (begin + end) / 2;
    var percents = Math.floor((middle_time / duration) * 100);

    // we need to apply a fix because the arrow has a certain length
    // it's half the length of the arrow (27 / 2). We need to convert
    // it in percents though.
    var totalWidth = this.selector.width();
    var correction = ((27 / 2) / totalWidth) * 100;
    var corrected_percents = percents - correction;

    /* don't move out of the screen */
    if (corrected_percents <= 0)
      corrected_percents = 0;

    if (corrected_percents <= 5) {
      var left_edge_img_templ = IriSP.templToHTML("url('{{img_dir}}/left_edge_arrow.png')"); 
      this.selector.children(".Ldt-arrowWidget").css("background-image", left_edge_img_templ); 
    } else if (corrected_percents >= 95) {
      var right_edge_img_templ = IriSP.templToHTML("url('{{img_dir}}/right_edge_arrow.png')"); 
      this.selector.children(".Ldt-arrowWidget").css("background-image", right_edge_img_templ);
    } else {
      var img_templ = IriSP.templToHTML("url('{{img_dir}}/arrow.png')"); 
      this.selector.children(".Ldt-arrowWidget").css("background-image", img_templ);
    }
    
    this.selector.children(".Ldt-arrowWidget").animate({"left" : corrected_percents + "%"});

    this._oldAnnotation = currentAnnotation;
  }
}
