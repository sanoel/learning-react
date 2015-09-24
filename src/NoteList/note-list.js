var React = require('react/addons');
var Note = require('../Note/note.js');
var NewNoteButton = require('../NewNoteButton/new-note-button.js');
var _ = require('lodash');
var uuid = require('uuid');
var branch = require('baobab-react/mixins').branch;
require("./note-list.css");

var _NoteList = React.createClass({
  mixins: [branch],

  cursors: function() {
    return {
      notes:['models', 'notes'],
    };
  },
  
  deleteNote: function(id) {
    this.state.notes.id.unset();
    this.context.tree.commit();
    console.log(this.state.notes);
    _.each(this.state.notes, function(note) {
      if (note.order > delete_note_order) this.state.notes.note.order++;
    });
    console.log(this.state.notes);
  },

  addNote: function() {
    var obj_id = uuid.v4().replace('-','');
    this.cursors.notes.set(obj_id);
    var obj = {   
      id: obj_id,
      text: ' ',
      order: Object.keys(this.state.notes).length,
      tags: [],
      fields:[],
      delete: this.cursors.deleteNote(obj_id),
    };
    this.cursors.notes.set(obj_id, obj);
    this.context.tree.commit();
  },
  
  render: function () {
    var notes_array  = [];
    for(var i in this.state.notes){
      var n = this.state.notes[i];
      notes_array.push(<Note id={this.state.notes[i].id} key={this.state.notes[i].id} />);
    }

    return (
      <div className="notelist">
        {notes_array}
        <NewNoteButton addNoteButtonClick={this.addNote} />
      </div>
    ); 
  }
});
module.exports = _NoteList;
