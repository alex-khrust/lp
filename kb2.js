(function () {
    'use strict';

    function startPlugin() {
        if (window.plugin_kinobase_tv_ready) return;
        window.plugin_kinobase_tv_ready = true;

        // Создаем кнопку в меню
        Lampa.Menu.add({
            title: 'ТВ Шоу',
            icon: '<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" fill="#ffcc00"/></svg>',
            onSelect: function () {
                Lampa.Activity.push({
                    url: 'https://kinobase.org/tv',
                    title: 'ТВ Шоу (Kinobase)',
                    component: 'category_full',
                    source: 'kinobase'
                });
            }
        });

        // Слушатель для открытия раздела
        Lampa.Listener.follow('activity', function (e) {
            if (e.type == 'start' && e.component == 'category_full' && e.object.source == 'kinobase') {
                var network = new Lampa.Reguest();
                var _object = e.object;
                
                // В Германии используем прокси для получения списка
                var proxy_url = 'https://proxy.cub.watch/' + _object.url;

                network.silent(proxy_url, function (str) {
                    var items = [];
                    // Простейший парсинг HTML карточек Kinobase
                    var cards = str.split('class="movie-item"');
                    cards.shift();

                    cards.forEach(function (card) {
                        var title = card.match(/alt="(.*?)"/);
                        var img = card.match(/src="(.*?)"/);
                        var link = card.match(/href="(.*?)"/);

                        if (title && img && link) {
                            items.push({
                                title: title[1],
                                img: img[1].indexOf('http') == -1 ? 'https://kinobase.org' + img[1] : img[1],
                                link: 'https://kinobase.org' + link[1],
                                card_id: 'kb_tv_' + Math.random()
                            });
                        }
                    });

                    if (items.length) e.activity.render().find('.category-full').append(Lampa.Template.get('items_line', {items: items}));
                    else Lampa.Noty.show('Шоу не найдены (проверьте VPN)');
                    
                    e.activity.loader(false);
                }, function () {
                    Lampa.Noty.show('Ошибка доступа к Kinobase');
                    e.activity.loader(false);
                }, false, {dataType: 'text'});
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
