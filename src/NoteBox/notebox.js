var React = require('react');
var NoteList = require('../NoteList/note-list.js');

var NoteBox = React.createClass({
  loadNotesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleNewNoteButtonClick: function(note) {
    var notes = this.state.data;
    var newNotes = notes.concat([note]);
    this.setState({data: newNotes});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: note,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadNotesFromServer();
    setInterval(this.loadNotesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="noteBox">
        <h1>Notes</h1>
        <NoteList data={this.state.data} />
        <NoteForm onNoteSubmit={this.handleNoteSubmit} />
      </div>
    );
  }
});
