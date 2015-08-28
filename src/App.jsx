var React = require('react');
var style = require('./App.css');
var NoteList = require('./NoteList/note-list.js');

var App = React.createClass({
    return {
      notes: [{title: "hello"},{title: "world"}]
    };
  },

  listUpdate: function(new_list) {
    this.setState({notes: new_list});
  },

  render: function() {
    return ( 
      <NoteList notes={this.state.notes} />
    );
  }
});
module.exports = App;
