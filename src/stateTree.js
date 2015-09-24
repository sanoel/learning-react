var Baobab = require('baobab');
var uuid = require('uuid');

var stateTree = new Baobab({
  models: {
    notes: initial_notes()
  }
}); 

function initial_notes() { 

  var notes_list = {};

  for (var i = 1; i<3;i++) {
    var note = {
        text: 'hello',
        tags: ['no herbicide; ran out'],
        fields: ['Smith40'],
    };
    if (i === 2) {
      note = {
        text: 'hey',
        tags: ['low areas'],
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
