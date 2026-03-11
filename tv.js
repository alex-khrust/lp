(function () {
    'use strict';

    // Этот код не трогает меню, поэтому навигация не сломается
    function startPlugin() {
        if (window.plugin_tv_safe_ready) return;
        window.plugin_tv_safe_ready = true;

        // Просто уведомление при запуске, чтобы вы знали, что плагин живой
        setTimeout(function(){
            Lampa.Noty.show('Поиск ТВ-шоу активирован');
        }, 3000);

        // Слушаем глобальный поиск Lampa
        Lampa.Listener.follow('search', function (e) {
            if (e.type == 'result') {
                // Здесь плагин подготавливает почву для плагина "Онлайн"
                // чтобы он лучше находил шоу по вашему запросу
                console.log('Search query:', e.query);
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
