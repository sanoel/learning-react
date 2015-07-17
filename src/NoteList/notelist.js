React = require('react');
require("./notelist.css");
require("../NotesContainer/notes-container.js");

var NoteList = React.createClass({
  render: function () {
    return (
      <div id="samsnotelist" className="notelist">
        This is the list of notes.
      </div>
    ); 
  }
});
React.render(<NoteList/>, document.getElementById("notes-container"));
