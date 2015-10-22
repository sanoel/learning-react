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
    //  completions: ['view', 'tags_modal_completions'],
    };
  },

  doneButtonClick: function(tags) {
    var tagListCursor = this.context.tree.select('model', 'notes', this.state.tagsModalNoteId, 'tags');
    tagListCursor.set(this.state.tags);
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

  getInitialState: function () {
    return {
      tags: []
      , completions: []
    };
  },

  complete: function (value) {
    if (!value || value === "") {
      return this.setState({
        completions: []
      });
    }

    value = value.toLowerCase();

    var completions = this.state.tags.filter(function (comp) {
      var norm = comp.toLowerCase();
      return norm.substr(0, value.length) == value;
    }.bind(this));

    this.setState({
      completions: completions.reduce(function (r, s) {
        return r.indexOf(s) === -1 ? r.concat([s]) : r;
      }, [])
    });
  },

  changeWithComplete: function (tags) {
    var comps = this.state.completions;
    var newTag = tags.pop();

    // if there is one unambigous completion add that;
    if (comps.length === 1) {
      this.setState({
        tags: tags.concat(comps)
        , completions: []
      });
    } else {
      this.setState({
        tags: tags.concat([newTag])
        , completions: []
      });
    }
  },

  change: function (tags) {
    this.setState({
      tags: tags
      , completions: []
    });
  },

  render: function () { 
    var tagsCursor = this.context.tree.select('model', 'notes', this.state.tagsModalNoteId, 'tags');
    
    var initialTags = {};
    if (_.isEmpty(this.state.tagsModalNoteId)){
    } else {
      var initialTagsCursor = this.context.tree.select('model', 'notes', this.state.tagsModalNoteId, 'tags');
      initialTags = initialTagsCursor.get();
    }

    var completionNodes = this.state.completions.map(function (comp) {
      var add = function (e) {
        this.refs.tags.addTag(comp);
      }.bind(this);
      return React.createElement("span", {},React.createElement("a", { className: "suggestions", onClick: add }, comp)," ");
    }.bind(this));

   return (
      <Modal
        isOpen={this.state.tagsModalBool}
        onRequestClose={this.closeTagsModal}
        closeTimeoutMS={10000}>
        <h1>Edit Tags</h1>
        <TagsInput 
          ref={'tags'}
          value={tagsCursor.get()} 
          onChange={this.change}
          onChangeInput={this.complete}
          validate={this.validate}
          addOnBlur={false}
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
