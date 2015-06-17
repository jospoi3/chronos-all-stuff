/*
----------------------------------------------------------------
Module: Main
Description: Initialisation des modules
Auteur: Libéo
Version: 1.0.0
Dernière modification: 5 février 2015
----------------------------------------------------------------
*/

var App = (function(App, $, window, document, undefined) {

    // Initialisation du quiz
	$(function() {
	   App.Quiz.init();
	   App.Scorm.init();
	});

    return App;

})(App || {}, jQuery, window, document);
