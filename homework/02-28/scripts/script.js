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
    const margin = {top: 50, left:150, right:50, bottom:100};
    
    const xScale = d3.scaleBand()
        .domain(["1952", "1957", "1962", "1967", "1972", "1977", "1982", "1987", "1992", "1997", "2002", "2007"])
        .range([margin.left, width-margin.right])
        .padding(0.5);
    
    const yScale = d3.scaleLinear()
        .domain([1000, pop.max])
        .range([height-margin.bottom, margin.top]);

    //5. DRAW AXES (not complete)
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    //6. DRAW BARS (not complete)
    const points = svg.selectAll("rect")
        .data(filtered_data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", function(d) { return yScale(d.pop); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - (margin.bottom + yScale(d.pop)) })
            .attr("fill", "steelblue");
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
        .attr("y", margin.left/2)
        .text("Population");

});

//HW7 customize:
//change country and variable - check if it has updated
//change into a line chart rather than bars
