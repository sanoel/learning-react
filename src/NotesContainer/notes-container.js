var React = require('react');
var NoteList = require('../NoteList/note-list.js');

require("./notes-container.css");

var _NotesContainer = React.createClass({
  render: function () {
    return (
      <div id="notes-container" className="notes-container">
        <NoteList />
        <hr>
        The note says: ????
      </div>
    ); 
  }
});

module.exports = _NotesContainer;

