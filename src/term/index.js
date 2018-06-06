const normalize = require('./normalize');
const buildWhitespace = require('./whitespace');
const uuid = require('./uuid');
const match = require('./match');

class Term {
  constructor(str) {
    let parts = buildWhitespace(str);
    this.text = parts.text;
    this.preText = parts.before;
    this.postText = parts.after;
    this.tags = {};
    this.lastID = null;
    this.nextID = null;
    this.normal = normalize(this.text);
    this.id = uuid(this.normal);
  }
  tag(tag) {
    this.tags[tag] = true;
  }
  match(token) {
    return match(this, token);
  }
  json(obj) {
    //set defaults
    obj = obj || {};
    let keys = Object.keys(obj);
    if (keys.length === 0) {
      keys = ['text', 'normal'];
    }
    return keys.reduce((h, k) => {
      h[k] = this[k];
      return h;
    }, {});
  }
}

//https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
Term.prototype.clone = function() {
  let clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  return clone;
};
module.exports = Term;
