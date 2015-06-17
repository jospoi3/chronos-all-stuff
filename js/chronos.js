/*
----------------------------------------------------------------
Module: Chronos.js
Description: jQuery pour le projet Chronos
Auteur: Thundra
Version: 1.0.0
Dernière modification: 295 mai 2015
----------------------------------------------------------------
*/

//$(window).resize(function(){location.reload();});
jQuery( document ).ready(function($) {
$('#fluid-boxed-toggle').click(function() {
	
	var maxWidthValue = $('#wrapper').css('max-width')
		//alert(maxWidthValue);
	if(  maxWidthValue == '996px' ) {
	  	$('#wrapper').css('max-width', 'none');
	  	$('#fluid-boxed-toggle').text('CHANGER POUR BOXED LAYOUT');
  	} else {
	  	$('#wrapper').css('max-width', '996px');
	  	$('#fluid-boxed-toggle').text('CHANGER POUR FLUID LAYOUT');
  	}

});

$('.era-btn').click(
	function () {
				
		var target = $(this).attr('data');
		var windowWidth = $( window ).width();
		
		//alert(windowWidth);
		
		// Desktop view
		if(windowWidth > 767) {
			$( '.main-content' ).empty();
			$( '.main-content' ).load( "content/" + target + ".html");
			$.getScript('js/chronos-content.js');
			
		} else {// Mobile view
			$('.mobile-content').hide();
			$('#' + target).load( "content/" + target + ".html");
			$('#' + target).show();
			$.getScript('js/chronos-content.js');
		}
				
	}
);

// follow mouse position to determine tooltip x position
$('.tooltip').mousemove(
	function(e) {

		var divOffset = $(this).offset();
		var relX = e.pageX - divOffset.left - 60;
		
		$(this).find('span').css('left', relX + 'px');
	}
);

$(".fancybox").fancybox();
});