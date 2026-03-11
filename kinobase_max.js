(function(){

const Kinobase = {
    baseUrl: 'https://kinobase.org',

    parseList: function(html){
        const items = [];
        const doc = new DOMParser().parseFromString(html,'text/html');

        doc.querySelectorAll('.short').forEach(card=>{
            const title = card.querySelector('.short-title')?.innerText || '';
            const link = card.querySelector('a')?.href || '';
            const poster = card.querySelector('img')?.src || '';
            items.push({
                title: title,
                poster: poster,
                url: link,
                component: 'category_full'
            });
        });

        return items;
    },

    parseSeries: function(html){
        const items = [];
        const doc = new DOMParser().parseFromString(html,'text/html');

        // ищем сезоны
        doc.querySelectorAll('.season-item').forEach(season=>{
            const seasonTitle = season.querySelector('.season-title')?.innerText || '';
            season.querySelectorAll('.episode-item').forEach(ep=>{
                const title = ep.querySelector('.episode-title')?.innerText || '';
                const link = ep.querySelector('a')?.href || '';
                items.push({
                    title: seasonTitle + ' — ' + title,
                    url: link,
                    component: 'webview'
                });
            });
        });

        return items;
    },

    getNextPage: function(html){
        const doc = new DOMParser().parseFromString(html,'text/html');
        const next = doc.querySelector('.pagination-next a');
        return next ? next.href : null;
    },

    openCategory: function(path,title){
        const self = this;

        network.silent(this.baseUrl + path, function(html){
            const items = self.parseList(html);

            Lampa.Activity.push({
                title: title,
                component: 'category_full',
                items: items,
                onScrollEnd: function(page){
                    const next = self.getNextPage(html);
                    if(next){
                        network.silent(next, html2=>{
                            const more = self.parseList(html2);
                            Lampa.Activity.push({title:title,component:'category_full',items:more});
                        });
                    }
                }
            });
        });
    },

    openSeries: function(url,title){
        network.silent(this.baseUrl + url, html=>{
            const items = this.parseSeries(html);
            Lampa.Activity.push({
                title: title,
                component: 'category_full',
                items: items
            });
        });
    },

    search: function(query){
        this.openCategory(`/search?query=${encodeURIComponent(query)}`, `Поиск: ${query}`);
    }

};

Lampa.Listener.follow('app', e=>{
    if(e.type==='ready'){

        // Главное меню
        Lampa.Menu.add({ title:'Kinobase', icon:'movie' });

        // Разделы
        Lampa.Menu.add({
            title:'Фильмы',
            icon:'movie',
            onSelect: ()=>Kinobase.openCategory('/films','Фильмы')
        });

        Lampa.Menu.add({
            title:'Сериалы',
            icon:'tv',
            onSelect: ()=>Kinobase.openCategory('/serials','Сериалы')
        });

        Lampa.Menu.add({
            title:'ТВ Шоу',
            icon:'mic',
            onSelect: ()=>Kinobase.openCategory('/tv','ТВ Шоу')
        });

        // Поиск
        Lampa.Listener.follow('search', search=>{
            Kinobase.search(search.query);
        });

        // Клик на элемент
        Lampa.Listener.follow('item', item=>{
            if(item.url && item.component==='category_full'){
                Kinobase.openSeries(item.url,item.title);
            }
        });

    }
});

})();
