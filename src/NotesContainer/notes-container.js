var React = require('react');
var NoteList = require('../NoteList/note-list.js');

require("./notes-container.css");

var _NotesContainer = React.createClass({
  aNoteWasEdited: function(new_note_text) {
    this.props.onNoteEdit(new_note_text);
  },

  render: function () {
    return (
      <div id="notes-container" className="notes-container">
        <NoteList aaron={this.props.sam} onNoteEdit={this.aNoteWasEdited} />
        <hr/>
        The note says: {this.props.sam}
      </div>
    ); 
  }
});

module.exports = _NotesContainer;

