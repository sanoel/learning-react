var Baobab = require('baobab');
var uuid = require('uuid');

var tree = new Baobab({
  model: {
    selected_note: {},
    notes: initial_notes(), //initial_notes(),
    tags: initial_tags(),
    tags_modal: {
      input_text:'',
      visible: false,
      note_id: {},
      completions: [],
      temp_tags: [],
    },
  },
  view: {
    tags_modal: false,
    tags_modal_note_id: {},
    tags_modal_completions: [],
    sort_mode: 'all', //'all' 'fields' 'tags'
    map: {$isLoading: true}, 
  }
}); 

function initial_tags() {
  var text1 = 'herbicide';
  var text2 = 'low area';
  var tags_list = {text1: {text: text1, references: 1}, text2: {text: text2, references: 1}};
  return tags_list;
}

function initial_notes() { 
  var notes_list = {};
  for (var i = 1; i<4;i++) {
    var note = {
        text: 'ran low on herbicide and applied lower rate here',
        tags: {herbicide: {text: 'herbicide'}},
        fields: ['Smith40'],
        geojson: { "type": "Polygon",
          "coordinates": [
            [ ]
          ]
        },
        geojson_visible: 'Show',
        tags_modal_visibility: false,
        color: {getColor},
    };
    if (i === 2) {
      var text = 'low area';
      note = {
        text: 'drown out; replanted 6/18/2015',
        tags: {text: {text:text}},
        fields: ['Smith40'],
        geojson: { "type": "Polygon",
          "coordinates": [
            [ ]
          ]
        }, 
        geojson_visible: 'Show',
        tags_modal_visibility: false,
        color: {getColor},
      };
      note.tags['low area'] = {text:'low area'};
    }
    if (i === 3) {
      note = {
        text: 'applied snake oil',
        tags: [],
        fields: ['Smith40'],
        geojson: {
          "type": "Feature",
          "properties": {
            "name": "Coors Field",
            "amenity": "Baseball Stadium",
            "popupContent": "This is where the Rockies play!"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [-104.99404, 39.75621]
          }
        },
        geojson_visible: 'Show',
        tags_modal_visibility: false,
        color: {getColor},
      };
    }
    note.order = i;
    note.id = uuid.v4().replace('-','');
    notes_list[note.id] = note;
  };
  return notes_list;

  function getColor() {
    var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
  }
}
module.exports = tree; 
