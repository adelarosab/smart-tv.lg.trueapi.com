const request = require('./request');
const URL = require('url');
const XML = require('./xml');

module.exports = function SmartTV(hostname, pathname, body) {
  const url = URL.format({
    [hostname.includes(':') ? 'host' : 'hostname']: hostname,
    pathname,
    port: '8080',
    protocol: 'http'
  });

  const options = {
    body,
    headers: {'Content-Type': 'text/xml'},
    method: 'POST',
    timeout: 30000,
    url
  };

  console.log(url, body);
  return request(options)
    .then(function(body) {
      console.log(body);

      return body;
    })
    .then(XML.toObject)
    .then(response => response.envelope)
    .then(function(response) {
      const reply = {
        code: Number(response.ROAPError[0]),
        message: response.ROAPErrorDetail[0]
      };

      if (reply.code !== 200) { return Promise.reject(reply); }

      return reply;
    })
    .catch(function() {
      console.log('TIMEOUT');
      return Promise.reject({code: 403, message: 'TIMEOUT'});
    });
};
