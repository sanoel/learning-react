var React = require('react/addons');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var _ = require('lodash');
require('./tabs-bar.css');

var _TabsBar = React.createClass({
  mixins: [branch],
  
  cursors: {
    sortMode: ['view', 'sort_mode'],
  },

  onClick: function(mode) {
    this.cursors.sortMode.set(mode);
    this.context.tree.commit(); 
  },

  render: function() {
    return (
      <div id="tabs-bar">
      <button type="button" className="button" onClick={this.onClick.bind(null, 'all')}>
        All
      </button>
      <button type="button" className="button" onClick={this.onClick.bind(null, 'fields')}>
        Fields
      </button>
      <button type="button" className="button" onClick={this.onClick.bind(null, 'tags')}>
        Tags
      </button> 
      </div>
    );
  },
});
module.exports = _TabsBar;
