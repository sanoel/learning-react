var React = require('react');
var ReactDOM = require('react-dom');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var GeoJSONLayer = require('../GeoJSONLayer/geojsonLayer.js');
var Map = require('react-leaflet').Map;
var TileLayer = require('react-leaflet').TileLayer;
var _ = require('lodash');
var uuid = require('uuid');
require('./map.css');
import { render } from 'react-dom';

var _Nap = React.createClass({
  mixins: [branch],

  cursors: function() {
    return {
      notes: ['model', 'notes'],
      selectedNote: ['model', 'selected_note'],
      map: ['view', 'map'],
    };
  },

  render: function() {
    var position = [38,-85.5];
    return(
      <Map center={position} zoom={13}>
        <TileLayer
          url='http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png'
          attribution='Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
        />
      </Map> 
    )
  },

});
module.exports= _Nap;
