var React = require('react/addons');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
require("./note.css");

var _Note = React.createClass({
  mixins: [branch],

  cursors: function () {
    return {
      notes: ['models', 'notes'],
      self: ['models', 'notes', this.props.id],
    };
  },

  textboxChanged: function(evt) {
    this.cursors.self.set('text', evt.target.value),
    this.context.tree.commit();
  },

  deleteButtonClick: function(evt) {
    this.state.self.delete
  },

  render: function () {
    return (
      <div className="note"> 
        <input type="text" value={this.state.self.text} onChange={this.textboxChanged}/>
        <button type="button" className="remove-note-button" onClick={this.deleteButtonClick}>
          Remove
        </button>
      </div>
    ); 
  }
});
module.exports = _Note;
