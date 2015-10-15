var React = require('react/addons');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var TagsInput = require('react-tagsinput');
var Modal = require('react-modal');
require('./tags-modal.css');

var _TagsModal = React.createClass({
  mixins: [branch],
  
  cursors: function() {
    return {
      notes: ['model','notes'],
      tagsModalNoteId: ['view', 'tags_modal_note_id'],
      allTags: ['model', 'allTags'],
      tagsModalBool: ['view', 'tags_modal'],
      completions: ['view', 'tags_modal_completions'],
    };
  },

  doneButtonClick: function(tags) {
    this.cursors.tagsModalBool.set(false);
    this.cursors.tagsModalNoteId.set({});
    this.context.tree.commit();
  },

  cancelButtonClick: function() {
    this.cursors.tagsModalBool.set(false);
    this.cursors.tagsModalNoteId.set({});
    this.context.tree.commit();
  },

  complete: function (value) {
    value = value.toLowerCase();
    if (value === "") {
      this.cursors.completions.set([]);
      this.context.tree.commit();
      return;  
    }
    var compls = [];
    compls = this.state.allTags.filter(function (comp) {
      var norm = comp.toLowerCase();
      return norm.substr(0, value.length) == value && this.state.notes[this.state.tagsModalNoteId].tags.indexOf(comp) == -1;
    }.bind(this));
    this.cursors.completions.set(compls);
    this.context.tree.commit();
  },

  transform: function (tag) {
    if (this.state.allTags.indexOf(tag) > -1) {
      return tag;
    }
    if (this.state.allTags.length === 1) {
      return this.state.allTags[0];
    }
  },

  validate: function (tag) {
    return this.state.allTags.indexOf(tag) > -1;
  },

  addTag: function(tag) {
    var tagListCursor = this.context.tree.select('model', 'notes', this.state.tagsModalNoteId, 'tags');
    if (_.includes(this.state.allTags, tag)) {
    } else {
      this.cursors.allTags.push(tag);
    };
    tagListCursor.push(tag);
    this.context.tree.commit(); 
  },

  removeTag: function(tag) {
    var tagListCursor = this.context.tree.select('model', 'notes', this.state.tagsModalNoteId, 'tags');
    var allTagsCursor = this.context.tree.select('model', 'allTags');
    
    tagListCursor.splice(tag);
    allTagsCursor.splice(tag);
    this.context.tree.commit(); 
  },

  render: function(){
    var initialTags = {};
    if (_.isEmpty(this.state.tagsModalNoteId)){
    } else {
      initialTags = this.state.notes[this.state.tagsModalNoteId].tags;
    }

    var all_tags = this.state.allTags;
    var completionNodes = this.state.completions.map(function (comp) {
      var add = function (e) {
        if (_.includes(this.refs.tags.getTags(), comp)) {
        } else {
          this.addTag(comp);
        }
      }.bind(this);
      return React.createElement("span", {},React.createElement("a", { className: "suggestions", onClick: add}, comp)," ");
    }.bind(this)); 

    return (
      <Modal
        isOpen={this.state.tagsModalBool}
        onRequestClose={this.closeTagsModal}
        closeTimeoutMS={10000}>
        <h1>Edit Tags</h1>
        <TagsInput 
          ref={'tags'}
          value={initialTags} 
    //      onChange={this.change} 
          onTagAdd={this.addTag} 
          onTagRemove={this.removeTag}
          onChangeInput={this.complete}
  //        addOnBlur={false}
          placeholder={"Add tags"}
   //       transform={this.transform}
  //        validate={this.validate}
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
