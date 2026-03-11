(function () {
    'use strict';

    // Основной компонент плагина
    function Kinobase(object) {
        var network = new Lampa.Reguest();
        var scroll  = new Lampa.Scroll({mask: true, over: true});
        var items   = [];
        var html    = $('<div></div>');
        
        this.create = function () {
            var _this = this;
            this.activity.loader(true);

            // Здесь в будущем будет fetch(object.url) и парсинг HTML
            // Пока создаем демонстрационную карточку, чтобы убедиться, что всё работает
            setTimeout(function() {
                var dummyData = [
                    {
                        title: 'Kinobase: ' + object.title,
                        description: 'Для отображения реальных данных с ' + object.url + ' требуется написать парсер HTML.',
                        card_id: 'kb_info'
                    }
                ];
                _this.build(dummyData);
            }, 500);

            return this.render();
        };

        this.build = function (data) {
            var _this = this;
            Lampa.Background.empty(); // Очищаем фон

            data.forEach(function (item) {
                // Используем стандартный шаблон карточки Lampa
                var card = Lampa.Template.get('card', item);
                
                card.on('hover:focus', function () {
                    Lampa.Background.change(item.img); // Меняем фон при наведении
                });

                card.on('click:select', function () {
                    Lampa.Noty.show('Вы выбрали: ' + item.title);
                });

                html.append(card);
            });

            this.activity.loader(false);
            this.activity.toggle(); // Переключаем фокус на контент
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

    // Функция инициализации
    function startPlugin() {
        window.plugin_kinobase_ready = true;

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
