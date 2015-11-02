var React = require('react');
require('./first-note-button.css');

var _FirstNoteButton = React.createClass({
  onClick: function() {
  },

  render: function() {
    return (
    <textarea id="first-note-button" defaultValue="Type your first note here and draw an area on the map to go with it."></textarea> 
    );
  },
});
module.exports = _FirstNoteButton;
