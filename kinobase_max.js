(function () {
    'use strict';

    function KinobaseComponent(object) {
        var network = new Lampa.Reguest();
        var scroll  = new Lampa.Scroll({mask: true, over: true});
        var html    = $('<div></div>');
        
        this.create = function () {
            var _this = this;
            this.activity.loader(true);

            // Используем прокси для обхода блокировок в DE
            var url = 'https://proxy.cub.watch/https://kinobase.org/'; 
            
            // Тестовый вывод, чтобы проверить, работает ли экран
            setTimeout(function() {
                var card = Lampa.Template.get('card', {
                    title: 'Kinobase в Германии',
                    description: 'Если вы видите эту карточку, значит плагин загрузился. Нажмите на неё для теста.',
                    card_id: 'kb_test'
                });
                
                card.on('click:select', function(){
                    Lampa.Noty.show('Соединение установлено!');
                });

                html.append(card);
                _this.activity.loader(false);
                _this.activity.toggle();
            }, 1000);

            return this.render();
        };

        this.render = function () { return html; };
        this.destroy = function () {
            network.clear();
            scroll.destroy();
            html.remove();
        };
    }

    function startPlugin() {
        if (window.plugin_kinobase_ready) return;
        window.plugin_kinobase_ready = true;

        Lampa.Component.add('kinobase_max', KinobaseComponent);

        Lampa.Menu.add({
            title: 'KB: Фильмы',
            icon: '<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" fill="white"/></svg>',
            onSelect: function () {
                Lampa.Activity.push({
                    url: 'https://kinobase.org/films',
                    title: 'KB: Фильмы',
                    component: 'kinobase_max',
                    page: 1
                });
            }
        });
    }

    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();
