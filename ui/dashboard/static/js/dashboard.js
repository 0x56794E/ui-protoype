var dashboard = (function () {

    "use strict";

    var chart_widget;
	
    function createTixChart(container_selector)
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
    	
    	$("#" + chart_widget.id + "-wrapper").appendTo(container_selector);
    	
    }
    
    function loadDataSet()
    {
    	//Load CSV file for Asset Prices chart
    	//Return data in following format in summary.js
    	
    }
    
    function createAssetPricesChart(selector, dataset)
    {
    	var data = {
			'xScale': 'time',
			'yScale': 'linear',
			'type': 'line',
			'main': dataset
    	};
    	
    	var options = {
            "axisPaddingLeft": 0,
            "paddingLeft": 20,
            "paddingRight": 0,
            "axisPaddingRight": 0,
            "axisPaddingTop": 5,
            "yMin": 9,
            "yMax": 40,
            "dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
            "tickFormatX": function (x) { return d3.time.format('%A')(x); },
            
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
    	//Tix Chart
      	var tixChart = "<div id='price-tix' class='chart'>"
      		+ "<div class='title'>Current Price</div>"
    		+ "<div class='graph'></div>"
    		+ "</div>";

        $("#content").append(tixChart);
        createTixChart("#price-tix");
    	
    	//Normalized Returns Chart (from David)
        var normChart = "<div id='norm-returns' class='chart'>"
        	+ "<div class='title'>Normalized Returns</div>"
        	+ "<div class='graph'>"
        	+ "<iframe width='500' height='350' frameborder='0' scrolling='no' src='//plot.ly/~DavidFB/7.embed'></iframe>"
        	+ "</div>"
        	+ "</div>";
        $("#content").append(normChart);
        
        //Asset prices (3rd chart)
        var assetPriceChart = "<div id='asset-price' class='chart'>"
        	+ "<div class='title'>Asset Prices</div>"
    		+ "<div class='graph'></div>"
    		+ "</div>";
        $("#content").append(assetPriceChart);
        
        createAssetPricesChart("#asset-price", asset_price_dataset);
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