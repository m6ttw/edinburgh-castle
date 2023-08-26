# Edinburgh Castle Heritage Map

## Leaflet.js project showing the various cultural heritage designations at Edinburgh Castle

This project is a stripped down example of one of the first pieces of work I completed in my job at Historic Environment Scotland. Through working on this feature I learned how to use several of Leaflet's geoJSON capabilities, and also got my first real-world experience of solving tricky JavaScript problems.

* Purpose of feature is to visualise the various cultural heritage designations of historic sites and how they relate to a site spatially
* Only those designations which overlap the site boundary are displayed
* Designations can be either polygons or points
* User can click on each designation layer which brings up a popup containing information on that particular designation
* User can also click checkboxes in layer control to show and hide desired designation types

For the real life app the geoJSON data was retrieved from the organisation's Oracle database and so my next steps for this app are to replicate that using MySQL and Node.js