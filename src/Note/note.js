var React = require('react');

require("./note.css");

var _Note = React.createClass({
  render: function () {
    return (
      <div contentEditable="true" className="note">
        This is Note 1.
      </div>
    ); 
  }
});

module.exports = _Note;
