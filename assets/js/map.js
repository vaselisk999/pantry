
$(function () {
    $('#world-map').vectorMap({
        map: 'world_mill_en',
        normalizeFunction: 'linear',
        hoverColor: '#c9dfaf',
        borderColor: '#818181',
        borderOpacity: 0.25,
        onRegionClick: function (element, code, region) {
            var message = 'You clicked "'
                + region
                + '" which has the code: '
                + code.toUpperCase();

            alert(message);
        },
        onResize: function (event, width, height) {
            console.log(event, "event");
            console.log(width, "width");
            console.log(height, "height");
        },
        onRegionOver: function(event, code){
            console.log(event, "event");
            console.log(code, "code");
        },
        onRegionOut: function(event, code){
            console.log(event, "event");
            console.log(code, "code");
        },
        onViewportChange: function(event,  scale){
            console.log(event, "event");
            console.log(scale, "scale");
        }
    });

});