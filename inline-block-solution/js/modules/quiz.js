/*
-----------------------------------------------
Module: Quiz
Description: Ce module gère l'ensemble du quiz
Auteur: Libéo
Version: 1.0.0
Dernière modification: 10 février 2015
-----------------------------------------------
*/

var App = (function(App, $, window, document, undefined) {

    App.Quiz = {

        /**
         * Résultats du quiz
         * @type {Object}
         */
        score: {
            goodAnswers: 0,
            total: 0
        },

        /**
         * Module configuration
         * @type {Object}
         */
        config: {
            skipContentSelector: '.skip-content-link',
            formSelector: '.quiz-section',
            guideTriggerSelector: '.guide-trigger',
            guideContentSelector: '.guide-content',
            infoboxSelector: '.aside-section-content',
            infoboxTriggerSelector: '.aside-section-trigger',
            submitSelector: '.quiz-submit',
            resetSelector: '.quiz-reset',
            tabSelector: '.quiz-section-wrapper',
            tagTriggerSelector: '.quiz-section-trigger',
            quizWrapperSelector: '.quiz-wrapper'
        },

        /**
         * Initialisation du module
         * @return {null}
         */
        init: function() {
            this.createButtons();
            this.bindClickEvents();
            this.bindZoomEvents();
        },

        /**
         * Affecte des fonctions à des événements de click
         * @return {null}
         */
        bindClickEvents: function() {
            var self = this,
                guideTrigger = $(this.config.guideTriggerSelector),
                tabTriggers = $(this.config.tagTriggerSelector),
                infoboxTriggers = $(this.config.infoboxTriggerSelector),
                submit = $(this.config.submitSelector),
                reset = $(this.config.resetSelector),
                skipContent = $(this.config.skipContentSelector);

            tabTriggers.on('click', function(e) {
                var index = 0;
                for (var i = 0; i < tabTriggers.length; i++) {
                    if (tabTriggers[i] === this) index = i;
                }
                self.displayTab(index);
                self.focusTab(index);

                e.preventDefault();
            });

            infoboxTriggers.on('click', function(e) {
                var index = 0;
                for (var i = 0; i < infoboxTriggers.length; i++) {
                    if (infoboxTriggers[i] === this) index = i;
                }
                $('body > .popup').remove();
                self.displayInfobox(index);
                e.preventDefault();
            });

            guideTrigger.on('click', $.proxy(function(e) {
                this.showGuide();
                e.preventDefault();
            }, this));

            submit.on('click', $.proxy(function(e) {
                this.validate();
                e.preventDefault();
            }, this));

            reset.on('click', $.proxy(function(e) {
                this.reset();
                e.preventDefault();
            }, this));

            skipContent.on('click', $.proxy(function(e) {
                this.skipContent();
                e.preventDefault();
            }, this));
        },

        /**
         * Affecte des fonctions à des événements de zoom
         * @return {null}
         */
        bindZoomEvents: function() {
            $(document).on('fontresize', $.proxy(function() {
                this.resizeLayout();
            }, this));
        },

        /**
         * Affiche un onglet du quiz
         * @param  {int} index  Position de l'onglet à afficher
         * @return {null}
         */
        displayTab: function(index) {
            var tabs = $(this.config.tabSelector),
                triggers = $(this.config.tagTriggerSelector),
                forms = $(this.config.formSelector);

            tabs.hide().eq(index).show();
            forms.removeClass('is-active').eq(index).addClass('is-active');
            triggers.removeClass('is-active').eq(index).addClass('is-active');
            window.location.hash = index;
        },

        /**
         * Focus sur un onglet du quiz
         * @param  {int} index  Position de l'onglet sur lequel focuser
         * @return {null}
         */
        focusTab: function(index) {
            var forms = $(this.config.formSelector);
            forms.eq(index).find(this.config.tabSelector).attr('tabindex', '-1').focus();
        },

        /**
         * Affiche un onglet du quiz
         * @param  {int} index  Position de l'onglet à afficher
         * @return {null}
         */
        displayInfobox: function(index) {
            var infoboxes = $(this.config.infoboxSelector),
                triggers = $(this.config.infoboxTriggerSelector),
                currentInfobox = infoboxes.eq(index);

            this.createInfobox(currentInfobox, triggers.eq(index));
        },

        /**
         * Positionne la boite d'information
         * @param  {object} infobox  Boite à positionner
         * @param  {object} trigger  Bouton qui correspond à la boite pour référence de position
         * @return {null}
         */
        createInfobox: function(infobox, trigger) {
            var left = trigger.offset().left - infobox.outerWidth() - 5,
                top = trigger.offset().top;

            if ($(window).width() < 768) {
                left = 'center';
                top = 'center';
            }

            App.Popup.create(infobox.html(), {
                referer: trigger,
                deleteExisting: false,
                position: {
                    left: left,
                    top: top
                }
            });
        },

        /**
         * Crée les boutons pour changer d'onglet
         * @return {null}
         */
        createButtons: function() {
            var triggers = $(this.config.tagTriggerSelector);
            triggers.buttonize();
            this.resizeLayout();
        },

        /**
         * Repositionne les éléments du layout
         * @return {null}
         */
        resizeLayout: function() {
            var quizWrapper = $(this.config.quizWrapperSelector),
                triggers = $(this.config.tagTriggerSelector);

            var maxHeight = $(_.max(triggers, function(trigger) {
                return $(trigger).outerHeight();
            })).outerHeight();

            quizWrapper.css('padding-top', (maxHeight - 1) + 'px');
            this.positionButtons();
        },

        /**
         * Position les boutons pour changer d'onglet
         * @return {null}
         */
        positionButtons: function() {
            var triggers = $(this.config.tagTriggerSelector),
                offset = 0;
            // Positionne chaque bouton dans le haut quiz
            $.map(triggers, $.proxy(function(trigger, index) {
                // Position le bouton actuel selon le offset
                $(trigger).css('left', offset);
                // Incrémente le offset de la largeur du bouton actuel
                offset = parseInt(offset) + $(trigger).outerWidth();
            }, this));
        },

        /**
         * Affiche le guide virtuel
         * @return {null}
         */
        showGuide: function() {
            var html = $(this.config.guideContentSelector).html();
            App.Popup.create(html, {
                referer: $(this.config.guideTriggerSelector),
                classes: 'popup-guide',
                draggable: false,
                resizable: false
            });
        },

        /**
         * Validation du quiz
         * @return {null}
         */
        validate: function() {
            var form = $(this.config.formSelector + '.is-active'),
                message;

            if (!this.isFormCompleted(form)) {
                App.Popup.create('Vous devez terminer l\'activité avant de cliquer sur le bouton Valider.', {
                    referer: $(this.config.submitSelector)
                });
            } else if (!form.data('completed')) {
                var result = this.validateForm(form);
                message = '<strong>Vous avez eu ' + result.goodAnswers + ' sur ' + result.total + '.</strong>' +
                    '<br>Votre score total est ' + this.score.goodAnswers + ' sur ' + this.score.total + ' (' + Math.ceil(this.score.goodAnswers / this.score.total * 100) + '%).';
                App.Popup.create(message, {
                    referer: $(this.config.submitSelector)
                });
            } else {
                message = 'Vous avez déjà complété cette activité.' +
                    '<br>Votre score total est ' + this.score.goodAnswers + ' sur ' + this.score.total + ' (' + Math.ceil(this.score.goodAnswers / this.score.total * 100) + '%).';
                App.Popup.create(message, {
                    referer: $(this.config.submitSelector)
                });
            }
        },

        /**
         * Valide si le formulaire est rempli
         * @param  {object} form Formulaire à valider
         * @return {bool} Validité du formulaire
         */
        isFormCompleted: function(form) {
            var rows = form.find('.tr:not(.thead)'),
                emptyFields = 0;

            _.each(rows, function(row) {
                if ($(row).find('input[type="radio"]:checked').length === 0) {
                    emptyFields++;
                }
            });

            return emptyFields === 0 ? true : false;
        },

        /**
         * Valide les réponse d'un formulaire
         * @param  {object} form Formulaire à valider
         * @return {object} Résultat de la validation
         */
        validateForm: function(form) {
            var rows = form.find('.tr:not(.thead)'),
                score = this.score,
                goodAnswers = 0,
                total = 0;

            _.each(rows, function(row) {
                var inputs = $(row).find('input[type="radio"]');
                inputs.removeAttr('style');
                _.each(inputs, function(input) {
                    var $input = $(input),
                        answer = $(input).data('answer');
                    if (answer) {
                        $input.css('outline', '2px solid green');
                    }
                    if (!answer && $input.is(':checked')) {
                        $input.css('outline', '2px solid red');
                        $input.append('<span class="score-label visuallyhidden">Mauvaise réponse</span>');
                    }
                    if (answer && $input.is(':checked')) {
                        goodAnswers++;
                        score.goodAnswers++;
                        $input.append('<span class="score-label visuallyhidden">Bonne réponse</span>');
                    }
                    $input.attr('disabled', 'disabled');
                });
                total++;
                score.total++;
            });

            form.data('completed', true);

            return {
                goodAnswers: goodAnswers,
                total: total
            };
        },

        /**
         * Met le formulaire à jour avec les données du JSON
         * @return {null}
         */
        displayJSON: function(json) {
            var forms = $(this.config.formSelector);

            if (json === 'null' || !json) return false;

            _.each(forms, function(form) {
                var inputs = $(form).find('input[type="radio"]');
                _.each(inputs, function(input) {
                    var find = _.find(json.data, {
                        id: $(input).attr('id')
                    });

                    if (find.value) {
                        $(input).prop('checked', true);
                    } else {
                        $(input).removeAttr('checked');
                    }
                });
            });
        },

        /**
         * Crée un object au format JSON avec les valeurs des champs du formulaire
         * @return {null}
         */
        createJSON: function() {
            var score = this.score,
                json = {
                    data: [],
                    score: {
                        goodAnswers: 0,
                        total: 0
                    }
                },
                forms = $(this.config.formSelector);

            _.each(forms, function(form) {
                var $form = $(form),
                    inputs = $form.find('input[type="radio"]');
                _.each(inputs, function(input) {
                    var id = $(input).attr('id'),
                        value = $(input).is(':checked');

                    json.data.push({
                        id: id,
                        value: value
                    });
                });
            });

            json.score.goodAnswers += score.goodAnswers;
            json.score.total += score.total;

            return JSON.stringify(json);
        },

        /**
         * Reset du quiz
         * @return {null}
         */
        reset: function() {
            App.Popup.create('Voulez-vous vraiment effacer votre réponse?', {
                referer: $(this.config.resetSelector),
                buttons: [{
                    label: 'Non',
                    class: 'is-no is-default',
                    action: function(popup) {
                        popup.remove();
                    }
                }, {
                    label: 'Oui',
                    class: 'is-yes',
                    action: $.proxy(function(popup) {
                        popup.remove();
                        $(this.config.formSelector + '.is-active').trigger('reset').find('input[type="radio"]').each(function(index, input) {
                            $(input).removeAttr('style').removeAttr('disabled').removeAttr('checked');
                        });
                    }, this)
                }]
            });
        },

        /**
         * Focus le contenu principal de la page
         * @return {null}
         */
        skipContent: function() {
            var quiz = $(this.config.quizWrapperSelector);
            quiz.find(':focusable').eq(0).focus();
        },

        /**
         * Helpers
         * @type {Object}
         */
        helpers: {

            /**
             * Transforme une valeur px en rem
             * @param  {int/string} value  Valeur en px
             * @return {int}  Valeur en rem
             */
            rem: function(value) {
                var html = document.getElementsByTagName('html')[0];
                return (parseInt(value) / parseInt(window.getComputedStyle(html).fontSize));
            }
        }
    };

    return App;

})(App || {}, jQuery, window, document);
