/*
----------------------------------------------------------------
Module: Chronos.js
Description: jQuery pour le projet Chronos
Auteur: Thundra
Version: 1.0.0
Dernière modification: 29 mai 2015
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
			
			//$( '.main-content' ).empty();
			//$( '.main-content' ).load( "content/" + target + ".html");
			//$.getScript('js/chronos-content.js');
			
		
			$('.content-wrapper').hide();
			$('.sub-content').hide();
			$('.navL2').show();
			$('#' + target + "-content").show();
			
			var testID = $('#' + target + "-content").find('.content-section-wrapper').attr('id');
			//alert(testID);
			
			$('.content-section-wrapper').hide();
			$('#' + testID).show();
			
			var contentSectionHeight = $('#' + target + "-content").find('.content-section-wrapper').height();
			var contentSectionPaddingBottom = 48;
			$("main").css('padding-bottom', contentSectionHeight + contentSectionPaddingBottom );
			
			
			
			
		} else {// Mobile view
			$('.mobile-content').hide();
			//$('#' + target).load( "content/" + target + ".html");
			$('#' + target).show();
			//$.getScript('js/chronos-content.js');
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

$('.btn.navL2').click(
	function (e) {
		e.preventDefault();
		
		var contentSectionHeight = $(this).next('.content-section-wrapper').height();
		var contentSectionPaddingBottom = 48;
		$("main").css('padding-bottom', contentSectionHeight + contentSectionPaddingBottom );
	
		$('.content-section-wrapper').hide();
		$(this).next('.content-section-wrapper').show();
	}
);

$('.content-section-wrapper li a').click(
	function (e) {
		e.preventDefault();

		var target = '#' + $(this).attr('data');
		
		//alert("Nous voulons voir : " + target);
		
		$('.navL2').hide();
		$('.content-section-wrapper').hide();
		$(target).show();
		
	}
);

$('.sub-content-back-btn').click(
	function (e) {
		e.preventDefault();
		
		var targetToHide = '#' + $(this).parent().attr('id');
		var targetToShow = '#' + $(this).attr('data');
	
		//alert("On va cacher: " + targetToHide + " et on va montrer: " + targetToShow);
		
		$(targetToHide).hide();
		$('.navL2').show();
		$(targetToShow).show();

	}
);

$(".fancybox").fancybox();


});
