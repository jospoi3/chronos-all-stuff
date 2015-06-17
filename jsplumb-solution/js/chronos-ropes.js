/*
 *	Javascript pour le  workflow de la section "planification" 
 */
;(function() {

	window.jsPlumbChronos = {
	
		init : function() {
			
			
			
			jsPlumb.importDefaults({
				DragOptions : { cursor: "pointer", zIndex:2000 },
				HoverClass:"connector-hover"
			});
	
			var hoverPaintStyle = { strokeStyle:"#000" };
			var paintStyle      = { lineWidth:1, strokeStyle: "#000"};
			var endpointStyle   = { radius:1};

			var top_to_bottom = {
					connector:[ "Straight", { stub:[11, 11], gap:-5 } ],
		        	anchors:["TopCenter", [ 0.5, 0, 0, 0, 11, 0 ]],  
		        	paintStyle:paintStyle,
		        	hoverPaintStyle:hoverPaintStyle,
		        	endpointStyle:endpointStyle,
		        	overlays:[ ["PlainArrow", {location:0,direction:1,width: 1,length: 1}] , ],
			}

			var bottom_to_top = {
					connector:[ "Straight", { stub:[15, 15], gap:5 } ],
					anchors:["BottomCenter", [ 0.5, 0, 0, 0, 12, 0 ]],  
					paintStyle:paintStyle,
		        	hoverPaintStyle:hoverPaintStyle,
		        	endpointStyle:endpointStyle,
		        	overlays:[ ["PlainArrow", {location:1,direction:1,width: 1,length: 1}] , ],
			};
					        						        					 	    
var connection1 = jsPlumb.connect({ source:"btn1", target:"htl-zone1",}, bottom_to_top);
var connection2 = jsPlumb.connect({ source:"btn2", target:"htl-zone2",}, top_to_bottom);
		
	
		}
	};	
})();