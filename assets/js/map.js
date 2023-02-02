(function ($) {
    $('#world-map').vectorMap({
        map: 'world_mill_en',
        normalizeFunction: 'polynomial',
        backgroundColor: '#505050',
        borderOpacity: 0.25,
        
        onRegionClick: function (event, code) {
            var sr = new SearchApiClass(countries[code]);
            sr.searcheByCountry();
        },
        onResize: function (event, width, height) {
            // for test pourpose
            console.log(event, "event");
            console.log(width, "width");
            console.log(height, "height");
        },
    });
})(jQuery);