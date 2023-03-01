d3.tsv("./data/timeline_data.tsv").then(function(data) {
    // everything below here refers to gapminder.csv
    // because the variable "data" binds to this dataset

    //1. MAKE SVG CANVAS
    // const width = window.innerWidth;
    // const height = window.innerHeight; //gets these numbers in real time from browser window
    
    //take width according to chart div
    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;

    //create svg container
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //2.FILTER THE DATA #starting with just one tag, convert string object to datetime

    var parseTime = d3.timeParse("%Y-%m");

    data.forEach( function(d) {

        
        d.time_posted = parseTime(d.time_posted);
        //this is not working right now

    });

    let filtered_data = data.filter(function(d) {

        return d.tags === 'cottagecore';

    });

    console.log(filtered_data);


    //3. DETERMINE MIN AND MAX VALUES OF VARIABLES
    const count = {
        min: d3.min(filtered_data, function(d) {return +d.count;}),
        max: d3.max(filtered_data, function(d) {return +d.count;})
    };

    const time_posted = {
        min: d3.min(filtered_data, function(d) {return d.time_posted;}),
        max: d3.max(filtered_data, function(d) {return d.time_posted;})
    };

    //access with lifeExp.min

    //4. CREATE SCALES
    const margin = {top: 50, left:100, right:50, bottom:100};
    
    //https://observablehq.com/@d3/d3-scaletime

    const xScale = d3.scaleTime()
        .domain([time_posted.min, time_posted.max])
        .range([margin.left, width-margin.right])
    
    const yScale = d3.scaleLinear()
        .domain([0, count.max])
        .range([height-margin.bottom, margin.top]);

    //5. DRAW AXES 
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    //6. DRAW DOTS
    //source: https://www.educative.io/answers/how-to-create-a-line-chart-using-d3
    const points = svg.selectAll("dot") // something here is weird and it makes the dots shifted to the right
        .data(filtered_data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return xScale(d.time_posted); } )
            .attr("cy", function (d) { return yScale(d.count); } )
            .attr("r", 2)
            .style("fill", "steelblue");
    
    //6.5 DRAW LINE
    var line = d3.line()
        .x(function(d) { return xScale(d.time_posted); }) 
        .y(function(d) { return yScale(d.count); }) 
        .curve(d3.curveMonotoneX)
        
        svg.append("path")
        .datum(filtered_data) 
        .attr("class", "line") 
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2");

    //7. DRAW LABELS
    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Date");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x", -height/2)
        .attr("y", margin.left/3)
        .text("Times Posted in Tradwife Posts");

});

//HW8
//get data for tag timeline in pandas
//create network visualization and place, probably too big to be interactive?
////maybe with only tradwife blogs this would work