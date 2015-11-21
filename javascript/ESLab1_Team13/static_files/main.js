console.log('Hello JavaScript!');

var http_post = function (where, req_text, callback) {
  if (typeof where !== 'string') throw TypeError();
  if (typeof req_text !== 'string') throw TypeError();
  if (typeof callback !== 'function') throw TypeError();

  fetch(where, {method: 'POST', body: req_text})
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


var nickname_textarea_elm = document.getElementById('user-nickname-area');
var password_textarea_elm = document.getElementById('user-password-area');
var user_button_elm = document.getElementById('user-btn');
var logout_button_elm = document.getElementById('logout-btn');
var new_button_elm = document.getElementById('new-btn');  
var other_textarea_elm = document.getElementById('other-nickname-area');
var othername_button_elm = document.getElementById('other-nickname-btn');
var input_textarea_elm = document.getElementById('user-input-area');
var log_textarea_elm = document.getElementById('log-area');
var send_button_elm = document.getElementById('user-input-send-btn');
var refresh_elm = document.getElementById('refresh-btn');
var id_display_elm = document.getElementById('your_id');

var user_nickname = "";
var othername="";
var read=0;


send_button_elm.addEventListener('click', function () {
  req_json={"nickname":user_nickname,"emoji":emoji,"message":input_textarea_elm.value};
  input_textarea_elm.value = '';
  input_textarea_elm.focus();
  send_to_server(req_json);
});

user_button_elm.addEventListener('click', function () {
  if (user_nickname!=="") {
    //id_display_elm.innerHTML="you should logout first!";
  }
  else {
    user_nickname=nickname_textarea_elm.value;
    var login_req = {nickname:user_nickname,
                     password:password_textarea_elm.value};
    http_post('/login', JSON.stringify(login_req) , id_display);
    nickname_textarea_elm.value="";
    password_textarea_elm.value="";
  }
});

logout_button_elm.addEventListener('click', function () {
  user_nickname = "";
  id_display_elm.innerHTML="you have to login!";
});

new_button_elm.addEventListener('click', function () {
  var register_req = {nickname:nickname_textarea_elm.value,
                      password:password_textarea_elm.value};
  http_post('/register', JSON.stringify(register_req) , register_msg);
  nickname_textarea_elm.value="";
  password_textarea_elm.value="";
});

othername_button_elm.addEventListener('click', function () {
  othername = other_textarea_elm.value;
  if(othername !== "")
  read=1;
  else
  read=0;
  other_textarea_elm.value='';
  refresh();
});

refresh_elm.addEventListener('click', function () {
    refresh();
});

var send_to_server = function (req_json) {
  if (typeof req_json !== 'object') throw TypeError();
  http_post('/echo', JSON.stringify(req_json) , data_from_server_callback); 
};

var data_from_server_callback = function (result) {

  othername="";
  read=0;
  var result_json=JSON.parse(result.toString());
  if (result_json["ok"]=="true") {
     refresh();
  }
  else {
    log_textarea_elm.value += 'ERROR: ' + result_json.reason + '\n';
  }
}; 

//load and output data in data.db

var load_log_textarea = function(data) {
  var dataLines=data.split('\n');
  for (i=0; i<dataLines.length-1; i++) {
    var data_json=JSON.parse(dataLines[i]);
    if(data_json.nickname !== othername && read==1)  continue;

    log_textarea_elm.value += '>>> [' + data_json.nickname + ' says:'+ data_json.message + '\ ';
    if (data_json.emoji=='0') 
       log_textarea_elm.value += '\u{1F600}';
    else if (data_json.emoji=='1') 
       log_textarea_elm.value += '\u{1F620}';
    else if (data_json.emoji=='2') 
       log_textarea_elm.value += '\u{1F625}';
    else if (data_json.emoji=='3')
       log_textarea_elm.value += '\u{1F61A}';
    else if (data_json.emoji=='4')
       log_textarea_elm.value += '\u{1F634}';

    log_textarea_elm.value +='\  ' +  data_json.time;
    log_textarea_elm.value += ']\n';
  }
};

var id_display = function(result) {
  var result_json=JSON.parse(result.toString());
  if (result_json["ok"]=="false") {
     user_nickname="";
  }
  else {
    id_display_elm.innerHTML="your id is "+user_nickname;
  }
}


var register_msg = function(result) {
  var result_json=JSON.parse(result.toString());
  if (result_json["ok"]=="false") {     
    //id_display_elm.innerHTML=result_json.reason;
  }
}

//refreshes every half minute
setInterval( refresh() , 30000);


function refresh() {
    log_textarea_elm.value='';
    http_post('/read_all',"",load_log_textarea);
};

