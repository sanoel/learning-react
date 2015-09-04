var React = require('react');
var style = require('./App.css');
var NoteList = require('./NoteList/note-list.js');

var App = React.createClass({
  getInitialState: function() {
    return {
      notes: [{title: "hello"},{title: "world"}]
    };
  },

  listUpdate: function(new_list) {
    this.setState({notes: new_list});
  },

    aNoteWasEdited: function(new_note_text) {
      this.setState({
        thenote: new_note_text,
      });
    },

  render: function() {
    return ( 
      <div className="app">
        <NoteList notes={this.state.notes} listUpdated={this.listUpdate} />
        {this.state.notes[0].title}
      </div>
    );
  }
});
module.exports = App;
