var assert = require('assert');
var http = require('http');
var fs = require('fs');

var DEFAULT_PORT = 2015;
var DEFAULT_HOSTNAME = '127.0.0.1';

var srv = http.createServer();
var port = DEFAULT_PORT;
var hostname = DEFAULT_HOSTNAME;
var reqhandlers = {};

var timestamp_str = function () {
  var ensure_two_digits = function (num) {
    return (num < 10) ? '0' + num : '' + num; };
  var date   = new Date();
  var month  = ensure_two_digits(date.getMonth() + 1);
  var day    = ensure_two_digits(date.getDate());
  var hour   = ensure_two_digits(date.getHours());
  var minute = ensure_two_digits(date.getMinutes());
  var second = ensure_two_digits(date.getSeconds());
  return month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
};

var port_setter = function (iport) {
  assert(typeof iport === 'number');
  assert(1 <= iport && iport <= 65535);
  port = iport;
};

var hostname_setter = function (ihostname) {
  assert(typeof ihostname === 'string');
  hostname = ihostname;
};

var handler_setter = function (method_and_path, reqhandler) {
  assert(typeof method_and_path === 'string');
  assert(typeof reqhandler === 'function');
  reqhandlers[method_and_path] = reqhandler;
};

var do_respond_to_an_HTTP_request = function (req, res) {
  var reqmethod = req.method;
  var requrl = req.url;
  var reqheaders = req.headers;
  var reqbody = new Buffer(0);
  var time = new Buffer(14);
  time.write(timestamp_str(),0,'ascii');

  req.on('data', function (chunk) {
    assert(chunk instanceof Buffer);
    reqbody = Buffer.concat([reqbody, chunk]);
  });

  req.on('end', function () {
    var pattern = reqmethod + ' ' + requrl;
    var responder = function (respbody, respheaders) {
      assert(respbody instanceof Buffer);
      assert(!respheaders || typeof respheaders === 'object');
      if (respheaders)
        for (var header_name in Object.keys(respheaders))
          res.setHeader(header_name, respheaders[header_name]);

      res.write(respbody);
      res.end();
    };

    var submit={ok:"false", reason:"",time:timestamp_str() };

      if(reqmethod=='POST' && requrl!=='/read_all'){
        var reqstring=reqbody.toString();
        var reqok=JSON.parse(reqstring);
	    if (requrl=='/echo' || requrl=='/submit') {
		   var error="you must enter a valid: ";
           var name="nickname ";
           var emo="emoji ";
           var emp="message ";
           if (reqok.nickname.match(/^[a-z0-9]{3,10}$/)==null ){
              submit.ok="false";
              submit.reason=submit.reason.concat(error+name);
           }
           if (!(reqok.emoji>=0 && reqok.emoji<=4) ){
             submit.ok="false";
             submit.reason=submit.reason.concat(error+emo);
           }
           if (reqok.message=="" ){
             submit.ok="false";
             submit.reason=submit.reason.concat(error+emp);
           }
              
           if (submit.reason=="" ){
		     submit.ok="true";
             var data={"nickname":reqok.nickname, "emoji":reqok.emoji, 
			           "message":reqok.message, "time":timestamp_str()};
             fs.appendFile( 'data.db', JSON.stringify(data)+'\n', 
			                function (err) { if (err) throw err;});
           }
		}//end if (echo || submit)  

	    else if (requrl=='/register') {
		  submit.ok="true";
          var data=fs.readFileSync('member.db', 'utf8');
          var memline=data.split('\n');
          for (i=0; i<memline.length-1; i++){
              var member=JSON.parse(memline[i]);
              if(member.nickname == reqok.nickname){
			     //console.log(reqok.nickname);
			     submit.ok="false";
				 submit.reason="the id has been registered";
				 break;
			  }
		  }
		  if (submit.ok=="true") {
            fs.appendFile('member.db', JSON.stringify(reqok)+'\n',
			               function (err) { if (err) throw err;});
		  }
		}//end if (register)

	    else if (requrl=='/login') {
          var data=fs.readFileSync('member.db', 'utf8');
          var memline=data.split('\n');
          for (i=0; i<memline.length-1; i++){
              var member=JSON.parse(memline[i]);
              if(member.nickname == reqok.nickname &&
			     member.password == reqok.password){
			     submit.ok="true";
				 break;
			  }
		  }
		  if (submit.ok=="false") {
             submit.reason="id or password error";
		  }
		}//end if (login)

        var string=JSON.stringify(submit);
        var reqs=new Buffer(string);
      }//end if(reqmethod=='POST' && requrl!=='/read_all')




    console.log(req.connection.remoteAddress + ' ' + timestamp_str() +
                ' >>>> "' + pattern + '"');
    if (typeof reqhandlers[pattern] === 'function')
      reqhandlers[pattern](responder, reqs, reqheaders);
    else {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.write(new Buffer('We cannot handle your request.\n'));
      res.end();
    }
 });//end if(req.on)

};//end do_respond_to_an_http_request

var stop_accepting_new_connections = function () {
  console.log('');
  console.log('* SIGINT (CTRL-C) detected.');
  console.log('* The HTTP server will be stopped...');
  srv.close();
};

var stop_this_process = function () {
  console.log('');
  console.log('* SIGINT (CTRL-C) detected more than once.');
  console.log('* Force quit this Node.js program...');
  process.exit(0);
};

var SIGINT_handled = false;

process.on('SIGINT', function () {
  if (SIGINT_handled)
    return stop_this_process();
  SIGINT_handled = true;
  stop_accepting_new_connections();
});

srv.on('request', do_respond_to_an_HTTP_request);

srv.on('listening', function () {
  console.log('* The HTTP server at http://%s:%d/ is up.', hostname, port);
});

srv.on('close', function () {
  console.log('* The HTTP server has been stopped completely.');
});

srv.timeout = 2000;

exports.run = function (configs) {
  configs(port_setter, hostname_setter, handler_setter);
  srv.listen(port, hostname);
};

