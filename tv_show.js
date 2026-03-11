(function () {
    'use strict';

    function startPlugin() {
        if (window.plugin_tv_show_ready) return;
        window.plugin_tv_show_ready = true;

        // Регистрация страницы
        Lampa.Component.add('tv_page', function (object, exam) {
            this.create = function () {
                Lampa.Input.edit({
                    title: 'Поиск ТВ-шоу',
                    value: '',
                    free: true
                }, function (new_value) {
                    if (new_value) {
                        Lampa.Activity.push({
                            url: '',
                            title: 'Поиск: ' + new_value,
                            component: 'search',
                            query: new_value
                        });
                    } else {
                        Lampa.Activity.back();
                    }
                });
                return $('<div></div>');
            };
            this.prepare = function () {};
            this.render = function () { return $('<div></div>'); };
            this.destroy = function () {};
        });

        // Добавление в меню с полным набором данных, чтобы не было ошибки
        var menuItem = {
            id: 'tv_shows',
            title: 'ТВ Шоу',
            name: 'ТВ Шоу', // Добавили имя дублем для надежности
            icon: '<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" fill="#32CD32"/></svg>',
        };

        // Используем слушатель, чтобы вставить кнопку точно в готовое меню
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                if (!$('.menu [data-id="tv_shows"]').length) {
                    Lampa.Menu.add(menuItem);
                }
            }
        });

        // Обработка нажатия
        Lampa.Listener.follow('menu', function (e) {
            if (e.type == 'select' && e.item.id == 'tv_shows') {
                Lampa.Activity.push({
                    url: '',
                    title: 'ТВ Шоу',
                    component: 'tv_page',
                    page: 1
                });
            }
        });
    }

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) { if (e.type == 'ready') startPlugin(); });
})();
