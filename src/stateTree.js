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
    note.delete = function(id) {
      var delete_note_order = self.state.notes[id].order;
      self.context.tree.unset(['models', 'notes', id]);
      self.context.tree.commit();
      _.each(self.state.notes, function(note) {
        if (note.order > delete_note_order) {
          self.context.tree.set(['models', 'notes', note.id, 'order'], self.state.notes[note.id].order--);
        }
      });
      self.context.tree.commit();
    };
    notes_list[note.id] = note;
  };
  return notes_list;
}

module.exports = stateTree; 
