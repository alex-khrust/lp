(function () {
    'use strict';

    function startPlugin() {
        var menu_item = {
            title: 'Kinobase Test',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="white" fill-opacity="0.1"/><path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.58L21 7Z" fill="white"/></svg>',
            onSelect: function () {
                Lampa.Noty.show('Плагин работает!');
            }
        };

        Lampa.Menu.add(menu_item);
    }

    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();
