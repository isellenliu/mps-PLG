/*** ResizeUtil ***/
if (typeof (ResizeUtil) == "undefined") {
  ResizeUtil = {};
}

(function() {
  ResizeUtil.doResize = function() {
    var $el = $("#very-specific-design");
    var elHeight = $el.outerHeight();
    var elWidth = $el.outerWidth();

    var $wrapper = $("#scaleable-wrapper");
    $wrapper.css("height", window.innerHeight);
    $wrapper.css("width", window.innerWidth);

    $wrapper.resizable({
      resize: doResize
    });

    function doResize(event, ui) {
      
      var scale, origin;
      
      scale = Math.min(
      ui.size.width / elWidth,    
      ui.size.height / elHeight
      );
      
      $el.css({
      transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
      });
      
    }

    var starterData = { 
      size: {
      width: $wrapper.width(),
      height: $wrapper.height()
      }
    }
    doResize(null, starterData);
  };
})();
