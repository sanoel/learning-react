var React = require('react');
var Note = require('../Note/note.js');
var _ = require('lodash');

require("./note-list.css");

var _NoteList = React.createClass({
  generateNoteUpdatedFunc: function(note) {
    return function(new_note) {
      _.each(new_note, function(val, key) {
        note[key] = val;
      });
      this.props.listUpdated(this.props.notes);
    };
  },

  render: function () {
    var notes_array  = [];
    for(var i in this.props.notes){
      var n = this.props.notes[i];
      notes_array.push(<Note title={n.title} noteUpdated={this.generateNoteUpdatedFunc(n)}/>);
    }

    return (
      <div id="NoteList">
        {notes_array}
      </div>
    ); 
  }
});
module.exports = _NoteList;
