var React = require('react');
require("./note.css");

var _Note = React.createClass({
  textboxChanged: function(evt) {
    this.props.noteUpdated.noteUpdated({title: evt.target.value});
  },

  render: function () {
    console.log(this.props);
    return (
      <div id="Note"> 
     <input type="text" value={this.props.title} onChange={this.textboxChanged}/>
      </div>
     
    ); 
  }
});
module.exports = _Note;
