const request = require("request")
const util = require("util")

const ZOOM = 18
const DEFAULT_CENTER = "40.760140, -74.003251"

request("http://localhost:8080/buses", function(err, resp, body) {
  console.log(body);
  var locations = JSON.parse(body);
  console.log(locations);
  var markers = [];
  locations.forEach(function(loc) {
    console.log('loc: ', loc)
      var marker = util.format("markers=size:tiny|color:0xff0000|label:%d|%d,%d", loc.id, loc.location.latitude, loc.location.longitude);
      markers.push(marker);
  })
  var markersStr = markers.join('&');
  request("http://localhost:8080/buses/center/1", function(err, resp, body) {
    var center = JSON.parse(body)
    console.log('center: ', center)
    //var centerStr = util.format("center=%d,%d", center.latitude, center.longitude);
    var centerStr = "center=" + DEFAULT_CENTER
    var uri = util.format('https://maps.googleapis.com/maps/api/staticmap?%s&zoom=%d&scale=2&size=600x400&maptype=roadmap&format=png&visual_refresh=true&%s',
      centerStr, ZOOM, markersStr);
      console.log(uri);
  })
})
