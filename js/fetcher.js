// can't wrap this in an anonymous function because the point is to
// pollute the global namespace by creating a function that gets
// executed when the jsonp response is received
var google = { visualization: { Query: { setResponse: function (json) {
  "use strict";
  var rows = json.table.rows;

  // reverse the order since we're using the while(n--) method
  if (rows.reverse().length) {

    var tableStart = '<table class="tablesaw" data-tablesaw-sortable data-tablesaw-sortable-switch><thead><tr><th scope="col" data-tablesaw-sortable-col>Country</th><th scope="col" data-tablesaw-sortable-col>State</th><th scope="col" data-tablesaw-sortable-col>City</th><th scope="col" data-tablesaw-sortable-col>Location</th><th scope="col" data-tablesaw-sortable-col>Starting Local Time</th><th scope="col" data-tablesaw-sortable-col>Contact</th><th  scope="col" data-tablesaw-sortable-col>About</th></thead><tbody>';
    var tableEnd = "</tbody></table>";

    // 'payload' is the HTML we inject into #events
    //
    // create the HTML in a variable first so we only have to touch
    // the DOM once, otherwise performance goes down the 🚽
    var payload = "<h3>Events</h3><p><em>Events are happening around the world! <strong><a href=\"https://docs.google.com/forms/d/1w73TIPQwTlcmqRJ3IC9Oqd-YdtRvV-HL3xCyFtqjKHQ/viewform?usp=send_form\" title=\"Google Forms\">Let us know about yours!</a></strong></em></p><iframe frameborder=0 style='width:100%;height:500px;' src='https://www.zeemaps.com/pub?group=1662390'> </iframe>";

    payload += tableStart;

    var n = rows.length;
    while (n--) {
      var nClass = (n % 2) ? "odd" : "even";
      payload += "<tr class=\"" + nClass + "\">";

      // Skip the first two columns and the trailing empty ones.
      var i = 2;
      for (i; i < 9; i++) {
        var cellData = "";
        // leave cellData blank if the cell value is undefined or
        // null, but still print the <td></td> below in order to
        // keep the columns aligned
        if (rows[n].c[i] && rows[n].c[i].v) {
          cellData = rows[n].c[i].f || rows[n].c[i].v;
        }
        // only make a table cell if there's text
        payload += "<td>" + cellData + "</td>";
      }
      payload += "</tr>";
    }
    payload += tableEnd;

    var eventsSection = document.getElementById("events");
    eventsSection.innerHTML = payload;
  }
}}}};
