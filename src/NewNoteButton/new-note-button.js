var React = require('react');
var Note = require('../Note/note.js');
require("./new-note-button.css");

var _NewNoteButton = React.createClass({
  render: function () {
    return (
      <div id="newnotebutton" onClick={this.onButtonClick} className="new-note-button">
        ++++++
      </div>
    ); 
  },

  onButtonClick: function (evt) {
    return (
      <Note anote={this.props.anote} />
    );
  }
});
module.exports = _NewNoteButton;

