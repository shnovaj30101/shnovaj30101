console.log('Hello JavaScript!');

var http_post = function (where, text_to_send, callback) {
  if (typeof where !== 'string') throw TypeError();
  if (typeof text_to_send !== 'string') throw TypeError();
  if (typeof callback !== 'function') throw TypeError();

  fetch(where, {method: 'POST', body: text_to_send})
    .then(function (response) {
      return response.text();
    })
    .then(function (server_response_text) {
      callback(server_response_text);
    })
    .catch(function (err) {
      callback(null, err);
    });
};



var input_textarea_elm = document.getElementById('user-input-area');
var log_textarea_elm = document.getElementById('log-area');
var send_button_elm = document.getElementById('user-input-send-btn');

send_button_elm.addEventListener('click', function () {
  var user_input = input_textarea_elm.value;
  input_textarea_elm.value = '';
  input_textarea_elm.focus();
  send_to_server(user_input);
});

var send_to_server = function (text_to_send) {
  if (typeof text_to_send !== 'string') throw TypeError();
  http_post('/echo', text_to_send, data_from_server_callback);
};

var data_from_server_callback = function (result) {
  log_textarea_elm.value += '>>> [' + result + ']\n';
};
