var React = require('react/addons');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var TagsModal = require('../TagsModal/tags-modal.js');
require('./note.css');

var _Note = React.createClass({
  mixins: [branch],

  cursors: function () {
    return {
      notes: ['models', 'notes'],
      self: ['models', 'notes', this.props.id],
      tagsModalBool: ['view', 'tags_modal'],
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
    this.cursors.tagsModalBool.set(true);
    this.context.tree.commit();
  },

  render: function () {
    return (
      <div className="note"> 
        <textarea value={this.state.self.text} onChange={this.textboxChanged}></textarea>
        <button type="button" className="remove-note-button" onClick={this.deleteButtonClick}>
          Remove
        </button>
        <button type="button" className="tags" onClick={this.openTagsModal}>
          tags
        </button>
        <TagsModal /> 
      </div>
    ); 
  }
});
module.exports = _Note;
