var React = require('react/addons');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
require("./note.css");

var _Note = React.createClass({
  mixins: [branch],
  
  cursors: { 
    notes: ['models', 'notes'],
  },

  textboxChanged: function(evt) {
    this.key = this.props.id
    this.cursors.key.text.set(evt.target.value),
    this.context.tree.commit();
  },

  onButtonClick: function(evt) {
    var key = this.props.id;
    var list = _.cloneDeep(this.state.notes); 
    delete list.key;
    this.cursors.notes.set(list);
    this.context.tree.commit();
  },

  render: function () {
    return (
      <div className="note"> 
        <input type="text" value={this.state.text} onChange={this.textboxChanged}/>
        <button type="button" className="remove-note-button" onClick={this.onButtonClick}>
          Remove
        </button>
      </div>
    ); 
  }
});
module.exports = _Note;
