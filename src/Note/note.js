var React = require('react');
require("./note.css");

var _Note = React.createClass({
  textboxChanged: function(evt) {
    this.props.valueLink.noteUpdated(this.props.valueLink.id, {title: evt.target.value});
  },

  onButtonClick: function(evt) {
    this.props.valueLink.removeNote(this.props.valueLink.id);
  },

  render: function () {
    return (
      <div className="note"> 
        <input type="text" value={this.props.valueLink.title} onChange={this.textboxChanged}/>
        <button type="button" className="remove-note-button" onClick={this.onButtonClick}>
          Remove
        </button>
      </div>
    ); 
  }
});
module.exports = _Note;
