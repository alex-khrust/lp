(function () {
'use strict';

const Kinobase = {
    baseUrl: 'https://corsproxy.io/?https://kinobase.org',

    request: function(url, callback){
        new Lampa.Reguest().silent(this.baseUrl + url, callback, function(){});
    },

    parseList: function(html){
        const items = [];
        const doc = new DOMParser().parseFromString(html,'text/html');

        doc.querySelectorAll('.short').forEach(card=>{
            const title = card.querySelector('.short-title')?.innerText || '';
            const link = card.querySelector('a')?.getAttribute('href') || '';
            const poster = card.querySelector('img')?.getAttribute('src') || '';

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

        doc.querySelectorAll('.season-item').forEach(season=>{
            const seasonTitle = season.querySelector('.season-title')?.innerText || '';

            season.querySelectorAll('.episode-item').forEach(ep=>{
                const title = ep.querySelector('.episode-title')?.innerText || '';
                const link = ep.querySelector('a')?.getAttribute('href') || '';

                items.push({
                    title: seasonTitle + ' — ' + title,
                    url: link,
                    component: 'webview'
                });
            });
        });

        return items;
    },

    openCategory: function(path,title){
        const self = this;

        this.request(path,function(html){

            const items = self.parseList(html);

            Lampa.Activity.push({
                title: title,
                component: 'category_full',
                items: items
            });
        });
    },

    openSeries: function(url,title){
        const self = this;

        this.request(url,function(html){

            const items = self.parseSeries(html);

            Lampa.Activity.push({
                title: title,
                component: 'category_full',
                items: items
            });
        });
    },

    search: function(query){
        this.openCategory(`/search?query=${encodeURIComponent(query)}`,`Поиск: ${query}`);
    }
};

function startPlugin(){

    Lampa.Menu.add({
        title:'Kinobase',
        icon:'movie',
        onSelect:()=>Kinobase.openCategory('/films','Фильмы')
    });

    Lampa.Menu.add({
        title:'Сериалы',
        icon:'tv',
        onSelect:()=>Kinobase.openCategory('/serials','Сериалы')
    });

    Lampa.Menu.add({
        title:'ТВ Шоу',
        icon:'mic',
        onSelect:()=>Kinobase.openCategory('/tv','ТВ Шоу')
    });

    Lampa.Listener.follow('search',function(e){
        Kinobase.search(e.query);
    });

    Lampa.Listener.follow('item',function(item){
        if(item.url && item.component === 'category_full'){
            Kinobase.openSeries(item.url,item.title);
        }
    });
}

if(window.appready){
    startPlugin();
}
else{
    Lampa.Listener.follow('app',function(e){
        if(e.type === 'ready') startPlugin();
    });
}

})();
