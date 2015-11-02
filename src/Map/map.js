var React = require('react');
var ReactDOM = require('react-dom');
var leaflet = require('leaflet');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var _ = require('lodash');
require('./map.css');

var _Map = React.createClass({
  mixins: [branch],

  cursors: function() {
    return {
      notes: ['model', 'notes'],
    };
  },

  createMap: function(element) {
    var map = leaflet.map(element, {
      center: [38,-85.5], 
      zoom: 5 
    });
    var tiles = leaflet.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png', {
      attribution: 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
    }).addTo(map);
    _.each(this.state.notes, function(note) {
      var geojsonFeature = {
        "type": "Feature",
        "properties": {
          "name": "Coors Field",
          "amenity": "Baseball Stadium",
          "popupContent": "This is where the Rockies play!"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [note.polygon] 
        }, 
      };
      leaflet.geoJson(geojsonFeature).addTo(map);
    });
    return map;
  },

  componentDidMount: function() {
    if (this.props.createMap) {
      this.map = this.props.createMap(ReactDOM.findDOMNode(this));
    } else {
      this.map = this.createMap(ReactDOM.findDOMNode(this));
    }
  }, 

  render: function() {
    return (
      <div id='map' >
      </div>
    );
  },
});
module.exports = _Map;
