

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

});