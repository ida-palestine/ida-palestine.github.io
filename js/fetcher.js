// can't wrap this in an anonymous function because the point is to
// pollute the global namespace by creating a function that gets
// executed when the jsonp response is received
var google = { visualization: { Query: { setResponse: function (json) {
  "use strict";
  // might as well leave this for debugging
  console.log(json.table);

  var rows = json.table.rows;

  // reverse the order since we're using the while(n--) method
  if (rows.reverse().length) {

    var tableStart = "<table><thead><tr><th>Country</th><th>State</th><th>City</th><th>Location</th><th>Starting Local Time</th><th>Contact</th></thead><tbody>";
    var tableEnd = "</tbody></table>";

    // 'payload' is the HTML we inject into #events
    //
    // create the HTML in a variable first so we only have to touch
    // the DOM once, otherwise performance goes down the 🚽
    var payload = "<h3>Events</h3><p><em>Events are happening around the world! <strong><a href=\"https://docs.google.com/forms/d/1w73TIPQwTlcmqRJ3IC9Oqd-YdtRvV-HL3xCyFtqjKHQ/viewform?usp=send_form\" title=\"Google Forms\">Let us know about yours!</a></strong></em></p>";

    var n = rows.length;
    while (n--) {
      payload += tableStart;

      var nClass = (n % 2) ? "odd" : "even";
      payload += "<tr class=\"" + nClass + "\">";

      var len = rows[n].c.length,
          i = 2;

      for (i; i < 8; i++) {
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

      // add the 'about' section
      if (rows[n].c[8]) {
        payload += "<tfoot><tr><td colspan=\"6\">" + rows[n].c[8].v + "</td></tr></tfoot>";
      }
      payload += tableEnd;
    }

    var eventsSection = document.getElementById("events");
    eventsSection.innerHTML = payload;
  }
}}}};
