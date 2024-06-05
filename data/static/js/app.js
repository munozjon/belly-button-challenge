// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    function getSample(dataset) {
        return dataset.id === sample;
    };

    let filteredMetadata = metadata.filter(getSample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleMetadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (key in filteredMetadata) {

      // console.log(key, filteredMetadata[key]);

      sampleMetadata.append(key, filteredMetadata[key]);

    };

    // console.log(sampleMetadata)

  });
};

console.log(buildMetadata(943));

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

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

    let mappedValues = sortedSampleValues.map(object => object.sample_values)[0].slice(0,10)

    let trace2 = [{
      x: mappedValues,
      y: mappedIds,
      type: "bar",
      orientation: "h"
    }];
    

    let layout2 = {
      title: "Top 10 Bacteria Cultures Found"
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", trace2, layout2);

  });
}

console.log(buildCharts("940"));

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
