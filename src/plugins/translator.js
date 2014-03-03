game.module(
        'plugins.translator'
    )
    .require(
        'engine.core'
    )
    .body(function () {

        game.Translator = game.Class.extend({

            init: function () {
                this.language = pandaConfig.translatorLanguage || navigator.userLanguage || navigator.language;
                this.fallback = pandaConfig.translatorFallback || 'en';
                var loader = new PIXI.JsonLoader('media/messages.json', true);
                var scope = this;
                loader.on('loaded', function() {
                    scope.messages = loader.json;
                });
                loader.load();
            },

            translate: function (message, params) {
                if (typeof message == 'function') {
                    message = message();
                }
                if(typeof this.messages[this.language] == 'object' ) {
                    if(typeof this.messages[this.language][message] == 'string' ) {
                        var messageLanguage = this.messages[this.language][message];
                    } else {
                        var messageBlock = this.messages[this.language];
                        var blocks = message.split('.');
                        for(var i = 0; i < blocks.length; i++) {
                            messageBlock = messageBlock[blocks[i]];
                        }
                        if(typeof messageBlock == 'string') {
                            var messageLanguage = messageBlock;
                        }
                    }
                }
                if (typeof messageLanguage != 'string') {
                    if(typeof this.messages[this.fallback] == 'object' ) {
                        if(typeof this.messages[this.fallback][message] == 'string' ) {
                            var messageFallback = this.messages[this.fallback][message];
                        } else {
                            var messageBlock = this.messages[this.fallback];
                            var blocks = message.split('.');
                            for(var i = 0; i < blocks.length; i++) {
                                messageBlock = messageBlock[blocks[i]];
                            }
                            if(typeof messageBlock == 'string') {
                                var messageFallback = messageBlock;
                            }
                        }
                    }
                }
                message = messageLanguage || messageFallback || message;
                if(typeof params == 'object') {
                    for(var name in params) {
                        message = message.replace('%' + name + '%', params[name]);
                    }
                }
                return message;
            }

        });

        game.Translator = new game.Translator;

        game.trans = function (message, params) {
            return game.Translator.translate(message, params);
        };

    });