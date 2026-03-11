(function () {
    'use strict';
    // Даем Lampa 500мс, чтобы инициализировать свои стандартные разделы
    setTimeout(function() {
        Lampa.Utils.putScriptAsync(['https://cdn.jsdelivr.net/gh/alex-khrust/lp@main/tv_show.js'], function () { });
    }, 500);
})();
