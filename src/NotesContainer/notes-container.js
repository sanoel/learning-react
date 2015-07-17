React = require('react');
require("./notes-container.css");

var NotesContainer= React.createClass({
  render: function () {
    return (
      <div id="notes-container" className="notes-container">
        <h2> NOTES </h2> 
      </div>
    ); 
  }
});
React.render(<NotesContainer/>, document.getElementById("app-container"));
