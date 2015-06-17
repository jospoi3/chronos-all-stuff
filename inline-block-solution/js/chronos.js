/*
----------------------------------------------------------------
Module: Chronos.js
Description: jQuery pour le projet Chronos
Auteur: Thundra
Version: 1.0.0
Dernière modification: 295 mai 2015
----------------------------------------------------------------
*/
$(window).resize(function(){location.reload();});

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
		} else {
		// Mobile view
		// todo: toogle ie: check target visibility; 
		//if target visible, slideTargetUp
		//if not visible, slideAllOtherUp and slideTargetDown
			$('.era-mobile-content').hide();
			$( '#' + target ).load( "content/" + target + ".html");
			$('#' + target).show();
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