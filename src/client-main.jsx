var React = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');
var stateTree = require('./stateTree.js');
console.log("client?");
Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  return React.render(<Handler tree={stateTree} />, document.app-container);
});
