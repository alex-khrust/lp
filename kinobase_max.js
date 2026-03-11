(function () {
'use strict';

function startPlugin() {
    try {
        // Главное меню
        Lampa.Menu.add({
            title: 'Kinobase',
            icon: 'movie'
        });

        // Разделы
        const sections = [
            { title: 'Фильмы', url: 'https://kinobase.org/films', icon: 'movie' },
            { title: 'Сериалы', url: 'https://kinobase.org/serials', icon: 'tv' },
            { title: 'ТВ Шоу', url: 'https://kinobase.org/tv', icon: 'mic' },
            { title: 'Мультфильмы', url: 'https://kinobase.org/cartoons', icon: 'film' },
            { title: 'Популярное', url: 'https://kinobase.org/popular', icon: 'fire' },
            { title: 'Новинки', url: 'https://kinobase.org/new', icon: 'plus' }
        ];

        sections.forEach(section => {
            Lampa.Menu.add({
                title: section.title,
                icon: section.icon,
                onSelect: () => {
                    try {
                        Lampa.Activity.push({
                            title: section.title,
                            component: 'webview',
                            url: section.url
                        });
                    } catch (e) {
                        console.error('Ошибка открытия раздела:', e);
                    }
                }
            });
        });

        // Поиск
        Lampa.Listener.follow('search', search => {
            const query = encodeURIComponent(search.query);
            try {
                Lampa.Activity.push({
                    title: `Поиск: ${search.query}`,
                    component: 'webview',
                    url: `https://kinobase.org/search?query=${query}`
                });
            } catch (e) {
                console.error('Ошибка поиска:', e);
            }
        });

    } catch (err) {
        console.error('Ошибка инициализации плагина Kinobase:', err);
    }
}

// Запуск плагина
if (window.appready) startPlugin();
else Lampa.Listener.follow('app', e => { if (e.type === 'ready') startPlugin(); });

})();
