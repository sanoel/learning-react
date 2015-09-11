var React = require('react');
require("./note.css");

var _Note = React.createClass({
  textboxChanged: function(evt) {
    this.props.noteUpdated(this.props.id, {title: evt.target.value});
  },

  onButtonClick: function(evt) {
    this.props.removeNote(this.props.id);
  },

  render: function () {
    return (
      <div className="note"> 
        <input type="text" value={this.props.title} onChange={this.textboxChanged}/>
        <button type="button" className="remove-note-button" onClick={this.onButtonClick}>
          Remove
        </button>
      </div>
    ); 
  }
});
module.exports = _Note;
