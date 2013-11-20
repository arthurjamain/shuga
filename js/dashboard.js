/*
* Globals
*/
var GRAPHS = {
  'getcallsclient': {           title: 'Calls (Method of communication)',           type: 'StackedBar'},
  'getcallscharacters': {       title: 'Calls (Characters)',                        type: 'stackedbar'},
  'getcallsusers': {            title: 'Calls (User Ancienty)',                     type: 'stackedbar'},
  'getmsgdmvscmt': {            title: 'Messages (Direct Messages vs. Comments)',   type: 'stackedbar'},
  'getmsgdmpercharacter': {     title: 'Messages (Direct Messages per Character)',  type: 'stackedbar'},
  'getmsgcmtperconf': {         title: 'Messages (Comments per Confessions)',       type: 'stackedbar'},
  'getcallsstate': {            title: 'Geolocated Calls',                          type: 'stackedbar'},
  'getgender': {                title: 'Genders',                                   type: 'stackedbar'},
  'getage': {                   title: 'Age',                                       type: 'stackedbar'},
  'getsessionlength': {         title: 'Average Session Length',                    type: 'stackedbar'},
  'gettransfers': {             title: 'Transfers to NACA',                         type: 'stackedbar'},
  'getconfovertime': {          title: 'Confessions Listening',                     type: 'stackedbar'},
  'getexitpoints': {            title: 'Exit Points',                               type: 'stackedbar'},
  'getactions': {               title: 'Actions per User',                          type: 'stackedbar'},
  'getbanned': {                title: 'Banned Users',                              type: 'stackedbar'},
  'geterror': {                 title: 'Errors',                                    type: 'stackedbar'}
};
var COLORS = [
  '#F38630',
  '#E0E4CC',
  '#69D2E7'
];

/*
* API (singleton)
*/
var API = {
  getData: function (opt, cb) {
    var options = {};
    options.url = 'http://demo.sbc4d.com/public/shugaivr/web/en/generate_log_json.php';
    options.data = opt;

    this.query(options, cb);
  },
  login: function (opt, cb) {
    var options = {};
    options.url = 'http://demo.sbc4d.com/public/shugaivr/web/en/login.php';
    options.method = 'POST';
    options.data = {};
    options.data.username = 'shuga';
    options.data.password = 'shuga';
    this.query(opt, cb);
  },
  query: function (opt, cb) {
    $.ajax(_.extend(opt || { }, {
      success   : function (data) { cb(null, data); },
      error     : function (xhr, status, error) { cb(error, null); },
      dataType  : 'json'
    }));
  }
};

/*
* Data Class
*/
var Collection = function (params, data) {
  this.entries = data.content || [];
};
Collection.prototype.getcallsclient = function () {
  var gr = _.groupBy(this.entries, function (el) { return el.type; });
  return _.map(gr, function (el, i) {
    return { key: el[0].type, value: el.length, color: COLORS[i]};
  });
};
Collection.prototype.getPieChartView = function () {
  var gr = _.groupBy(this.entries, function (el) { return el.type; });
  return _.map(gr, function (el, i) {
    return { key: el[0].type, value: el.length, color: COLORS[i]};
  });
};

var Legend = function (params) {
  this.el = document.createElement('ul');
  this.el.className = 'legend';
};

/*
* Graph Class
*/
var Graph = function (params) {
  this.id = params.id;
  this.data = params.collection;
  this.type = params.type;

  var existing = document.getElementById(this.id);
  if (existing) { existing.parentNode.removeChild(existing); }

  this.el = document.createElement('div');
  this.el.id = this.id;
  this.canvas = document.createElement('canvas');
  this.canvas.width = 800;
  this.canvas.height = 600;
  this.ctx = this.canvas.getContext('2d');
  this.chart = new window.Chart(this.ctx);
  this.legend = new Legend({});

  this.el.appendChild(this.canvas);
  var parent = document.getElementById('graphs');
  parent.appendChild(this.el);

  this.drawGraph();
};
Graph.prototype.drawGraph = function () {

  var data = this.data[this.id].call(this.data);
  var graph = this.type;
  var barChartData = {
    labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets : [
      {
        fillColor : 'rgba(220,220,220,0.5)',
        strokeColor : 'rgba(220,220,220,1)',
        data : [11]
      },
      {
        fillColor : 'rgba(151,187,205,0.5)',
        strokeColor : 'rgba(151,187,205,1)',
        data : [12]
      },
      {
        fillColor : 'rgba(51,87,255,0.5)',
        strokeColor : 'rgba(51,87,255,1)',
        data : [13]
      }
    ]
  };
  this.chart[graph].call(this.chart, barChartData, {
    scaleOverride : true,
    scaleSteps : 10,
    scaleStepWidth : 10,
    scaleStartValue : 0,
  });
};

/*
* Picker class
*/
var Picker = function () {
  this.el = document.getElementById('pickers');
  this.$el = $(this.el);
  this.template = $('#tpl-picker').text();
  this.pickers = [];
  this.el.innerHTML = _.template(this.template, { graphs: GRAPHS });
  this.$ = function (sel) { return $(sel, this.el); };
  var now = new Date();
  this.$('.to').datepicker('setValue', now);
  this.$('.from').datepicker('setValue', now.setMonth(now.getMonth() - 3));
};
Picker.prototype.getForm = function () {
  var options = {
    graph: GRAPHS[this.$('.graph').val()],
    id: this.$('.graph').val(),
    precision: this.$('.precision').val(),
    from: new Date(this.$('.from').val()),
    to: new Date(this.$('.to').val())
  };

  if (options.from.getTime() && options.to.getTime() && options.from.getTime() < options.to.getTime()) {
    return options;
  } else {
    return false;
  }

};

/*
* Main Class
*/
var App = function () {
  this.picker = new Picker();
  this.graphs = [];
  this.listen();
};

App.prototype.listen = function () {
  this.picker.$('.generate').on('click', _.bind(this.createGraph, this));
};

App.prototype.createGraph = function () {
  var self = this;
  var options = this.picker.getForm();
  if (options) {
    API.login({}, function () { // Get session (debug)
      API.getData({
        starttime: options.from.getTime() / 1000,
        endtime: options.to.getTime() / 1000
      }, function (err, data) { //
        if (err) { return window.alert(err.toString ? err.toString() : 'Error :('); }
        self.data = new Collection({}, data);
        self.graphs.push(new Graph(_.extend(options.graph, {id: options.id, collection: self.data})));
      });
    });
  } else {
    window.alert('The form is incomplete or incorrect. Please check !');
  }
};

/*
* main
*/
$(function () {
  window.app = new App();
});