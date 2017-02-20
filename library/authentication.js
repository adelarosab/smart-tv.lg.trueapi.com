const smartTV = require('../library/smart-tv');
const template = require('../library/template');

module.exports = function(request, response, next) {
  const session = request.session;
  const target = request.params.target;

  session.devices = session.devices || {};

  if (session.devices[target]) {
    smartTV(
      target,
      '/roap/api/auth',
      template('pair.pug', {key: session.devices[target]})
    )
      .then(function() { next(); })
      .catch(function(reply) {
        console.error(reply);
      });
  } else {
    response.sendStatus(401);
  }
};
