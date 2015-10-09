var Baobab = require('baobab');
var uuid = require('uuid');

var stateTree = new Baobab({
  models: {
    notes: initial_notes(),
    allTags: ['low area', 'herbicide'],
  },
  view: {
    tabmode: 'fields', //options are all, fields, or tags 
    activetags: [],
    tags_modal: false,
  }
}); 

function initial_notes() { 

  var notes_list = {};

  for (var i = 1; i<3;i++) {
    var note = {
        text: 'ran out of herbicide and applied none here',
        tags: ['herbicide'],
        fields: ['Smith40'],
    };
    if (i === 2) {
      note = {
        text: 'hey',
        tags: ['low area'],
        fields: ['Smith40'],
      };
    }
    note.order = i;
    note.id = uuid.v4().replace('-','');
    notes_list[note.id] = note;
  };
  return notes_list;
}
module.exports = stateTree; 
