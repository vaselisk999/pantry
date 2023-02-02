
$(function () {
    $('#world-map').vectorMap({
        map: 'world_mill_en',
        normalizeFunction: 'linear',
        zoomMax: 8,
        onRegionClick: function (element, code, region) {
            var message = 'You clicked "'
                + region
                + '" which has the code: '
                + code.toUpperCase();

            alert(message);
        },
        onResize: function (event, width, height) {
            console.log(event, "event")
            console.log(width, "width")
            console.log(height, "height")
        },
        onRegionOver: function(e, code){

        },
        onRegionOut: function(e, code){

        },
        onViewportChange: function(e,  scale){

        }
    });

});