//self-involved function
(function ($) {
    $('#world-map').vectorMap({
        map: 'world_mill_en',
        normalizeFunction: 'polynomial',
        backgroundColor: '#505050',
        borderOpacity: 0.25,
        
        onRegionClick: function (event, code) {
            //path country name to searchApiobg
            searcheByCountry(countries[code]);
        },
        onResize: function (event, width, height) {
            // for test pourpose
            // ToDo logic for scaling 
            // console.log(event, "event");
            // console.log(width, "width");
            // console.log(height, "height");
        },
    });
})(jQuery);