var React = require('react');
var Note = require('../Note/note.js');
var NewNoteButton = require('../NewNoteButton/new-note-button.js');
var _ = require('lodash');
var uuid = require('uuid');
require("./note-list.css");

var _NoteList = React.createClass({
  addNote: function() {
    var list = _.cloneDeep(this.props.valueLink.value);
    list.push({id: uuid.v4().replace('-',''), title: ''});
    this.props.valueLink.requestChange(list);
  },
  
  deleteNote: function(id_to_delete) {
   var list = _.cloneDeep(this.props.valueLink.value); 
   var note_id_to_delete = _.findKey(list, function(l) {
      return l.id === id_to_delete
    });
      
    list.splice(note_id_to_delete, 1);
    this.props.valueLink.requestChange(list);
  },

  aNoteWasUpdated: function(id, new_note) {
    var list = _.cloneDeep(this.props.valueLink.value);
    var note_we_want = _.find(list, function(l) {
      return l.id == id;
    });
    _.each(new_note, function(val, key) {
      note_we_want[key] = val;
    });

    this.props.valueLink.requestChange(list);
  },

  render: function () {
    var notes_array  = [];
    for(var i in this.props.valueLink.value){
      var n = this.props.valueLink.value[i];
      notes_array.push(<Note title={n.title} key={('note-'+i)} id={n.id} removeNote={this.deleteNote} noteUpdated={this.aNoteWasUpdated}/>);
    }

    return (
      <div className="notelist">
        {notes_array}
        <NewNoteButton addNoteButtonClick={this.addNote} />
      </div>
    ); 
  }
});
module.exports = _NoteList;
