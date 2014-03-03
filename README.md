## Panda.js Translator

Panda.js Translator is a plugin for [Panda.js](http://www.pandajs.net/) HTML5 game engine.
The plugin goal is to provide an easy way to translate a game for several languages.

Please donate to help BLASPIX support the ongoing development.
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif "Donate")](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QR5TU7Q8NEANQ)

### Usages

**src/game/main.js**
```
game.module(
    'game.main'
)
.require(
    'engine.core',
    'plugins.translator'
)
.body(function() {

SceneGame = game.Scene.extend({
    backgroundColor: 0x808080,

    init: function() {

        // Basic
        console.log(game.trans("Hello World!"));

        // Tag with parameters
        console.log(game.trans('hello', { firstname: "Eemeli", lastname: "Kelokorpi" }));

        // Tag in cascade
        console.log(game.trans('ui.label.loading'));
        console.log(game.trans('ui.button.start'));
        console.log(game.trans('ui.button.over'));

        // Simple pluralization
        var pandaCount = 20;
        console.log(game.trans('panda.' + ( pandaCount == 0 ? 'none' : 'one_or_more' )));

        // Advanced pluralization
        var appleCount = 0;
        console.log(game.trans(function () {
            var prefix = 'apple.';
            switch (appleCount) {
                case 0:
                    return prefix + 'none';
                case 1:
                    return prefix + 'one';
            }
            return prefix + 'some';
        }, {
            count: appleCount
        }));

    }
});

game.start();

});
```

**media/messages.json**
```
{
    "en": {
        "hello": "Hello %firstname% %lastname%!",
        "ui": {
            "label": {
                "loading": "Loading..."
            },
            "button": {
                "start": "Start game!",
                "over": "Game over!"
            }
        },
        "panda": {
            "none": "No panda",
            "one_or_more": "One or more pandas"
        },
        "apple": {
            "none": "No apples",
            "one": "There is one apple.",
            "some": "There are %count% apples."
        }
    },
    "fr": {
        "Hello World!": "Bonjour le monde !",
        "hello": "Bonjour %firstname% %lastname% !",
        "ui": {
            "label": {
                "loading": "Chargement..."
            },
            "button": {
                "start": "Lancer la partie !",
                "over": "Fin de la partie !"
            }
        },
        "panda": {
            "none": "Aucun panda",
            "one_or_more": "Un ou plusieurs pandas"
        },
        "apple": {
            "none": "Aucune pommes",
            "one": "Il y a une pomme.",
            "some": "Il y a %count% pommes."
        }
    }
}
```

### Global parameters

- pandaConfig.translatorFallback (default 'en')
- pandaConfig.translatorLanguage (default navigator language)

### License

Panda.js Translator is released under the [MIT License](http://opensource.org/licenses/MIT).

## Donation

Please donate to help BLASPIX support the ongoing development.
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif "Donate")](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QR5TU7Q8NEANQ)

## Keywords
```
internationalisation, i18n, localization, l10n
```

[![Analytics](https://ga-beacon.appspot.com/UA-48574179-2/panda.js-translator/index?pixel)](https://github.com/igrigorik/ga-beacon)
