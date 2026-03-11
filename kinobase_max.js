(function () {
'use strict';

function startPlugin(){

    // Главное меню
    Lampa.Menu.add({
        title:'Kinobase',
        icon:'movie'
    });

    // Разделы Kinobase
    const sections = [
        { title: 'Фильмы', url: 'https://kinobase.org/films', icon:'movie' },
        { title: 'Сериалы', url: 'https://kinobase.org/serials', icon:'tv' },
        { title: 'ТВ Шоу', url: 'https://kinobase.org/tv', icon:'mic' },
        { title: 'Мультфильмы', url: 'https://kinobase.org/cartoons', icon:'film' },
        { title: 'Популярное', url: 'https://kinobase.org/popular', icon:'fire' },
        { title: 'Новинки', url: 'https://kinobase.org/new', icon:'plus' }
    ];

    sections.forEach(section=>{
        Lampa.Menu.add({
            title: section.title,
            icon: section.icon,
            onSelect: ()=>{
                Lampa.Activity.push({
                    title: section.title,
                    component:'webview',
                    url: section.url
                });
            }
        });
    });

    // Поиск
    Lampa.Listener.follow('search', search=>{
        const query = encodeURIComponent(search.query);
        Lampa.Activity.push({
            title:`Поиск: ${search.query}`,
            component:'webview',
            url:`https://kinobase.org/search?query=${query}`
        });
    });

}

if(window.appready) startPlugin();
else Lampa.Listener.follow('app', e=>{if(e.type==='ready') startPlugin();});

})();
