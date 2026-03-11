Lampa.Plugins.add({
    name: 'kinobase_max',
    title: 'Kinobase',
    icon: 'movie',
    index: 1,
    screen: ['main'],
    content: [
        {
            name: 'sections',
            title: 'Разделы Kinobase',
            rows: [
                { title: 'Фильмы', url: 'https://kinobase.org/films' },
                { title: 'Сериалы', url: 'https://kinobase.org/serials' },
                { title: 'ТВ Шоу', url: 'https://kinobase.org/tv' },
                { title: 'Мультфильмы', url: 'https://kinobase.org/cartoons' },
                { title: 'Популярное', url: 'https://kinobase.org/popular' },
                { title: 'Новинки', url: 'https://kinobase.org/new' }
            ]
        }
    ],
    onStart: function() {
        try {
            // Добавляем разделы в меню
            this.content[0].rows.forEach(row => {
                Lampa.Menu.add({
                    title: row.title,
                    icon: 'movie',
                    onSelect: () => {
                        try {
                            Lampa.Activity.push({
                                title: row.title,
                                component: 'webview',
                                url: row.url
                            });
                        } catch(e) {
                            console.error('Ошибка открытия раздела:', e);
                        }
                    }
                });
            });

            // Поиск
            Lampa.Listener.follow('search', search => {
                try {
                    const query = encodeURIComponent(search.query);
                    Lampa.Activity.push({
                        title: `Поиск: ${search.query}`,
                        component: 'webview',
                        url: `https://kinobase.org/search?query=${query}`
                    });
                } catch(e) {
                    console.error('Ошибка поиска:', e);
                }
            });

        } catch(err) {
            console.error('Ошибка инициализации плагина Kinobase:', err);
        }
    }
});
