var React = require('react/addons');
var style = require('./App.css');
var NoteList = require('./NoteList/note-list.js');

var App = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      notes: [
        {id:'asdfsafw', title:"hello"},
        {id:'sdfwoijd', title:"world"}
      ]
    };
  },

 // listUpdate: function(new_list) {
 //   this.setState({notes: new_list});
 // },

  render: function() {
  //  var valueLink = {
  //    value: this.state.notes,
  //    requestChange: this.listUpdate
  //  };

    return ( 
      <div className="app">
        <NoteList valueLink={this.linkState('notes')} />
        {this.state.notes[0].title}
      </div>
    );
  }
});
module.exports = App;
