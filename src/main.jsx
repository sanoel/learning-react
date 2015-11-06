var React = require('react');
var ReactDOM = require('react-dom');
var Baobab = require('baobab');
var root = require('baobab-react/mixins').root;
var App = require('./App.jsx');
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
ReactDOM.render(<Main tree={stateTree}/>,document.getElementById('app-container'));
