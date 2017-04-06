var dashboard = (function () {

    "use strict";

    function createTickerPriceChart() 
    {
    	//Create the container and title
      	var html = 
    		"<div id='price-tix' class='chart'>"
    		+ "<div class='title'>Current Price</div>"
    		+ "<div class='graph'></div>"
    		+ "</div>";

        $("#content").append(html);
        
    	var chart = new TradingView.widget({
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
    	
        
    	$("#" + chart.id + "-wrapper").appendTo("#price-tix");
    }
    
    /* Render the dashboard */
    function render() 
    {
    	//Clear old content, if any
    	$("#content").html("");
    	
    	createTickerPriceChart();
    }

    return 
    {
        render: render
    }

}());