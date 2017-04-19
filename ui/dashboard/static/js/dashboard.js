var dashboard = (function () {

    "use strict";

    var chart_widget;
	
    function createTixChart(container_selector)
    {

        chart_widget = new TradingView.widget({
    		"width" : 1350,
    		"height" : 330,
    		"symbol" : "NASDAQ:AAPL",
    		"interval" : "180",
    		"timezone" : "Etc/UTC",
    		"theme" : "Black",
    		"style" : "3", //3 is good
    		"locale" : "en",
    		"toolbar_bg" : "#0f0f0e",
    		"enable_publishing" : false,
    		"allow_symbol_change" : true,
    		"hideideas" : true
    	});
    	
    	$("#" + chart_widget.id + "-wrapper").appendTo(container_selector);
    	
    }
    
    function createAssetPricesChart(selector, dataset)
    {
    	var data = {
			'xScale': 'time',
			'yScale': 'exponential',
			'type': 'line',
			'main': dataset
    	};
    	
    	var options = {
            "axisPaddingLeft": 0,
            "paddingLeft": 10,
            "paddingRight": 0,
            "axisPaddingRight": 0,
            "axisPaddingTop": 5,
            "dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
            "tickFormatX": function (x) { return d3.time.format('%m/%d/%Y')(x); },
            
    	};
    	
    	//Legend stuff
    	var legend = d3.select(selector).append("svg")
    					.attr("class", "legend")
    					.selectAll("g")
    					.data(dataset)
    					.enter()
    					.append("g")
    					.attr("transform", function (d, i) {
    	                    return "translate(" + (64 + (i * 84)) + ", 0)";
    	                });
    
    	legend.append("rect")
    			.attr("width", 18)
    			.attr("height", 18)
    			.attr("class", function (d, i) {
    				return 'color' + i;
    			});
    	
    	legend.append("text")
    			.attr("x", 24)
    			.attr("y", 9)
    			.attr("dy", ".35em")
    			.text(function (d, i) {
    				return dataset[i].asset;
    			});
    	
        return new xChart('line', data, selector + " .graph", options);
        
    }
    
    /* Render the dashboard */
    function render() 
    {	
        //Asset prices 
        var assetPriceChart = "<div id='asset-price' class='chart'>"
        	+ "<div class='title'><div>Historical Asset Prices"
            + "<select id='histCharts'>"
                + "<option value='GOOGL'>GOOGL</option>"
                + "<option value='DG'>DG</option>"
                + "<option value='EXC'>EXC</option>"
            + "</select></div>"
    		+ "<div class='graph'>" 
    		+ "<iframe width='450' height='320' frameborder='0' scrolling='no' src='//plot.ly/~DavidFB/49.embed'></iframe>"
    		+ "</div>"
    		+ "</div>";
        $("#content").append(assetPriceChart);
        
        //Allocation chart - order book/result from optimizer
        var pieChart = "<div id='asset-alloc' class='chart'>"
        	+ "<div class='title'>Optimal Allocations</div>"
        	+ "<div class='graph'></div>"
            + "<div id='subPie' class='chart'><div class='graph'></div></div>"
            + "<div id='subPieBg' class='hide'></div>"
        	+ "</div>";
        $("#content").append(pieChart);
        createAssetAllocChart('#asset-alloc', '.graph', optimalAlloc, true); //Default
        
        
    	//Backtested Returns Chart (from David)
        var returnsChart = "<div id='norm-returns' class='chart'>"
        	+ "<div class='title'><div>Backtested Returns</div>"
            + "<select id='returnsCharts'>"
                + "<option value='PORT'>Our Portfolio</option>"
                + "<option value='GOOGL'>GOOGL</option>"
                + "<option value='DG'>DG</option>"
                + "<option value='EXC'>EXC</option>"
                + "<option value='VZ'>VZ</option>"
                + "<option value='NEM'>NEM</option>"
                + "<option value='CSC'>CSC</option>"
                + "<option value='NVDA'>NVDA</option>"
            + "</select></div>"
        	+ "<div class='graph'>"
        	   + "<iframe width='450' height='320' frameborder='0' scrolling='no' src='//plot.ly/~DavidFB/7.embed'></iframe>"
        	+ "</div>"
        	+ "</div>";
        $("#content").append(returnsChart);
        $("#returnsCharts").change(function () {
            $("#norm-returns .graph").html(returnsCharts[$(this).val()]);
        });
        
        //Tix Chart
      	var tixChart = "<div id='price-tix' class='chart'>"
      		+ "<div class='title'>Current Prices</div>"
    		+ "<div class='graph'></div>"
    		+ "</div>";

        $("#content").append(tixChart);
        createTixChart("#price-tix .graph");
        
    }
    
    function createAssetAllocChart(selector, grapharea, dataset, showTooltip)
    {
        //Clear content
        $(selector + " " + grapharea).html("");
        
        var width = 200,
            height = 250,
            radius = Math.min(width, height) / 2,

            color = d3.scale.category10(),

            pie = d3.layout.pie()
                .value(function (d)
    			{
                    return d.pct;
                })
                .sort(null);
        

       var  arc = d3.svg.arc()
                .innerRadius(radius - 80)
                .outerRadius(radius - 20);
        
       var  svg = d3.select(selector + " " + grapharea).append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("transform", "translate(10, -10)")
                .append("g")
                .attr("transform", "translate(100, 120)");

       var   path = svg.datum(dataset).selectAll("path")
                .data(pie)
                .enter().append("path")
                .attr("fill", function (d, i) {
                    return color(i);
                })
                .attr("d", arc)
                .each(function (d) {
                    this._selected = d;
                })
                .on("mouseover", function (d, i) {
                    //Show tooltip
                    if (showTooltip)
                    {
                        createAssetAllocChart("#subPie", ".graph", d.data.detail);
                        
                        $("#subPieBg").removeClass("hide");
                    }
                })
                .on("mouseout", function() {
                    $("#subPie .graph").html("");
                    $("#subPieBg").addClass("hide");
                })
                .on('click', function(d, i){
                    // Pull out the clicked part
                   d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("transform",function(d){
                        // this this group expanded out?
                        if (!d.data._expanded){
                            d.data._expanded = true;
                            var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
                            var x = Math.cos(a) * 20;
                            var y = Math.sin(a) * 20;
                            // move it away from the circle center
                            return 'translate(' + x + ',' + y + ')';                
                        } else {
                            d.data._expanded = false;
                            // move it back
                            return 'translate(0,0)'; 
                        }
                    }); 

				});

       var  legend = d3.select(selector + " .graph").append("svg")
                .attr("class", "legend")
                .attr("width", 180)
                .attr("height", 220)
                .attr("transform", "translate(20, 10)")
                .selectAll("g")
                .data(color.domain().slice().reverse())
                .enter().append("g")
                .attr("transform", function (d, i) {
                    return "translate(0," + (i * 30) + ")";
                });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function (d) {
                return dataset[d].type + ' (' + dataset[d].pct + '%)';
            });

        function change(dataset) {
            svg.datum(dataset);
            path = path.data(pie); // compute the new angles
            path.transition().duration(500).attrTween("d", arcTween); // redraw the arcs
            legend.select('text').text(function (d) {
                return dataset[d].type + ' (' + dataset[d].pct + ')';
            });
        }

        function arcTween(a) {
            var i = d3.interpolate(this._selected, a);
            this._selected = i(0);
            return function (t) {
                return arc(i(t));
            };
        }

        return {
            change: change
        };

    }

    // Clean up on tab change
    function cleanup()
    {
    	if (chart_widget)
    	{
    		chart_widget.remove();
    		chart_widget = null;
    	}
    	
    	//Clear old content
    	$("#content").html("");
    }

    return {
        render: render,
        cleanup: cleanup
    }

}());