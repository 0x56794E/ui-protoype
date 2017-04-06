var dashboard = (function () {

    "use strict";

    var chart_widget;
	
    function createTixChart()
    {

        chart_widget = new TradingView.widget({
    		"width" : 580,
    		"height" : 350,
    		"symbol" : "NASDAQ:AAPL",
    		"interval" : "180",
    		"timezone" : "Etc/UTC",
    		"theme" : "White",
    		"style" : "1",
    		"locale" : "en",
    		"toolbar_bg" : "#f1f3f6",
    		"enable_publishing" : false,
    		"allow_symbol_change" : true,
    		"hideideas" : true
    	});
    	
    	$("#" + chart_widget.id + "-wrapper").appendTo("#price-tix");
    	
    }
    
    function createHistoricalReturnChart(selector)
    {
    	var dataset = [
    	    {
    	        "className": ".Canada",
    	        "country": "Canada",
    	        "data": [
    	            {
    	                "x": 1994,
    	                "y": 13
    	            },
    	            {
    	                "x": 1998,
    	                "y": 15
    	            },
    	            {
    	                "x": 2002,
    	                "y": 17
    	            },
    	            {
    	                "x": 2006,
    	                "y": 24
    	            },
    	            {
    	                "x": 2010,
    	                "y": 26
    	            }
    	        ]
    	    },
    	    {
    	        "className": ".Germany",
    	        "country": "Germany",
    	        "data": [
    	            {
    	                "x": 1994,
    	                "y": 22
    	            },
    	            {
    	                "x": 1998,
    	                "y": 27
    	            },
    	            {
    	                "x": 2002,
    	                "y": 34
    	            },
    	            {
    	                "x": 2006,
    	                "y": 28
    	            },
    	            {
    	                "x": 2010,
    	                "y": 30
    	            }
    	        ]
    	    },
    	    {
    	        "className": ".Norway",
    	        "country": "Norway",
    	        "data": [
    	            {
    	                "x": 1994,
    	                "y": 26
    	            },
    	            {
    	                "x": 1998,
    	                "y": 25
    	            },
    	            {
    	                "x": 2002,
    	                "y": 25
    	            },
    	            {
    	                "x": 2006,
    	                "y": 19
    	            },
    	            {
    	                "x": 2010,
    	                "y": 23
    	            }
    	        ]
    	    },
    	    {
    	        "className": ".Russia",
    	        "country": "Russia",
    	        "data": [
    	            {
    	                "x": 1994,
    	                "y": 23
    	            },
    	            {
    	                "x": 1998,
    	                "y": 14
    	            },
    	            {
    	                "x": 2002,
    	                "y": 13
    	            },
    	            {
    	                "x": 2006,
    	                "y": 20
    	            },
    	            {
    	                "x": 2010,
    	                "y": 15
    	            }
    	        ]
    	    },
    	    {
    	        "className": ".USA",
    	        "country": "USA",
    	        "data": [
    	            {
    	                "x": 1994,
    	                "y": 13
    	            },
    	            {
    	                "x": 1998,
    	                "y": 13
    	            },
    	            {
    	                "x": 2002,
    	                "y": 34
    	            },
    	            {
    	                "x": 2006,
    	                "y": 25
    	            },
    	            {
    	                "x": 2010,
    	                "y": 37
    	            }
    	        ]
    	    }
    	];
    	
    	var data = {
    		"xScale": "ordinal",
    		"yScale": "linear",
    		"main": dataset
    	};
    	
    	var options = {
                 "axisPaddingLeft": 0,
                 "paddingLeft": 20,
                 "paddingRight": 0,
                 "axisPaddingRight": 0,
                 "axisPaddingTop": 5,
                 "yMin": 9,
                 "yMax": 40,
                 "interpolation": "linear",
             };

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
                 return dataset[i].country;
             });
         
         new xChart('line-dotted', data, selector + " .graph", options);
         
    }
    
    /* Render the dashboard */
    function render() 
    {	
    	//Tix Chart
//      	var tixChart = "<div id='price-tix' class='chart'>"
//    		+ "<div class='title'>Current Price</div>"
//    		+ "<div class='graph'></div>"
//    		+ "</div>";
//
//        $("#content").append(tixChart);
//        createTixChart();
    	
    	//Historical Portfolio Return
    	var histPortChart =  "<div id='hist-port' class='chart fright'>"
    		+ "<div class='title'>Historical Portfolio Return</div>"
    		+ "<div class='graph'></div>"
    		+ "</div>";    	
    	$("#content").append(histPortChart);
    	createHistoricalReturnChart("hist-port");
    	
    	//Momentum
    	var momentumChart =  "<div id='momentum-chart' class='chart'>"
    		+ "<div class='title'>Momentum</div>"
    		+ "<div class='graph'></div>"
    		+ "</div>";
    	
    	$("#content").append(momentumChart);
    	
    	//Moving Avg
    	var mvAvgChart =  "<div id='moving-avg' class='chart'>"
    		+ "<div class='title'>Moving Average</div>"
    		+ "<div class='graph'></div>"
    		+ "</div>";
    	
    	$("#content").append(mvAvgChart);
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