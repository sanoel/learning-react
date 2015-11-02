var React = require('react');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var TagsInput = require('react-tagsinput');
var Modal = require('react-modal');
require('./tags-modal.css');

var _TagsModal = React.createClass({
  mixins: [branch],
  
  cursors: function() {
    return {
      note: ['model', 'tags_modal', 'note_id'],
      allTags: ['model', 'all_tags'],
      visible: ['model', 'tags_modal', 'visible'],
      completions: ['model', 'tags_modal', 'completions'],
    };
  },

  doneButtonClick: function(tags) {
    var tagListCursor = this.context.tree.select('model', 'notes', this.state.note, 'tags');
    tags = _.each(tagListCursor.get(), function(tag) {
      if (tag.action_if_done === 'remove') {
        tagListCursor.unset(tag);
      } else if (tag.action_if_done === 'add') {
        tagListCursor.unset(tag, 'action_if_done')      
      }
    return {text: tag.text, cancellable:false};
    });
    tagListCursor.set(tags);
    this.cursors.visible.set(false);
    this.cursors.note.set({});
    this.context.tree.commit();
  },

  cancelButtonClick: function() {
    var tagListCursor = this.context.tree.select('model', 'notes', this.state.note, 'tags');
    var tags = tagListCursor.get();
    tags = _.each(tags, function(tag) {
      if (tag.action_if_done === 'remove') {
        tagListCursor.unset('action_if_done');
      } else if (tag.action_if_done === 'add') {
        tagListCursor.set(); 
      }
    });
    this.cursors.visible.set(false);
    this.cursors.note.set({});
    this.cursors.completions.set([]);
    this.context.tree.commit();
  },

  complete: function (value) {
    if (!value || value === "") {
      return this.setState({
        completions: []
      });
    }

    value = value.toLowerCase();

    var completions = this.state.allTags.filter(function (comp) {
      var norm = comp.toLowerCase();
      return norm.substr(0, value.length) == value;
    }.bind(this));

    this.setState({
      completions: completions.reduce(function (r, s) {
        return r.indexOf(s) === -1 ? r.concat([s]) : r;
      }, [])
    });
  },

  change: function (tags) {
    this.setState({
      tags: tags
      , completions: []
    });
  },
   
  onAddTag: function(tagText) {
    var tagsCursor = this.context.tree.select('model', 'notes', this.state.note, 'tags');
    tagsCursor.push({text:{tagText}, action_if_done:'add'});
    this.context.tree.commit();
  },

  onRemoveTag: function(tagText) {
    var tagsCursor = this.context.tree.select('model', 'notes', this.state.note, 'tags');
    var tags = tagsCursor.get(); 
    tagsCursor.set('action_if_done', 'remove');
    this.context.tree.commit();
  },

  render: function () { 
    var tags = {};
    var values = [];
    if (this.state.note){
      var tagsCursor = this.context.tree.select('model', 'notes', this.state.note, 'tags');
      tags = tagsCursor.get();
      _.each(tags, function(tag) {
        if (tag.action_if_done) {
          // if you clicked the remove button but haven't saved it, don't display that tag
          if (tag.action_if_done === 'add') {
            values.push(tag.text);
          }
        } else {
          values.push(tag.text);
        }
      });
    }

    var completionNodes = this.state.completions.map(function (comp) {
      var add = function (e) {
        this.refs.tags.addTag(comp);
      }.bind(this);
      return React.createElement("span", {},React.createElement("a", { className: "suggestions", onClick: add }, comp)," ");
    }.bind(this));
   return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.closeTagsModal}
        closeTimeoutMS={10000}>
        <h1>Edit Tags</h1>
        <TagsInput 
          ref={'tags'}
          value={values} 
          onChange={this.change}
          onChangeInput={this.complete}
          validate={this.validate}
          addOnBlur={false}
          onTagAdd={this.onAddTag}
          onTagRemove={this.onRemoveTag}
        />
        {completionNodes}
        <input type="image" src="./src/TagsModal/checked-checkbox-48.ico" onClick={this.doneButtonClick} width="48px" height="48px" />
        Done
        <input type="image" src="./src/TagsModal/checked-checkbox-48.ico" onClick={this.cancelButtonClick} width="48px" height="48px" />
        Cancel 
      </Modal>
    );
  },
});
module.exports = _TagsModal;
