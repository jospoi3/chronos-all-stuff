/*
----------------------------------------------------------------
Module: Chronos.js
Description: jQuery pour le projet Chronos
Auteur: Thundra
Version: 1.0.0
Dernière modification: 295 mai 2015
----------------------------------------------------------------
*/


$('.btn').click(
	function (e) {
		e.preventDefault();
	
		$('.content-section-wrapper').hide();
		$(this).next('.content-section-wrapper').show();
	}
);

$('.content-section-wrapper').hide();