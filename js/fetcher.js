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

    var tableStart = "<table><caption>Events are happening around the world! <a href=\"https://docs.google.com/forms/d/1w73TIPQwTlcmqRJ3IC9Oqd-YdtRvV-HL3xCyFtqjKHQ/viewform?usp=send_form\" title=\"Google Forms\">Let us know about yours!</a></caption><thead><tr><th>Starting Local Time</th><th>Country</th><th>State/Province</th><th>City/Town</th><th>Location</th><th>Contact</th><th>About</th></thead><tbody>";
    var tableEnd = "</tbody></table>";

    // 'payload' is the HTML we inject into #events
    //
    // create the HTML in a variable first so we only have to touch
    // the DOM once, otherwise performance goes down the 🚽
    var payload = tableStart;

    var n = rows.length;
    while (n--) {
      var nClass = (n % 2) ? "odd" : "even";
      payload += "<tr class=\"" + nClass + "\">";

      var len = rows[n].c.length,
          i = 2;
      for (i; i < len; i++) {
        var cellData = "";
        // leave cellData blank if the cell value is undefined or
        // null, but still print the <td></td> below in order to
        // keep the columns aligned
        if (rows[n].c[i] && rows[n].c[i].v !== null) {
          cellData = (i === 2) ? rows[n].c[i].f : rows[n].c[i].v;
        }
        payload += "<td>" + cellData + "</td>";
      }
      payload += "</tr>";
    }

    payload += tableEnd;

    var eventsSection = document.getElementById("events");
    eventsSection.innerHTML = payload;
  }
}}}};
