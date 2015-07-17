React = require('react');
require("./note.css");
require("../NoteList/notelist.js");

var Note = React.createClass({
  render: function () {
    return (
      <div contentEditable="true" className="note">
        This is Note 1.
      </div>
    ); 
  }
});
React.render(<Note/>, document.getElementById("samsnotelist"));
