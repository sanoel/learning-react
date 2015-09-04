var React = require('react');
require("./new-note-button.css");

var _NewNoteButton = React.createClass({
  render: function () {
    return (
      <button type= "button" onClick={this.onButtonClick} className="new-note-button">
      Add Note
      </button>
    ); 
  },

  onButtonClick: function (evt) {
    this.props.addNoteButtonClick();
  },
});
module.exports = _NewNoteButton;

