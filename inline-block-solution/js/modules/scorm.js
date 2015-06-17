/*
-----------------------------------------------
Module: Scorm
Description: Ce module gère la communication avec l'API Scorm
Auteur: Libéo
Version: 1.0.0
Dernière modification: 10 février 2015
-----------------------------------------------
*/

var App = (function(App, $, window, document, undefined) {

    /**
     * Objet représentant l'application global
     * @type {Object}
     */
	var root = App;

	App.Scorm = {

        /**
         * Initialisation du module
         * @return {null}
         */
		init: function() {
			this.startTime;
			this.bindWindow();
			this.bindValidate();
		},

        /**
         * Affecte des fonctions à des événements sur la window
         * @return {null}
         */
		bindWindow: function() {
			$(window).on({
				load: $.proxy(function() { 
					this.initCourse(); 
				}, this),
				beforeunload: $.proxy(function() { 
					this.exitCourse(); 
				}, this)
			})
		},

        /**
         * Affecte la fonction de validation à l'événement de click du bouton de validation
         * @return {null}
         */		
		bindValidate: function() {
			$('.quiz-section').on('click', '.quiz-submit', $.proxy(function() { 
				this.validateCourse(); 
			}, this));
		},

        /**
         * Initialisation du cours
         * @return {null}
         */
		initCourse: function() {
			pipwerks.SCORM.init();

			this.startTime = new Date().getTime();

			root.Quiz.displayTab((this.getBookmark() !== 'null' || !this.getBookmark()) ? this.getBookmark() : 0);

			root.Quiz.displayJSON(JSON.parse(pipwerks.SCORM.get('cmi.suspend_data')));
		},

        /**
         * Quitte le cours
         * @return {null}
         */
		exitCourse: function() {
			var stopTime = new Date().getTime();

			this.validateCourse();
			this.setBookmark($('.quiz-section-trigger.is-active'));

			pipwerks.SCORM.set('cmi.session_time', this.secs2iso(stopTime - this.startTime));

			pipwerks.SCORM.set('cmi.exit', 'suspend');

    		pipwerks.SCORM.quit();
		},

        /**
         * Valide le quiz
         * @return {null}
         */
		validateCourse: function() {
			var score = root.Quiz.score.goodAnswers/root.Quiz.score.total;

			pipwerks.SCORM.set('cmi.suspend_data', root.Quiz.createJSON());

			pipwerks.SCORM.save();

			if (!isNaN(score)) pipwerks.SCORM.set('cmi.score.raw', score * 100);

			pipwerks.SCORM.save();
		},

        /**
         * Met en mémoire l'onglet courant
         * @param  {bookmark} index  Position de l'onglet à garder en mémoire
         * @return {null}
         */
		setBookmark: function(bookmark) {
			pipwerks.SCORM.set('cmi.location', $(bookmark).closest('.quiz-section').index());
			pipwerks.SCORM.save();
		},

        /**
         * Va chercher en mémoire le dernier onglet sélectionné par l'utilisateur
         * @return {index} Position de l'onglet à afficher
         */
		getBookmark: function() {
			return pipwerks.SCORM.get('cmi.location');	
		},

        /**
         * Converti le temps passé dans le cours en format ISO 8601
         * @param  {millisecs} int Temps passé dans le cours en millisecondes
         * @return {int} Résultat en format ISO 8601
         */
		secs2iso: function(millisecs) {
			if (isNaN(millisecs)) return;
			return centisecsToISODuration(Math.round(millisecs/1000) * 100, true);
		}
	};
	
	return App;

})(App || {}, jQuery, window, document);