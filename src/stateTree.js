var Baobab = require('baobab');
var stateTree = new Baobab({
  models: {
    notes: {
      'abc': {
        tags: ['low areas'],
        title: 'hey',
        fields: ['Smith40'],
        order: 1,
      },
      'def': {
        tags: ['johnson grass!'],
        title: 'hello',
        fields: ['Smith40'],
        order: 2,
      },
    }
  }
}); 

module.exports = stateTree; 
