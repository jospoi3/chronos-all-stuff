/*
----------------------------------------------------------------
Module: Popup
Description: Ce module gère l'affichage des boites d'information
Auteur: Libéo
Version: 1.0.0
Dernière modification: 5 février 2015
----------------------------------------------------------------
*/

var App = (function(App, $, window, document, undefined) {

    App.Popup = {

        /**
         * Affiche une nouvelle popup
         * @param  {string} html    Contenu à afficher dans la popup
         * @param  {object} options Options de la popup
         * @return {null}
         */
        create: function(html, options) {
            // Options par défaut
            this.config = $.extend({
                markup: '<div class="popup {{classes}}"><div class="popup-wrapper">{{content}}</div></div>',
                buttons: [],
                deleteExisting: true,
                classes: '',
                draggable: true,
                resizable: true,
                position: {
                    left: 'center',
                    top: 'center'
                },
                referer: null,
                closeCallback: $.noop
            }, options);

            var popup = $(this.config.markup.replace('{{content}}', html).replace('{{classes}}', this.config.classes));

            if (this.config.deleteExisting) {
                this.deleteAll();
            }

            this.createCloseButton(popup);
            this.createGuardButton(popup);

            if (this.config.buttons.length > 0) {
                this.createActionButtons(popup, this.config.buttons);
            }

            popup.appendTo('body');

            this.positionPopup(popup, {
                left: this.config.position.left,
                top: this.config.position.top
            });

            popup.find('.popup-wrapper').attr('tabindex', '-1').focus();
        },

        /**
         * Positionne la boite d'information
         * @param  {object} popup
         * @return {null}
         */
        positionPopup: function(popup, position) {
            var width = popup.outerWidth(),
                height = popup.outerHeight();

            popup.css({
                left: position.left === 'center' ? $(window).width() / 2 - width / 2 : position.left,
                top: position.top === 'center' ? $(window).height() / 2 - height / 2 : position.top,
                minWidth: width + 1,
                minHeight: height
            });

            if (this.config.resizable) {
                popup.resizable({
                    handles: 'all',
                    minWidth: width,
                    minHeight: height
                });
            }

            if (this.config.draggable) {
                if ($('html').hasClass('ie')) {
                    popup.draggable();
                } else {
                    popup.draggable({
                        containment: 'parent'
                    });
                }
            }

        },

        /**
         * Crée un bouton pour fermer la boite d'information
         * @param  {object} popup
         * @return {null}
         */
        createActionButtons: function(popup, buttons) {
            popup.find('.popup-wrapper').append('<div class="popup-buttons"></div>');
            var buttonsContainer = popup.find('.popup-buttons');

            _.each(buttons, $.proxy(function(button) {
                var markup = '<button class="' + button.class + '">' + button.label + '</button>';
                $(markup).appendTo(buttonsContainer).on('click', $.proxy(function() {
                    button.action(popup);
                    this.config.referer.focus();
                }, this));
            }, this));
        },

        /**
         * Crée un bouton pour fermer la boite d'information
         * @param  {object} popup
         * @return {null}
         */
        createCloseButton: function(popup) {
            popup.append('<button class="popup-close"><img src="img/close.png" alt="Fermer"></button>');
            popup.find('.popup-close').on('click', $.proxy(function() {
                this.delete(popup);
                this.config.referer.focus();
            }, this));
        },

        /**
         * Crée les boutons de garde pour l'accessibilité
         * @param  {object} popup
         * @return {null}
         */
        createGuardButton: function(popup) {
            var guard = '<button class="guard"></button>';
            popup.prepend(guard).append(guard);
            popup.find('.guard').on('focus', $.proxy(function() {
                this.delete(popup);
                this.config.referer.focus();
            }, this));
        },

        /**
         * Supprime la boite affichée
         * @return {null}
         */
        delete: function(popup) {
            popup.remove();
            this.config.closeCallback();
        },

        /**
         * Supprime toutes les boites affichées
         * @return {null}
         */
        deleteAll: function() {
            $('body > .popup').remove();
            this.config.closeCallback();
        }
    };

    return App;

})(App || {}, jQuery, window, document);
