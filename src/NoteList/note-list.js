var React = require('react');
var Note = require('../Note/note.js');

require("./note-list.css");

var _NoteList = React.createClass({
  render: function () {
    return (
      <div id="note-list" className="notelist">
        <Note />
      </div>
    ); 
  }
});

module.exports = _NoteList;
