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
      allTags: ['model', 'allTags'],
      tagsModalBool: ['view', 'tags_modal'],
    };
  },

  closeTagsModal: function() {
    this.cursors.tagsModalBool.set(false);
    this.context.tree.commit();
  },
  
  render: function(){
    return (
      <Modal
        isOpen={this.state.tagsModalBool}
        onRequestClose={this.closeTagsModal}
        closeTimeoutMS={10000}>
        <h1>Edit Tags</h1>
        <input type="image" src="./src/TagsModal/checked-checkbox-48.ico" onClick={this.closeTagsModal} width="48px" height="48px" />
        Done
        <TagsInput />
      </Modal>
    );
  },
});
module.exports = _TagsModal;
