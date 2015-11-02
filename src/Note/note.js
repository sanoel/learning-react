var React = require('react');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var TagsModal = require('../TagsModal/tags-modal.js');
var uuid = require('uuid');
var _ = require('lodash');
require('./note.css');

var _Note = React.createClass({
  mixins: [branch],

  cursors: function () {
    return {
      self: ['model', 'notes', this.props.id],
      modalVisible: ['model', 'tags_modal', 'visible'],
      tagsModalNoteId: ['model', 'tags_modal', 'note_id'],
      allTags: ['model', 'allTags'],
    };
  },

  textboxChanged: function(evt) {
    this.cursors.self.set('text', evt.target.value),
    this.context.tree.commit();
  },

  deleteButtonClick: function(evt) {
    this.props.deleteNote(this.props.id);
  },

  openTagsModal: function() {
    this.cursors.modalVisible.set(true);
    this.cursors.tagsModalNoteId.set(this.props.id);
    this.context.tree.commit();
  },

  render: function () {
    var tags = [];
    _.each(this.state.self.tags, function(tag) {
      tags.push(<a key={uuid.v4()}>{tag.text} </a>);
    });
    return (
      <div className="note"> 
        <textarea value={this.state.self.text} onChange={this.textboxChanged}></textarea>
        <button type="button" className="remove-note-button" onClick={this.deleteButtonClick}>
          Remove
        </button>
        <button type="button" className="tags" onClick={this.openTagsModal}>
          tags
        </button>
        {tags}
      </div>
    ); 
  }
});
module.exports = _Note;
