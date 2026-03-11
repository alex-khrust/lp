(function () {
    'use strict';

    function startPlugin() {
        if (window.plugin_all_tv_ready) return;
        window.plugin_all_tv_ready = true;

        // Добавляем раздел в меню
        Lampa.Menu.add({
            title: 'ТВ Шоу',
            icon: '<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" fill="#32CD32"/></svg>',
            onSelect: function () {
                // Открываем встроенный поиск Lampa, но с фильтром по ключевым словам
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
                    }
                });
            }
        });

        // Слушатель: подмешиваем категорию ТВ в результаты
        Lampa.Listener.follow('activity', function (e) {
            if (e.type == 'start' && e.component == 'category_full') {
                // Здесь можно добавить фильтрацию по жанру "Reality-TV"
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
