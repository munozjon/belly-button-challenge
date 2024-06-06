// Build the metadata panel
var globaldata = [];

function buildMetadata(sample) {
  //d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    let data = globaldata[0];

    console.log(sample)

    // get the metadata field
    let metadata = data.metadata;

    //console.log(metadata);

    // Filter the metadata for the object with the desired sample number
    function getSample(dataset) {
        return dataset.id === parseInt(sample);
    };

    let filteredMetadata = metadata.filter(getSample);

    //console.log("HELLO")
    //console.log(filteredMetadata);

    // Use d3 to select the panel with id of `#sample-metadata`
    //let sampleMetadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    //let htmlMetadata = sampleMetadata.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    //for (key in filteredMetadata) {

      //htmlMetadata("h6").append(key, filteredMetadata[key]);

    //};

    d3.select(".card-body")
      .selectAll("div")
      .data(filteredMetadata)
      .enter()
      .append("div")
      .classed("panel-body", true)
      .style("font-weight", function (d) { return "bold"})
      .html(function (d) {
        return `<h6>id: ${d.id}</h6>
                <h6>ethnicity: ${d.ethnicity}</h6>`
      });

  //});
};

//console.log(buildMetadata(943));

// function to build both charts
function buildCharts(sample) {
  //d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    let data = globaldata[0];

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    function getSample(dataset) {
      return dataset.id === sample;
    };

    let filteredSample = samples.filter(getSample);

    // Get the otu_ids, otu_labels, and sample_values
    let otuIds = filteredSample[0].otu_ids;

    let otuLabels = filteredSample[0].otu_labels;

    let sampleValues = filteredSample[0].sample_values;

    // Build a Bubble Chart
    let trace1 = [{
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        color: otuIds,
        size: sampleValues
      }
    }];

    let layout1 = {
      title: "Bacteria Cultures Per Sample",
    }

    // Render the Bubble Chart
    Plotly.newPlot("bubble", trace1, layout1);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let sortedSampleValues = filteredSample.sort((a, b) => b.sample_values - a.sample_values);

    let mappedIds = sortedSampleValues[0].otu_ids.map(ids => `OTU ${ids.toString()}`).slice(0,10);

    let mappedLabels = sortedSampleValues[0].otu_labels.map(labels => labels).slice(0,10);

    let mappedValues = sortedSampleValues.map(object => object.sample_values)[0].slice(0,10);

    let trace2 = [{
      x: mappedValues,
      y: mappedIds,
      text: mappedLabels,
      type: "bar",
      orientation: "h"
    }];
    

    let layout2 = {
      title: "Top 10 Bacteria Cultures Found",
      yaxis: {autorange: 'reversed'}

    };

    // Render the Bar Chart
    Plotly.newPlot("bar", trace2, layout2);

  //});
}



// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {


    globaldata.push(data);

    // Get the names field
    let names = data.names;


    // Use d3 to select the dropdown with id of `#selDataset`
    d3.select("select")
      .selectAll("option")
      .data(names)
      .enter()
      .append("option")
      .text(function (d) {return d;})
      .attr("value", function (d) { return d; })

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample
    buildMetadata(940);
    buildCharts("940");
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  d3.select(".card-body").selectAll("div").remove();
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
