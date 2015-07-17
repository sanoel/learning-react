var React = require('react');
var Note = require('../Note/note.js');

require("./note-list.css");

var _NoteList = React.createClass({
  aNoteWasEdited: function(new_note_text) {
    this.props.onNoteEdit(new_note_text);
  },

  getInitialProps: function() {
    return {
      aaron: 'default value for aaron',
      onNoteEdit: function() { },
    };
  },

  render: function () {
    return (
      <div id="note-list" className="notelist">
        <Note title={this.props.aaron} yifei={this.aNoteWasEdited} />
      </div>
    ); 
  }
});

module.exports = _NoteList;
