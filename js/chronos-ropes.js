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
					connector:[ "Flowchart", { stub:[15, 15], gap:1 } ],
		        	anchors:["TopCenter", "BottomCenter"],  
		        	paintStyle:paintStyle,
		        	hoverPaintStyle:hoverPaintStyle,
		        	endpointStyle:endpointStyle,
		        	overlays:[ ["PlainArrow", {location:1,direction:1,width: 1,length: 1}] , ],
			}

			var bottom_to_top = {
					connector:[ "Flowchart", { stub:[15, 15], gap:5 } ],
					anchors:["BottomCenter", "TopCenter"],  
					paintStyle:paintStyle,
		        	hoverPaintStyle:hoverPaintStyle,
		        	endpointStyle:endpointStyle,
		        	overlays:[ ["PlainArrow", {location:1,direction:1,width: 1,length: 1}] , ],
			};
					        						        					 	    
//var connection1 = jsPlumb.connect({ source:"btn2", target:"htl-zone2",}, top_to_bottom);

var connection2 = jsPlumb.connect({ source:"btn2", target:"htl-zone2",}, top_to_bottom);
		
		}
	};	
})();