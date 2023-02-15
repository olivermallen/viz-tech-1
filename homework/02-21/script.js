

function parseLOG(d) {

    console.log(d);

}

//load data
console.log("make sure to disable cache for this to work properly!")
console.log("parsing raw data...")
d3.tsv("full_data.tsv").then(parseLOG);

//manipulate data
d3.tsv("full_data.tsv").then(function(data){
    //print first row
    console.log("printing first row of raw data...")
    console.log(data[0]);
    //convert tags to arrays
    data.forEach(function(d){
        d.tags = d.tags.split(",");
    });
    //print first row to console again
    console.log("printing first row of data with tags converted to an array...")
    console.log(data[0]);
    //filter by photo posts
    let filtered_data = data.filter(function(d) {

        // Return the object iff its key is equal to a specified string
        return d.post_type === "photo";

    })

    console.log("printing data for only photo posts...")
    console.log(filtered_data);
    //get maximum number of tags in a post

    function getValue (d) {
        return d.tags.length;
    }

    const max_tags = d3.max(data, getValue);
    const min_tags = d3.min(data, getValue);
    console.log("printing maximum number of tags and minimum number of tags in any post...")
    console.log(max_tags, min_tags);

})

// PART 2: MANIPULATING (TRANSFORMING) DATA

// We can PREPROCESS the data directly with d3 so that before
// the data are loaded, we can do the following kinds of things:
//     - Rename columns to more user-friendly names
//     - Select only a slice of columns to include
//     - Coerce values to different types (e.g., string to number)
//     - Calculate new values and columns
//
// The following demonstration uses a dataset given in a CSV file.

// We can manipulate (transform) a dataset by accessing the original 
// rows of the CSV file within the .then() callback method.  

// NOTE: Notice that throughout the function(data) {...} the input argument "data"
//       references your csv file, so that you can perform multiple alternations
//       using the same reference to the dataset (i.e., that is why "data" is defined
//       only once as an input argument). Changes are cumulative, that is, every
//       change you make at one point acts on the data it receives from a change
//       in a previous point.  

d3.csv("datasets/cities-sm.csv").then(function(data){
    
    // This accesses the first row of the csv dataset

    console.log(data[0]);

    // Change values using the .forEach() method that loops
    // through the rows of the dataset. In this way, you 
    // can alter values of individual keys selectively.

    //  Here, we are casting strings into numbers (i.e., the strings
    //  that represent numbers but are loaded as strings).
    //  We can do that in several ways. For example, two methods are:
    //      a. Use the built-in parseFloat() javascript function
    //      b. Use the unary operator +
    //  The following function uses method (b).

    data.forEach( function(d) {

        // Here, we alter the keys "population" and "land area" only.
        // Thus, we leave "city" and "state" as they are.
        d.population = +d.population;
        d["land area"] = +d["land area"];

    });

    // Filtering Data 
    
    // In the following, we use the JS .filter() method to return a row 
    // filled with elements that pass a particular test provided by a 
    // custom function.

    let filtered_data = data.filter(function(d) {

        // Return the object iff its key is equal to a specified string
        return d.state === "NY";

    })

    console.log(filtered_data);

    // Finding MINIMUM or MAXIMUM value of a numerical variable

    // Here, the methods d3.min() and d3.max() require 2 arguments:
    // the array/object to be analyzed and an "accessor" function that
    // returns the object key value to be used for the analysis.

    function getValue(d) {
        // Retrieves only the value in the column "population"
        return +d.population;
    }

    const min_pop = d3.min(data, getValue);
    const max_pop = d3.max(data, getValue);

    console.log(min_pop, max_pop);

    // GROUPING DATA

    // In the following, we use the JS .group method for arrays.
    // The method groups values by a particular key. It returns a map from 
    // key to the corresponding array of values from the input.

    // Here, we group the data by "city".

    let grouped_data = d3.group(data, function(d) {

       return d.city;

    });

    // Returns a Map
    console.log(grouped_data);

    // Then, you can query the map for a particular group.
    console.log(grouped_data.get("boston"));

});