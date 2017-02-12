const xml2js = require('xml2js');

module.exports = {
  toObject(xml) {
    return new Promise(function(resolve, reject) {
      (new xml2js.Parser()).parseString(xml, function(error, result) {
        if (error) { reject(); }
        else { resolve(result); }
      });
    });
  },

  toXML(object) {
    return new Promise(function(resolve) {
      resolve(new xml2js.Builder().buildObject(object));
    });
  }
};
