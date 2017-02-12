const express = require('express');
const SmartTV = require('../library/smart-tv');
const template = require('../library/template');

function pair(request, response) {
  SmartTV(
    request.params.target,
    '/roap/api/auth',
    template('pair.pug', {key: request.body.key})
  )
    .then(response => response.code)
    .then(function(code) {
      if (request.params.key && code === 200) {
        request.session.devices = request.session.devices || {};
        request.session.devices[request.params.target] = request.body.key;
      }
    })
    .then(response.sendStatus.bind(response))
    .catch(response.sendStatus.bind(response, 500));
}

module.exports = new express.Router({mergeParams: true})
  .get('/', pair)
  .post('/', pair);
