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

var ambient_choice_elm=document.getElementById('ambient-choice');
var camera_choice_elm=document.getElementById('camera-choice');
var refresh_elm = document.getElementById('refresh-btn');
var c_refresh_elm = document.getElementById('c_refresh-btn');

var add_option = function(data) {
    var filenameLines=data.split('|');
    for (i=0 ; i<filenameLines.length-1 ; i++) {
        var opt = document.createElement("option");
        opt.text=filenameLines[i];
        opt.value=filenameLines[i];
        ambient_choice_elm.add(opt);
    }
}

var c_add_option = function(data) {
    var filenameLines=data.split('|');
    for (i=0 ; i<filenameLines.length-1 ; i++) {
        var opt = document.createElement("option");
        opt.text=filenameLines[i];
        opt.value=filenameLines[i];
        camera_choice_elm.add(opt);
    }
}

var plot = function(data) {
    var timeLines=[];
    var soundLines=[];
    var dataLines=data.split('\n');
    for (var i=0; i<dataLines.length-1; i++) {
        var req_json=JSON.parse(dataLines[i]);
        timeLines[i]=req_json.Time;
        soundLines[i]=req_json.Sound;
    }
    document.getElementById("lineCanvas").innerHTML = "";
    var g = new line_graph(); 
    for (var i=0 ; i<dataLines.length-1 ; i++) {
        var time=time2num(timeLines[i])-time2num(timeLines[0]);
        var tstring=time.toString();
        g.add(tstring,parseFloat(soundLines[i])*10000);
    }
    g.render("lineCanvas", timeLines[0]);
}

var picture = function(data) {
    image=data.toString('base64');
    document.getElementById("image").src = 'data:image/jpeg;base64,'+image;
}

refresh_elm.addEventListener('click', function () {
    refresh();
});

c_refresh_elm.addEventListener('click', function () {
    c_refresh();
});

function refresh() {
    clear();
    http_post('/readFileName',"",add_option);
};

function c_refresh() {
    c_clear();
    http_post('/c_readFileName',"",c_add_option);
};

function choose(choice) {
    if (choice.value!="")
    http_post('/readFileData',choice.value,plot);  
}

function c_choose(choice) {
    if (choice.value!="")
    http_post('/c_readFileData',choice.value,picture);  
}

function clear() {
    while (ambient_choice_elm.length!=0)
    ambient_choice_elm.remove(0);
    var opt = document.createElement("option");
    opt.text="請選擇";
    opt.value="";
    ambient_choice_elm.add(opt);
}

function c_clear() {
    while (camera_choice_elm.length!=0)
    camera_choice_elm.remove(0);
    var opt = document.createElement("option");
    opt.text="請選擇";
    opt.value="";
    camera_choice_elm.add(opt);
}

function time2num(time) {
    var len = time.length;
    var out=0;
    out=out+parseInt(time[len-2]+time[len-1],10);
    out=out+60*parseInt(time[len-5]+time[len-4],10);
    out=out+3600*parseInt(time[len-8]+time[len-7],10);
    return out;
}

refresh();
c_refresh();
