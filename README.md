# belly-button-challenge

## GitHub Pages
https://munozjon.github.io/belly-button-challenge/

## Module 14 Challenge
For this challenge, I built an interactive dashboard using the data form the Belly Button Biodiversity dataset (https://robdunnlab.com/projects/belly-button-biodiversity/). This dataset catalogs microbes that colonize human navels. I utilized JavaScript, HTML, and CSS to develop a visual webpage where a bar chart, bubble chart, and an informational table are displayed.

Visualizations for each subject is able to display via the drop-down select on the page. Choosing a subject ID number will update the page with that subject's data. This includes their top 10 bacteria cultures, a summary of their demographics, and a bubble chart with the bacteria cultures per sample. This is done via the JavaScript file, with functions to display the charts and the metadata, as well as capturing the event when the user selects a new subject ID number.

For the JavaScript file, the data and the HTML file was referenced using the D3 library. This allowed me to read the JSON of the dataset, while also appending to the HTML file using specified tags and attributes. The charts are displayed using the Plotly library in JavaScript to allow for an interactive visualization.
