var React = require('react');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var TagsModal = require('../TagsModal/tags-modal.js');
var uuid = require('uuid');
var _ = require('lodash');
var TextAreaAutoSize = require('react-textarea-autosize');
require('./note.css');

var _Note = React.createClass({
  mixins: [branch],

  cursors: function () {
    return {
      self: ['model', 'notes', this.props.id],
      modalVisible: ['model', 'tags_modal', 'visible'],
      tagsModalNoteId: ['model', 'tags_modal', 'note_id'],
      allTags: ['model', 'all_tags'],
    };
  },

  textAreaChanged: function(evt) {
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
      if (tag.action_if_done) {
        return;
      }
      tags.push(<span className='tag' key={uuid.v4()}>{tag.text}</span>);
    });
    return (
      <div className="note"> 
        <TextAreaAutoSize value={this.state.self.text} minRows={3} className='note-text-input' onChange={this.textAreaChanged}></TextAreaAutoSize>
        <button type="button" className="note-remove-button" onClick={this.deleteButtonClick}>
          Remove
        </button>
        <button type="button" className="note-tags-button" onClick={this.openTagsModal}>
          edit tags
        </button>
        {tags}
      </div>
    ); 
  }
});
module.exports = _Note;
