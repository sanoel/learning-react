var React = require('react');
var NotesContainer = require('./NotesContainer/notes-container.js');
var style = require('./App.css');

var App = React.createClass({
    render: function() {
        return (
          <NotesContainer />
        );
    }
});

module.exports = App;
