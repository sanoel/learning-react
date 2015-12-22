var React = require('react');
var ReactDOM = require('react-dom');
var L = require('leaflet');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var GeoJSONLayer = require('../GeoJSONLayer/geojsonLayer.js');
var _ = require('lodash');
var uuid = require('uuid');
require('./map.css');

var map;
var cur_mode;
var old_map_lock_mode;
var poly_list = [];
var tempLayer = null;

var _Map = React.createClass({
  mixins: [branch],

  cursors: function() {
    return {
      notes: ['model', 'notes'],
      selectedNote: ['model', 'selected_note'],
      map: ['view', 'map'],
    };
  },

  currentLayer: null,

  createMap: function(element) {
    map = L.map(element, {
      center: [38,-85.5],
      zoom: 5
    });
    var tiles = L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png', {
      attribution: 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
    }).addTo(map);


    //map.dragging.disable();
    map.on('mousedown', this.drawMarker);
    return map;
  },

  drawMarker: function(e) {
    if (_.isEmpty(this.state.selectedNote)) return;
  //  var marker = new L.marker([e.latlng.lat, e.latlng.lng], {
  //  }).addTo(map);
    
    var notes = this.cursors.notes.get();
    var coordsCursor = this.context.tree.select('model', 'notes', this.state.selectedNote, 'geojson', 'coordinates', 0);
    coordsCursor.push([e.latlng.lat, e.latlng.lng]);
    this.context.tree.commit();
  },
  
  dropMarker: function(e) {
    var self = this;
    var marker = new L.marker([e.latlng.lat, e.latlng.lng], {
      draggable:true
    });
    self.tempLayer = L.layerGroup();
    self.tempLayer.addLayer(marker).addTo(map);
    
    var notes = self.cursors.notes.get();
    var geojsonCursor = self.context.tree.select('model', 'notes', Object.keys(notes)[0], 'geojson');
    geojsonCursor.set(self.tempLayer.toGeoJSON());
    self.context.tree.commit();
    map.on('mousemove', function(e) {
      geojsonCursor = self.context.tree.select('model', 'notes', Object.keys(notes)[0], 'geojson');
      marker.setLatLng (L.latLng(e.latlng.lat, e.latlng.lng));
      geojsonCursor.set(self.tempLayer.toGeoJSON());
      self.context.tree.commit();
    });
    map.on('mouseup', function(e) {
      map.off('mousemove', self.moveMarker);
      geojsonCursor.set(self.tempLayer.toGeoJSON());
      self.context.tree.commit();
    });
  },

  updatePoint: function(evt) {
    
  },
  
  componentDidMount: function() {
    map = this.createMap(ReactDOM.findDOMNode(this));
    this.cursors.map.set('$isLoading', false);
    this.context.tree.commit();
  },

  lockMap: function(){
    cur_mode = old_map_lock_mode;
    if(cur_mode===0){                       
      map.dragging.disable();
      cur_mode = 1;
    } else {
      map.dragging.enable();
      cur_mode = 0;
    }
    old_map_lock_mode = cur_mode;
  },

  renderMapOrLoading: function() {
    console.log('rendering');
    console.log(this.state.map['$isLoading']);
    if (this.state.map['$isLoading']) {
      console.log('if');
      return 'Loading.....';
    } else {
      console.log('else');
      console.log(map);
      var layers = [];
      _.each(this.state.notes, function(note) {
        layers.push(<GeoJSONLayer map={map} isActiveDrawing={note.isActive} geojson={note.geojson} key={uuid.v4()}/>);
      });
    }
    return(
      <div id="button-wrapper" >
        <input type="button" id="map-lock-button" value="lock-map" onClick={this.lockMap} />
      {layers}
      </div>
    );
  },

  render: function() {
     return (
      <div id="map">
        {this.renderMapOrLoading()}
      </div>
    );
  },

});
module.exports= _Map;
