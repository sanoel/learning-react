React = require('react');
require("./new-note-button.css");
require("../NotesContainer/notes-container.js");
var NewNoteButton = React.createClass({
  render: function () {
    return (
      <div id="newnotebutton" className="new-note-button">
        ++ New Note ++
      </div>
    ); 
  }

  onButtonClick: function () {
  }

});
React.render(<NewNoteButton/>, document.getElementById("notes-container"));
