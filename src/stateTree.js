var Baobab = require('baobab');
var uuid = require('uuid');

var stateTree = new Baobab({
  model: {
    notes: initial_notes(), //initial_notes(),
    all_tags: ['low area', 'herbicide'],
    tags_modal: {
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
  }
}); 

function initial_note() { 
  var notes_list = {};
  for (var i = 1; i<2;i++) {
    var note = {
        text: 'Type your first note here',
        tags: [],
        fields: [],
        polygon: [[]],
    };
    note.order = i;
    note.id = uuid.v4().replace('-','');
    notes_list[note.id] = note;
  };
  return notes_list;
}

function initial_notes() { 

  var notes_list = {};

  for (var i = 1; i<4;i++) {
    var note = {
        text: 'ran low on herbicide and applied lower rate here',
        tags: [{text:'herbicide'}],
        fields: ['Smith40'],
        polygon: [[-85.5, 38.5], [-85.55, 38.55]],
    };
    if (i === 2) {
      note = {
        text: 'drown out; replanted 6/18/2015',
        tags: [{text:'low area'}],
        fields: ['Smith40'],
        polygon: [[[38.5, -85.5], [38.5, -85.55]]],
      };
    }
    if (i === 3) {
      note = {
        text: 'applied snake oil',
        tags: [],
        fields: ['Smith40'],
        polygon: [[[38.5, -85.5], [38.5, -85.55]]],
      };
    }
    note.order = i;
    note.id = uuid.v4().replace('-','');
    notes_list[note.id] = note;
  };
  return notes_list;
}
module.exports = stateTree; 
