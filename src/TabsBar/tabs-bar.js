var React = require('react/addons');
require('./tabs-bar.css');

var _TabsBar = React.createClass({
  onClick: function() {

  },

  render: function() {
    return (
      <div id="tabs-bar">
      <button type="button" className="button" onClick={this.onClick()}>
        All
      </button>
      <button type="button" className="button" onClick={this.onClick()}>
        Fields
      </button>
      <button type="button" className="button" onClick={this.onClick()}>
        Tags
      </button> 
      </div>
    );
  },
});
module.exports = _TabsBar;
