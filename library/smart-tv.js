const request = require('./request');
const URL = require('url');
const XML = require('./xml');

module.exports = function SmartTV(host, path, body) {
  const url = URL.format({
    hostname: host,
    pathname: path,
    port: '8080',
    protocol: 'http:'
  });

  const options = {
    body,
    headers: {'Content-Type': 'text/xml'},
    method: 'POST',
    url
  };

  return request(options)
    .then(XML.toObject)
    .then(response => response.envelope)
    .then(function(response) {
      console.log(response);

      const reply = {
        code: Number(response.ROAPError[0]),
        message: response.ROAPErrorDetail[0]
      };

      if (reply.code !== 200) { return Promise.reject(reply); }

      return reply;
    })
    .catch(console.error.bind(console));
};
