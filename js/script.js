(function() {
	var data = states,
		barData = [],
		width = 500,
		height = 500,
		radius = Math.min(width, height) / 2,
		innerRadius = 0.1 * radius,
		limit = 1000.0;

	var colors = [ 	"#061C58", "#253E8E", "#215EA8", "#3F91C0",
					"#64B3C0", "#92C9BA", "#C7E9B4", "#EEF8B1",
					"#FFFDD9", "chucknorris" ];

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {
			return d.width;
		});

	//pie.transition().delay(function(d, i) { return 500; }).duration(500);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([0, 0])
		.html(function(d) {
		return d.data.name;
	});

	var arc = d3.svg.arc()
		.innerRadius(innerRadius)
		.outerRadius(function (d) {
		return (radius - innerRadius) * (d.data.references / limit) + innerRadius;
	});


	var outlineArc = d3.svg.arc()
		.innerRadius(innerRadius)
		.outerRadius(radius);

	var svg = d3.select(".piechart").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	svg.call(tip);

	data.forEach(function(d) {
		var randomColor = colors[ Math.floor(Math.random() * colors.length) ];

		d.name     =  d.name;
		d.abbreviation = d.abbreviation;
		d.references = +d.references;
		d.order  = +d.order;
		d.width = +d.references;
		d.color  =  randomColor;

		if(d.references > (limit / 2)) {
			barData.push(d.references);
		}
	});

	var path = svg.selectAll(".solidArc")
		.data(pie(data))
		.enter().append("path")
			.attr("fill", function(d) {
				return d.data.color;
			})
			.attr("class", "solidArc")
			.attr("d", arc)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);


	var outerPath = svg.selectAll(".outlineArc")
		.data(pie(data))
		.enter().append("path")
			.attr("fill", "none")
			.attr("class", "outlineArc")
			.attr("d", outlineArc);


	svg.append("svg:text")
		.attr("class", "aster-score")
		.attr("dy", ".35em")
		.attr("text-anchor", "middle") // text-align: right
		.text();




	var x = d3.scale.linear()
		    .domain([0, d3.max(barData)])
			    .range([0, 420]);

	d3.select(".barchart")
		.selectAll("div")
		.data(barData)
		.enter().append("div")
		.style("width", function(d) { return x(d) + "px"; })
		.text(function(d) {
			return d;
		});


})();
