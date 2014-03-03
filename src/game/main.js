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