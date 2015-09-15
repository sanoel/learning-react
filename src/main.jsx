var React = require('react/addons');
var root = require('baobab-react/mixins').root;
//var RouteHandler = require('react-router').RouteHandler;
var App = require('./App.jsx');
var Baobab = require('baobab');
var uuid = require('uuid');

var key1 = uuid.v4().replace('-','');
var key2 = uuid.v4().replace('-','');

var stateTree = new Baobab({
  models: {
    notes: {
      'abc': {
        key: 'abc',
        text: 'hey',
        order: 1,
        tags: ['low areas'],
        fields: ['Smith40'],
      },
      'def': {
        key: 'def',
        text: 'hello',
        order: 2,
        tags: ['johnson grass!'],
        fields: ['Smith40'],
      },
    }
  }
});

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
//module.exports = Main;
//console.log(this.tree);
React.render(<Main tree={stateTree}/>,document.getElementById('app-container'));
