const express = require('express');
const SmartTV = require('../library/smart-tv');
const template = require('../library/template');

module.exports = new express.Router({mergeParams: true})
  .post('/', function(request, response) {
    SmartTV(
      request.params.target,
      '/roap/api/command',
      template('command.pug', {key: request.body.key})
    )
      .then(response => response.code)
      .then(response.sendStatus.bind(response))
      .catch(response.sendStatus.bind(response, 500));
  });
