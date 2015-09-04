var React = require('react');
var Note = require('../Note/note.js');
var NewNoteButton = require('../NewNoteButton/new-note-button.js');
var _ = require('lodash');
var noteCounter = 0;
require("./note-list.css");

var _NoteList = React.createClass({
  addNote: function() {
    var notes_array = this.props.notes;
    notes_array.push(<Note title={"New note"} noteUpdated={this.generateNoteUpdatedFunc(noteCounter)} removeNote={this.deleteNote} idNum={noteCounter}/>);
    noteCounter++;
    this.props.listUpdated(this.props.notes);
  },
  
  deleteNote: function(noteIdNum) {
    console.log(this.props.notes);
    for(var i in this.props.notes) {
      var n = this.props.notes[i];
      if (n.idNum == noteIdNum) {
        this.props.notes.splice(i, 1);  
        this.props.listUpdated(this.props.notes);
        break;
      }
    }
  },

  generateNoteUpdatedFunc: function(note) {
    var self = this;
    return function(new_note) {
      _.each(new_note, function(val, key) {
        note[key] = val;
      });

      self.props.listUpdated(self.props.notes);
    };
  },

  render: function () {
    var notes_array  = [];
    for(var i in this.props.notes){
      var n = this.props.notes[i];
      notes_array.push(<Note title={n.title} noteUpdated={this.generateNoteUpdatedFunc(noteCounter)} removeNote={this.deleteNote} idNum={noteCounter}/>);
    noteCounter++;
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
