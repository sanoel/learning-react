var React = require('react');
var NotesContainer = require('./NotesContainer/notes-container.js');
var style = require('./App.css');

var App = React.createClass({

    getInitialState: function() {
      return {
        thenote: "This is the value of thenote",
      };
    },

    aNoteWasEdited: function(new_note_text) {
      this.setState({
        thenote: new_note_text,
      });
    },

    render: function() {
        return (
          <NotesContainer sam={this.state.thenote} onNoteEdit={this.aNoteWasEdited} />
        );
    }
});

module.exports = App;
