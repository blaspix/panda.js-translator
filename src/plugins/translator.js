game.module(
    'plugins.translator'
)
.body(function () {

game.Translator = game.Class.extend({
    messages: null,
    fallback: 'en',

    init: function () {
        game.addAsset(game.Translator.file);
        game.trans = game.translate = this.translate.bind(this);
    },

    translate: function (message, params) {
        if(!this.messages) this.messages = game.getJSON(game.Translator.file);

        var messageLanguage, messageBlock, messageFallback, blocks, i;
        if(typeof message === 'function') {
            message = message();
        }
        if(typeof this.messages[game.Translator.lang] === 'object' ) {
            if(typeof this.messages[game.Translator.lang][message] === 'string' ) {
                messageLanguage = this.messages[game.Translator.lang][message];
            } else {
                messageBlock = this.messages[game.Translator.lang];
                blocks = message.split('.');
                for(i = 0; i < blocks.length; i++) {
                    messageBlock = messageBlock[blocks[i]];
                }
                if(typeof messageBlock === 'string') {
                    messageLanguage = messageBlock;
                }
            }
        }
        if(typeof messageLanguage !== 'string') {
            if(typeof this.messages[this.fallback] === 'object' ) {
                if(typeof this.messages[this.fallback][message] === 'string' ) {
                    messageFallback = this.messages[this.fallback][message];
                } else {
                    messageBlock = this.messages[this.fallback];
                    blocks = message.split('.');
                    for(i = 0; i < blocks.length; i++) {
                        messageBlock = messageBlock[blocks[i]];
                    }
                    if(typeof messageBlock === 'string') {
                        messageFallback = messageBlock;
                    }
                }
            }
        }
        message = messageLanguage || messageFallback || message;
        if(typeof params === 'object') {
            for(var name in params) {
                message = message.replace('%' + name + '%', params[name]);
            }
        }
        return message;
    }
});

game.Translator.lang = navigator.userLanguage || navigator.language;
game.Translator.file = 'media/lang.json';

game.plugins.translator = game.Translator;

});