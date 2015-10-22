var React = require('react/addons');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var TagsInput = require('react-tagsinput');
var Modal = require('react-modal');
var ReactDOM = require('react-dom');
require('./tags-modal.css');

var _TagsModal = React.createClass({
  mixins: [branch],
  
  cursors: function() {
    return {
 //     notes: ['model','notes'],
      tagsModalNoteId: ['view', 'tags_modal_note_id'],
      allTags: ['model', 'all_tags'],
      tagsModalBool: ['view', 'tags_modal'],
      completions: ['view', 'tags_modal_completions'],
    };
  },

  doneButtonClick: function(tags) {
    var tagListCursor = this.context.tree.select('model', 'notes', this.state.tagsModalNoteId, 'tags');
    tagListCursor.set(this.refs.tags);
    this.cursors.tagsModalBool.set(false);
    this.cursors.tagsModalNoteId.set({});
    this.context.tree.commit();
  },

  cancelButtonClick: function() {
    this.cursors.tagsModalBool.set(false);
    this.cursors.tagsModalNoteId.set({});
    this.cursors.completions.set([]);
    this.context.tree.commit();
  },

  complete: function (value) {
    value = value.toLowerCase();
      if (!value || value === "") {
      this.cursors.completions.set([]);
      this.context.tree.commit();
      return;  
    }
    var compls = [];
    compls = this.state.allTags.filter(function (comp) {
      var norm = comp.toLowerCase();
      return norm.substr(0, value.length) == value;
    }.bind(this));
    compls.reduce(function (r, s) {
      return r.indexOf(s) === -1 ? r.concat([s]) : r;
    }, []);

    this.cursors.completions.set(compls);
    this.context.tree.commit();


  },
 
  onKeyDown: function() {
    console.log("called???");
    return;
  },

  transform: function (tag) {
    if (this.state.completions.indexOf(tag) > -1) {
      return tag;
    }
    if (this.state.allTags.length === 1) {
      return this.state.completions[0];
    }
  },

  validate: function (tag) {
    console.log(tag);
    console.log(this.state.completions.indexOf(tag) > -1);
    return true;
   // return this.state.completions.indexOf(tag) > -1;
  },

  onAddTag: function(tag) {
    console.log('add');
    console.log(tag);
    var tagListCursor = this.context.tree.select('model', 'notes', this.state.tagsModalNoteId, 'tags');
    if (_.includes(this.state.allTags, tag)) {
    //TODO: throw error message thingy
    } else {
      this.cursors.allTags.push(tag);
    }
      tagListCursor.push(tag);
 //     this.cursors.completions.set([]);
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
      var initialTagsCursor = this.context.tree.select('model', 'notes', this.state.tagsModalNoteId, 'tags');
      initialTags = initialTagsCursor.get();
    }

    var all_tags = this.state.allTags;
    var completionNodes = this.state.completions.map(function (comp) {
      var add = function (e) {
        console.log('onclick');
        console.log(comp);
        this.refs.tags.addTag(comp);
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
          addOnBlur={false}
     //     onTagAdd={this.onAddTag} 
          onTagRemove={this.removeTag}
          onChange={this.change}
          onChangeInput={this.complete}
          placeholder={"Add tags"}
   //       onKeyDown={this.onKeyDown}
//          onClick={this.addTag}
   //       transform={this.transform}
          validate={this.validate}
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
