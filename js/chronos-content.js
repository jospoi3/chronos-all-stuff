/*
----------------------------------------------------------------
Module: Chronos.js
Description: jQuery pour le projet Chronos
Auteur: Thundra
Version: 1.0.0
Dernière modification: 295 mai 2015
----------------------------------------------------------------
*/
jQuery( document ).ready(function($) {
$('.btn').click(
	function (e) {
		e.preventDefault();
	
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