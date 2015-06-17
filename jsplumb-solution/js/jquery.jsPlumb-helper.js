/*
 *  This file contains the JS that handles the first init and also switching between render modes.
 */
 
jsPlumb.bind("ready", function() {

	jsPlumb.ChronosList.init();
	
	
	// This makes component class elements draggabble
	//jsPlumb.draggable($(".btn"));

	// chrome fix.
	document.onselectstart = function () { return false; };				

    // render mode
	var resetRenderMode = function(desiredMode) {
		var newMode = jsPlumb.setRenderMode(desiredMode);
		$(".rmode").removeClass("selected");
		$(".rmode[mode='" + newMode + "']").addClass("selected");		
		
		$(".rmode[mode='canvas']").attr("disabled", !jsPlumb.isCanvasAvailable());
		$(".rmode[mode='svg']").attr("disabled", !jsPlumb.isSVGAvailable());
		$(".rmode[mode='vml']").attr("disabled", !jsPlumb.isVMLAvailable());
					
		jsPlumbChronos.init();
	};
     
	$(".rmode").bind("click", function() {
		var desiredMode = $(this).attr("mode");
		if (jsPlumbChronos.reset) jsPlumbChronos.reset();
		jsPlumb.reset();
		resetRenderMode(desiredMode);					
	});

	resetRenderMode(jsPlumb.SVG);
       
}); 