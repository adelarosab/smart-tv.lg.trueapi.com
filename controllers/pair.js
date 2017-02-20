const express = require('express');
const SmartTV = require('../library/smart-tv');
const template = require('../library/template');

function pair(request, response) {
  const key = request.body.key;
  const target = request.params.target;

  SmartTV(target, '/roap/api/auth', template('pair.pug', {key}))
    .then(response => response.code, response => response.code)
    .then(function(code) {
      const session = request.session;

      if (key && code === 200) {
        session.devices = session.devices || {};
        session.devices[target] = key;

        session.sessions = session.sessions || {};
        session.sessions[target] = true;
      }

      return code;
    })
    .then(function(code) { response.sendStatus(code); });
}

module.exports = new express.Router({mergeParams: true})
  .get('/', pair)
  .post('/', pair);
