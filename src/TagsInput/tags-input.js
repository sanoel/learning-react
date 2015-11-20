var React = require('react');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var uuid = require('uuid');
var _ = require('lodash');
require('./tags-input.css');

var _TagsInput = React.createClass({

  mixins: [branch],

  cursors: function () {
    return {
      noteId: ['model', 'tags_modal', 'note_id'],
      completions: ['model', 'tags_modal', 'completions'],
      allTags: ['model', 'all_tags'],
      visible: ['model', 'tags_modal', 'visible'],
      inputText: ['model', 'tags_modal', 'input_text'],
    };
  },

  addTag: function(tagText) {
    if (tagText === "") {
        return;
    }
    var tagsCursor = this.context.tree.select('model', 'notes', this.state.noteId, 'tags');
    tagsCursor.set(tagText, {text:tagText, action_if_done:'add'});
    if (!_.includes(this.state.allTags, tagText)) {
      this.cursors.allTags.push(tagText);
    }
    this.cursors.inputText.set('');
    this.cursors.completions.set([]);
    this.context.tree.commit();
  },

  removeTag: function(tagText) {
    var tagCursor = this.context.tree.select('model', 'notes', this.state.noteId, 'tags');
    var tags = tagCursor.get();
    var self = this;
    _.each(tags, function(tag) {
      if (tag.text === tagText) {
        var cursor = self.context.tree.select('model', 'notes', self.state.noteId, 'tags', tag.text);
        cursor.set('action_if_done', 'remove');
      }
    });
    self.context.tree.commit();
  },

  onChange: function(evt) {
    this.complete(evt.target.value);
    this.cursors.inputText.set(evt.target.value);
    this.context.tree.commit();
  },

  handleKeyDown: function(evt) {
    if (evt.keyCode == 13 || evt.keyCode == 9) {
      this.addTag(evt.target.value);
    }
  },

  complete: function (value) {
    if (!value || value === "") {
      this.cursors.completions.set([]);
      this.context.tree.commit();
      return;
    }
   
    value = value.toLowerCase();
    var completions = _.filter(this.state.allTags, function (comp) {
      var norm = comp.toLowerCase();
      return norm.substr(0, value.length) == value;
    }.bind(this));

    this.cursors.completions.set(completions.reduce(function (r, s) {
        return r.indexOf(s) === -1 ? r.concat([s]) : r;
    }, []));
    this.context.tree.commit();
  },

  render: function () {
    var tags = [];
    var self = this;
    if (!_.isEmpty(this.state.noteId)){
      var tagsCursor = this.context.tree.select('model', 'notes', this.state.noteId, 'tags');
      _.each(tagsCursor.get(), function(tag) {
        if (tag.action_if_done) {
          if (tag.action_if_done === 'add') {
            tags.push(React.createElement("div", {key:uuid.v4(), className: "tag"}, React.createElement("button", {key:uuid.v4(), onClick:self.removeTag.bind(null, tag.text)}, "X"), tag.text));
          }
        } else {
          tags.push(React.createElement("div", {key:uuid.v4(), className: "tag"}, React.createElement("button", {key:uuid.v4(), onClick:self.removeTag.bind(null, tag.text)}, "X"), tag.text));
        }
      });
    }

    var completions = [];
    _.each(this.state.completions, function(completion) {
      completions.push(React.createElement('option', {value:completion, key:uuid.v4()}));
    });
    var completion_list = React.createElement('datalist', {key:uuid.v4(), id:'completion_list'},completions);

    return (
      <div> 
        <div id='tags_container'>
          {tags}
        </div>
        {completion_list}
        <input type='text'
          list='completion_list'
          id='tags_input'
          value={this.state.inputText}
          onChange={this.onChange} 
          onKeyDown={this.handleKeyDown} />
        <button type='button' onClick={this.addTag.bind(null, this.state.inputText)}>Submit </button>
      </div>
    ); 
  }
});
module.exports = _TagsInput;
