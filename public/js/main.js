function Main() {
    var main_div = $("#main");
    var mainChart = {
        width: main_div.width(),
        height: main_div.height(),
        rScale: d3.scale.linear().range([2, 10]),
        nodesByName: {},
        locationStore: {},
        nodes: []
    };
}

Main();