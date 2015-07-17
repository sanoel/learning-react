var React = require('react');

require("./note.css");

var _Note = React.createClass({

  noteEdited: function(evt) {
    this.props.yifei(evt.target.value);
  },

  render: function () {
    return (
      <input type='text' value={this.props.title} onChange={this.noteEdited} />
    ); 
  }
});

module.exports = _Note;
