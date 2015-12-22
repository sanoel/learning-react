var React = require('react/addons');
var L = require('leaflet');
var Baobab = require('baobab');
var GeoJSONLayer_map = require('../GeoJSONLayer/geojsonLayer.js');
var branch = require('baobab-react/mixins').branch;
require('./map.css');

var map = null;

var cur_mode;
var old_map_lock_mode;

var poly_list = [];
var tempLayer = null;

var _Map = React.createClass({
  mixins: [branch],

  cursors: function() {
    return {
      notes: ['models', 'notes'],
      map: [ 'view', 'map' ],
    };
  },

  currentLayer: null,
	
	/*
  componentWillMount: function() {
	  console.log("component will mount in map.js");
		this.cursors.map.set(['$isLoading'], true);
    //this.cursors.map.set(['$isLoading', true]);
  },
	*/

  createMap: function(element) {
    console.log("createMap function");

    map = L.map(element, {
      center: [38,-85.5], 
      zoom: 5 
    });
    console.log("create map create map");
    console.log(map);

    var tiles = L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png', {
      attribution: 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
    }).addTo(map);
    
    
    console.log("compare map, this is the created map");
    console.log(map);

    map.dragging.disable();

    var drop_marker = function(e){
      marker = new L.marker([e.latlng.lat, e.latlng.lng], {
        draggable:true
      });

      marker_list.push(marker);
      this.tempLayer = L.layerGroup();

      console.log(this.tempLayer);

      this.tempLayer.addLayer(marker).addTo(map);
      // if ( this.whichIsSelected === true) {
      this.cursors.geojson.set(this.tempLayer.toGeoJSON());
      //self.cursors.geojson.set(self.previouslyLayer.toGeoJSON());
      this.context.tree.commit();
      //
      var move_marker = function move_marker(e) {
        marker.setLatLng (L.latLng(e.latlng.lat, e.latlng.lng));
        // if ( this.whichIsSelected === true) {
        this.cursors.geojson.set(this.tempLayer.toGeoJSON());
        this.context.tree.commit();
        };
                        
				this.props.map.on('mousemove', move_marker);
        this.props.map.on('mouseup', function(e) {
        this.props.map.off('mousemove', move_marker);

        //self.cursors.geojson.set(self.previouslyLayer.toGeoJSON());
        // if ( this.whichIsSelected === true)
        this.cursors.geojson.set(this.tempLayer.toGeoJSON());
        this.context.tree.commit();
        });
        //marker.addTo(self.props.map);
    };
    //map.on('mousedown', drop_marker);
    return map;
  },

  polyCoorTrans: function(temp_layer){
    for (var i in temp_layer){
      var coordinate = i.getLatLng();
      poly_list.push(coordinate);  
      return poly_list;
    }
  },

  whichIsSelected: function (noteIndex){
    for ( var i in this.state.notes){
      if (noteIndex === i.noteIndex){
        return true;
      }
    }
    
    return false;
  },

  componentDidMount: function() {
    map = this.createMap(this.getDOMNode());
    this.cursors.map.set('$isLoading', false);
    this.context.tree.commit();
  },

  lockMap: function(){
    cur_mode = old_map_lock_mode;
    if(cur_mode===0){
			map.dragging.disable();
      cur_mode = 1;
    }else{
      map.dragging.enable();
      cur_mode = 0;
    }
    old_map_lock_mode = cur_mode;
  },

  renderMapOrLoading: function() {
    if (this.state.map['$isLoading']) {
      return 'Loading.....';
    } else {
      var layers = [];

      for (var i in this.state.notes) {
	console.log("layers in map.js");
	console.log(layers);
        layers.push(<GeoJSONLayer_map map={map} isActiveDrawing={this.state.notes[i].isActive} geojson_data={this.state.notes[i].geojson} />);
	console.log(layers);
        console.log("generate GeoJSONLayer_map");
      }
      console.log(layers);
  
         <div id="button-wrapper" >
          <input type="button" id="map-lock-button" value="lock-map" onClick={this.lockMap} />
        </div>
        {layers}
      };
  },
  
  render: function() {
    console.log("map render");
     return (
      <div id="map">
        {this.renderMapOrLoading()}
      </div>
    );
  },

});

module.exports= _Map;

