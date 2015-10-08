var React = require('react/addons');
require('./search-bar.css');

var _SearchBar = React.createClass({
  render: function() {
    return(
      <div id="search-bar">
        <input type="text" /> 
        <img src="./src/SearchBar/mag.svg" id="icon" />
      </div>
    );  
  },
});
module.exports = _SearchBar;
