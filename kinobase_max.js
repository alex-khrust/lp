Lampa.Plugins.add({
    name: "kinobase_max",
    title: "Kinobase",
    icon: "movie",
    index: 1,
    screen: ["main"],
    content: [
        {
            name: "sections",
            title: "Разделы Kinobase",
            rows: [
                { name: "films", title: "Фильмы", url: "https://kinobase.org/films" },
                { name: "serials", title: "Сериалы", url: "https://kinobase.org/serials" },
                { name: "tv", title: "ТВ Шоу", url: "https://kinobase.org/tv" },
                { name: "cartoons", title: "Мультфильмы", url: "https://kinobase.org/cartoons" },
                { name: "popular", title: "Популярное", url: "https://kinobase.org/popular" },
                { name: "new", title: "Новинки", url: "https://kinobase.org/new" }
            ]
        }
    ],
    onStart: function() {
        try {
            // добавляем разделы в меню и активити
            this.content[0].rows.forEach(row => {
                Lampa.Menu.add({
                    title: row.title,
                    icon: "movie",
                    onSelect: () => {
                        Lampa.Activity.push({
                            title: row.title,
                            component: "webview",
                            url: row.url
                        });
                    }
                });
            });

            // поиск
            Lampa.Listener.follow("search", search => {
                const query = encodeURIComponent(search.query);
                Lampa.Activity.push({
                    title: `Поиск: ${search.query}`,
                    component: "webview",
                    url: `https://kinobase.org/search?query=${query}`
                });
            });

        } catch(e) {
            console.error("Ошибка плагина Kinobase:", e);
        }
    }
});
