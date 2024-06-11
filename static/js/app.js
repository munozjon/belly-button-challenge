// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    function getSample(dataset) {
        return dataset.id === parseInt(sample);
    };

    let filteredMetadata = metadata.filter(results => results.id == parseInt(sample));

    // Use d3 to select the panel with id of `#sample-metadata`
    d3.select("#sample-metadata")
      .selectAll("div")
      .data(filteredMetadata) // Reference the data to add to the 'div'
      .enter()
      .append("div") // Append the data to the 'div' tag
      .classed("panel-body", true)
      .style("font-weight", function (d) { return "bold"})
      .html(function (d) { // Adds a new tag for each key-value in the filtered metadata
        return `<h6>ID: ${d.id}</h6>
                <h6>ETHNICITY: ${d.ethnicity}</h6>
                <h6>GENDER: ${d.gender}</h6>
                <h6>AGE: ${d.age}</h6>
                <h6>location: ${d.location}</h6>
                <h6>BBTYPE: ${d.bbtype}</h6>
                <h6>WFREQ: ${d.wfreq}</h6>`
      });

  });
};


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {


    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    function getSample(dataset) {
      return dataset.id === sample;
    };

    let filteredSample = samples.filter(results => results.id == sample);

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
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Number of Bacteria"}
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", trace1, layout1);

    
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let sortedSampleValues = filteredSample.sort((a, b) => b.sample_values - a.sample_values);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
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
      xaxis: {title: 'Number of Bacteria'},
      yaxis: {autorange: 'reversed'}

    };

    // Render the Bar Chart
    Plotly.newPlot("bar", trace2, layout2);

  });
}



// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;
    
    // Use d3 to select the dropdown with id of `#selDataset`
    d3.select("#selDataset")
      .selectAll("option")
      .data(names) // Reference the names to populate the select options
      .enter()
      .append("option") // Append the names as their own 'options'
      .text(function (d) {return d;}) 
      .attr("value", function (d) { return d; });

    // Get the first sample from the list
    let firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample);
    buildCharts(firstSample);

  });
}

// Function for event listener
function optionChanged(newSample) {

  // Build charts and metadata panel each time a new sample is selected
  d3.select(".card-body").selectAll("div").remove(); // Removes the previous demographic data
  buildMetadata(newSample);
  buildCharts(newSample);
};

// Initialize the dashboard
init();
