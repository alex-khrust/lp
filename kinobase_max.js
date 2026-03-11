(function () {
    'use strict';

    // 1. Создаем основной компонент (экран), который будет показывать контент
    function KinobaseComponent(object) {
        var network = new Lampa.Reguest();
        var scroll  = new Lampa.Scroll({mask: true, over: true});
        var items   = [];
        var html    = $('<div></div>');
        
        this.create = function () {
            var _this = this;
            this.activity.loader(true); // Показываем индикатор загрузки

            // Имитация получения данных (сюда позже добавим парсер HTML)
            setTimeout(function() {
                var card_data = {
                    title: 'Kinobase: ' + object.title,
                    description: 'Раздел ' + object.title + ' успешно подключен. Для отображения реальных карточек с сайта ' + object.url + ' необходимо добавить парсер контента.',
                    card_id: 'kb_info'
                };
                
                _this.build([card_data]);
            }, 500);

            return this.render();
        };

        // Метод отрисовки карточек
        this.build = function (data) {
            var _this = this;
            Lampa.Background.empty();

            data.forEach(function (item) {
                var card = Lampa.Template.get('card', item);
                
                card.on('hover:focus', function () {
                    // Можно менять фон при наведении
                });

                card.on('click:select', function () {
                    Lampa.Noty.show('Вы выбрали: ' + item.title);
                });

                html.append(card);
            });

            this.activity.loader(false);
            this.activity.toggle(); // Передаем управление интерфейсу
        };

        this.render = function () {
            return html;
        };

        this.destroy = function () {
            network.clear();
            scroll.destroy();
            html.remove();
        };
    }

    // 2. Функция инициализации плагина
    function startPlugin() {
        // Проверка, чтобы не загружать плагин дважды
        if (window.plugin_kinobase_ready) return;
        window.plugin_kinobase_ready = true;

        // Регистрируем компонент в системе Lampa
        Lampa.Component.add('kinobase_max_component', KinobaseComponent);

        // Массив разделов для добавления в меню
        var rows = [
            { title: 'KB: Фильмы', url: 'https://kinobase.org/films' },
            { title: 'KB: Сериалы', url: 'https://kinobase.org/serials' },
            { title: 'KB: Популярное', url: 'https://kinobase.org/popular' }
        ];

        // Добавляем каждый пункт в меню
        rows.forEach(function (row) {
            var menu_item = {
                title: row.title,
                icon: '<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" fill="white"/></svg>',
                onSelect: function () {
                    // При клике открываем созданный выше компонент
                    Lampa.Activity.push({
                        url: row.url,
                        title: row.title,
                        component: 'kinobase_max_component',
                        page: 1
                    });
                }
            };
            Lampa.Menu.add(menu_item);
        });
    }

    // 3. Точка входа: ждем готовности приложения Lampa
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();

        // Регистрируем компонент в системе
        Lampa.Component.add('kinobase_component', Kinobase);

        // Список разделов
        var sections = [
            { title: 'KB: Фильмы', url: 'https://kinobase.org/films' },
            { title: 'KB: Сериалы', url: 'https://kinobase.org/serials' },
            { title: 'KB: Популярное', url: 'https://kinobase.org/popular' }
        ];

        // Добавляем разделы в главное меню Lampa
        sections.forEach(function (section) {
            var menu_item = {
                title: section.title,
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2"/></svg>',
                onSelect: function () {
                    Lampa.Activity.push({
                        url: section.url,
                        title: section.title,
                        component: 'kinobase_component',
                        page: 1
                    });
                }
            };
            Lampa.Menu.add(menu_item);
        });
    }

    // Запуск при готовности приложения
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();
