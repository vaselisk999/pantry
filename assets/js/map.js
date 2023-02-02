

$(function () {
    // map integration
    // console.log(document.documentElement.clientHeight)
    // console.log(document.documentElement.clientWidth)
    // console.log(document.documentElement.scrollWidth)
    // console.log(document.documentElement.scrollHeight)
    // $('#world-map').attr("width", document.documentElement.scrollWidth)
    // $('#world-map').attr("heigth", document.documentElement.scrollHeight)

    $('#world-map').vectorMap({
        map: 'world_mill_en',
        updateSize: function(){

        }
    })

    // window.onresize = function () {
    //     setTimeout(function () {
    //         worldMap.updateSize();
    //     }, 200);
    // }

    // worldMap.updateSize();



});