Lampa.Plugins.add({
    name: 'kinobase_max',
    title: 'Kinobase',
    icon: 'movie',
    index: 1,
    screen: ['main'],
    content: [
        {
            name: 'sections',
            title: 'Разделы',
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
        this.content[0].rows.forEach(row => {
            Lampa.Menu.add({
                title: row.title,
                icon: 'movie',
                onSelect: () => {
                    Lampa.Activity.push({
                        title: row.title,
                        component: 'webview',
                        url: row.url
                    });
                }
            });
        });

        Lampa.Listener.follow('search', search => {
            const query = encodeURIComponent(search.query);
            Lampa.Activity.push({
                title: `Поиск: ${search.query}`,
                component: 'webview',
                url: `https://kinobase.org/search?query=${query}`
            });
        });
    }
});
