var React = require('react/addons');
var NoteList = require('./NoteList/note-list.js');
var uuid = require('uuid');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
require('./App.css');

var _App = React.createClass({
  mixins: [branch],
  
  cursors: {
    notes: ['models', 'notes'],
    display_note: ['models', 'notes', 'abc'],
  },

  getInitialState: function() {
    return {
    };
  },

  render: function() {
    return ( 
      <div className="app">
        <NoteList valueLink={this.state.notes} />
        {this.state.display_note.text}
      </div>
    );
  }
});
module.exports = _App;
