var React = require('react/addons');
var Note = require('../Note/note.js');
var FirstNoteButton = require('../FirstNoteButton/first-note-button.js');
var TabsBar = require('../TabsBar/tabs-bar.js');
var SearchBar = require('react-search-bar');
var _ = require('lodash');
var uuid = require('uuid');
var branch = require('baobab-react/mixins').branch;
require("./note-list.css");


var _NoteList = React.createClass({
  mixins: [branch],

  cursors: function() {
    return {
      notes: ['model', 'notes'],
      sortMode: ['view', 'sort_mode'],
      allTags: ['model', 'all_tags'],
    };
  },
  
  deleteNote: function(id) {
    var delete_note_order = this.state.notes[id].order;
    this.context.tree.unset(['models', 'notes', id]);
    this.context.tree.commit();
    var self = this;
    _.each(this.state.notes, function(note) {
      if (note.order > delete_note_order) {
        self.context.tree.set(['models', 'notes', note.id, 'order'], self.state.notes[note.id].order--);
      }
    });
    this.context.tree.commit();
  },

  addNote: function() {
    var obj_id = uuid.v4().replace('-','');
    this.cursors.notes.set(obj_id);
    var obj = {   
      id: obj_id,
      text: ' ',
      order: Object.keys(this.state.notes).length,
      tags: [],
      fields:[],
    };
    this.cursors.notes.set(obj_id, obj);
    this.context.tree.commit();
  },
  
  render: function () {
    var notes_array  = [];
    if (this.state.sortMode === 'all') {
      for (var i in this.state.notes) {
        notes_array.push(<Note id={this.state.notes[i].id} key={this.state.notes[i].id} deleteNote={this.deleteNote} />);
        }
    } else if(this.state.sortMode === 'fields') {
      var note_groups = _.groupBy(this.state.notes, this.state.sortMode);
      var self = this;
      _.each(note_groups, function(group, key) {
        notes_array.push(<h1>{key}</h1>);
        notes_array.push(<hr/>);
        for (var i in group) {
          notes_array.push(<Note id={group[i].id} key={group[i].id} deleteNote={self.deleteNote} />);
        }
      });
    } else if (this.state.sortMode === 'tags') {
      var self = this;
      _.each(self.state.notes, function(note) {
        if (_.isEmpty(note.tags)) {
          var obj_id = uuid.v4().replace('-','');
          notes_array.push(<Note id={note.id} key={obj_id} deleteNote={self.deleteNote} />);
        }
      });
      _.each(this.state.allTags, function(tag) {
        notes_array.push(<h1>{tag}</h1>);
        notes_array.push(<hr/>);
        _.each(self.state.notes, function(note) {
          if (_.contains(note.tags, tag)) {
            var obj_id = uuid.v4().replace('-','');
            notes_array.push(<Note id={note.id} key={obj_id} deleteNote={self.deleteNote} />);
          }
        });
      });
    }
    return (
      <div className="notelist">
        <TabsBar className="tabs-bar"/>
        <SearchBar />
        {notes_array}
        <button type= "button" onClick={this.addNote} className="new-note-button">
        Add Note
        </button>
      </div>
    );
  }
});
module.exports = _NoteList;
