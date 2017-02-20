const authentication = require('../library/authentication');
const express = require('express');
const smartTV = require('../library/smart-tv');
const template = require('../library/template');

module.exports = new express.Router({mergeParams: true})
  .use(authentication)
  .post('/', function(request, response) {
    smartTV(
      request.params.target,
      '/roap/api/command',
      template('command.pug', {key: request.body.key})
    )
      .catch(response => response.code)
      .then(response => response.code)
      .then(function(code) { response.sendStatus(code); });
  });
