var React = require('react/addons');
var root = require('baobab-react/mixins').root;
var App = require('./App.jsx');
var Baobab = require('baobab');
var uuid = require('uuid');
var style = require('./reset.css'); 
var stateTree = require('./stateTree.js');

var Main = React.createClass({

  mixins: [root],
  
  render: function() {
    return (
      <div>
        <App />
      </div>
    );
  }
});
React.render(<Main tree={stateTree}/>,document.getElementById('app-container'));
