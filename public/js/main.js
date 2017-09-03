function Main() {
    var main_div = $("#main");
    var mainChart = {
        width: main_div.width(),
        height: main_div.height(),
        tmp_nodes: [],
        nodes: [],
        links: []
    };

    d3.csv("/public/files/node-link.csv", function (error, data) {
        data.forEach(function (item) {
            mainChart.tmp_nodes.push(item.source);
            mainChart.tmp_nodes.push(item.target);
        });
        mainChart.tmp_nodes = d3.set(mainChart.tmp_nodes).values();
        mainChart.index_of_nodes = d3.map();

        for (var i = 0; i !== mainChart.tmp_nodes.length; ++i) {
            var node = {id: mainChart.tmp_nodes[i]};
            mainChart.nodes.push(node);
            mainChart.index_of_nodes.set(mainChart.tmp_nodes[i], i);
        }

        data.forEach(function (item) {
            var link = {
                source: mainChart.index_of_nodes.get(item.source),
                target: mainChart.index_of_nodes.get(item.target),
                count: item.count
            };
            mainChart.links.push(link);
        });

        mainChart.svg = d3.select("#main")
            .append("svg")
            .attr("width", mainChart.width)
            .attr("height", mainChart.height);

        mainChart.force = d3.layout.force()
            .nodes(mainChart.nodes)
            .links(mainChart.links)
            .size([mainChart.width, mainChart.height])
            .linkDistance(40)
            .charge([-50])
            .start();

        mainChart.svg_links = mainChart.svg.selectAll(".link")
            .data(mainChart.links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke-opacity", 0.5)
            .attr("stroke", "gray")
            .attr('stroke-width', 2);

        mainChart.svg_nodes = mainChart.svg.selectAll(".node")
            .data(mainChart.nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", function (d) {
                return 2;
            })
            .attr("opacity", 0.7)
            .attr("fill", "#0CC5E8")
            .call(mainChart.force.drag);

        mainChart.force.on("tick", function () {

            mainChart.svg_links.attr("x1", function (d) {
                return d.source.x;
            });
            mainChart.svg_links.attr("y1", function (d) {
                return d.source.y;
            });
            mainChart.svg_links.attr("x2", function (d) {
                return d.target.x;
            });
            mainChart.svg_links.attr("y2", function (d) {
                return d.target.y;
            });

            mainChart.svg_nodes.attr("cx", function (d) {
                return d.x;
            });
            mainChart.svg_nodes.attr("cy", function (d) {
                return d.y;
            });
        });
    });

}

Main();