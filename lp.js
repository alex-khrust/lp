(function () {
    'use strict';

    function startPlugin() {
        // Проверка, чтобы не плодить дубликаты
        if (window.plugin_tv_show_ready) return;
        window.plugin_tv_show_ready = true;

        // 1. Регистрируем компонент (страницу), которую будем открывать
        Lampa.Component.add('tv_custom_page', function (object, exam) {
            this.create = function () {
                var _this = this;
                
                // Вызываем поиск сразу при открытии
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
                        Lampa.Activity.back(); // Если отмена — возвращаемся назад
                    }
                });
                
                return $('<div></div>');
            };
            this.prepare = function () {};
            this.render = function () { return $('<div></div>'); };
            this.destroy = function () {};
        });

        // 2. Добавляем кнопку в меню
        // Используем стандартную иконку Lampa для стабильности
        var menu_item = {
            id: 'tv_custom_id',
            title: 'ТВ Шоу',
            icon: '<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" fill="white"/></svg>',
            onSelect: function () {
                Lampa.Activity.push({
                    url: '',
                    title: 'ТВ Шоу',
                    component: 'tv_custom_page',
                    page: 1
                });
            }
        };

        // Вставляем кнопку в меню
        Lampa.Menu.add(menu_item);
    }

    // Ждем полной готовности Lampa перед запуском кода
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();
