d3.csv("./data/gapminder.csv").then(function(data) {
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

    //2.FILTER THE DATA
    let filtered_data = data.filter(function(d) {

        return d.country === 'Ghana';

    });

    //3. DETERMINE MIN AND MAX VALUES OF VARIABLES
    const pop = {
        min: d3.min(filtered_data, function(d) {return +d.pop;}),
        max: d3.max(filtered_data, function(d) {return +d.pop;})
    };

    //access with lifeExp.min

    //4. CREATE SCALES
    const margin = {top: 50, left:100, right:50, bottom:100};
    
    const xScale = d3.scaleBand()
        .domain(["1952", "1957", "1962", "1967", "1972", "1977", "1982", "1987", "1992", "1997", "2002", "2007"])
        .range([margin.left, width-margin.right])
        .padding(0.5);
    
    const yScale = d3.scaleLinear()
        .domain([1000, pop.max])
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
            .attr("cx", function (d) { return xScale(d.year); } )
            .attr("cy", function (d) { return yScale(d.pop); } )
            .attr("transform", `translate(${margin.left},0)`)
            .attr("r", 2)
            .style("fill", "steelblue");
    
    //6.5 DRAW LINE
    var line = d3.line()
        .x(function(d) { return xScale(d.year); }) 
        .y(function(d) { return yScale(d.pop); }) 
        .curve(d3.curveMonotoneX)
        
        svg.append("path")
        .datum(filtered_data) 
        .attr("class", "line") 
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .attr("transform", `translate(${margin.left},0)`)
        .style("stroke-width", "2");

    //7. DRAW LABELS
    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Year");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x", -height/2)
        .attr("y", margin.left/3)
        .text("Population");

});

//HW7 customize:
//change country and variable 
//change into a line chart rather than bars
//why is it always shifted right? 
