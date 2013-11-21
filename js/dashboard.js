/*
* Globals
*/
var GRAPHS = {
  'getcallsclient': {           title: 'Calls (Method of communication)',           type: 'StackedBar'},
  'getcallscharacters': {       title: 'Calls (Characters)',                        type: 'StackedBar'},
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
  '#69D2E7',
  '#F38630',
  '#E0E4CC'
];
var MAX_LABELS = 20;

Date.prototype.getWeekOfYear = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};
Date.prototype.getDayOfYear = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((this - onejan) / 86400000);
};
Date.prototype.getPrecision = function (pre) {
  if (pre === 'week') {
    return {p: this.getWeekOfYear(), y: this.getFullYear()};
  } else if (pre === 'day') {
    return {p: this.getDayOfYear(), y: this.getFullYear()};
  }
};
var fromDayOfYear = function (d, y) {
  var date = new Date(y, 0);
  return new Date(date.setDate(d));
};
function isLeapYear(year) {
  return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
}
function getWeeksOfYear(year) {
  var firstDayOfYear = new Date(year, 0, 1);
  var days = firstDayOfYear.getDay() + (isLeapYear(year) ? 366 : 365);
  return Math.ceil(days / 7);
}

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
      success   : function (data) { cb(null, data/* window.DATA */); },
      error     : function (xhr, status, error) { cb(error, null); },
      dataType  : 'json'
    }));
  }
};

/*
* Data Class
*/
var Collection = function (params, data) {
  this.from = params.from;
  this.to = params.to;
  this.id = params.id;
  this.precision = params.precision;
  this.key = this.id + '-' + this.from.getTime() + '-' + this.to.getTime();
  this.entries = data.content || [];
};
Collection.prototype.getLabels = function (lp, up) {

  var labels = [];
  var counter = 0;

  if (this.precision === 'week') {
    var actualLp = lp.p;
    if (lp.y < up.y) {
      actualLp = lp.p - getWeeksOfYear(lp.y);
    }
    for (var i = actualLp ; i <= up.p ; i += 1) {
      if (i < 0) { labels.push('W' + (lp.p + counter) + ' Y' + lp.y); }
      else { labels.push('W' + (i) + ' Y' + up.y); }
      counter += 1;
    }
  } else if (this.precision === 'day') {
    var mod;
    var llp = fromDayOfYear(lp.p, lp.y);
    var lup = fromDayOfYear(up.p, up.y);
    var diffdays = Math.round(Math.abs((llp.getTime() - lup.getTime()) / 86400000));
    if (diffdays > MAX_LABELS) { mod = Math.floor(diffdays / MAX_LABELS); }
    while (llp <= lup) {
      if (counter % mod === 0 || !mod) {
        var date = llp.getDate();
        var month = llp.getMonth() + 1;
        var year = llp.getFullYear();
        labels.push(month + '/' + date + '/' + year);
      } else {
        labels.push(' ');
      }

      llp.setDate(llp.getDate() + 1);
      counter += 1;
    }
  }

  return labels;

};
Collection.prototype.getStackedBarData = function (d) {
  var data = { labels: [], datasets: [] };
  var self = this;

  var lp = this.from.getPrecision(this.precision, this.from.getFullYear());
  var up = this.to.getPrecision(this.precision, this.to.getFullYear());

  var step = this.precision === 'week' ? 7 : 1;

  data.labels = this.getLabels(lp, up);

  _.each(d, function (el, key) {
    d[key] = _.groupBy(el, function (el2) {
      var ds = new Date(el2.starttime * 1000);
      var pre = ds.getPrecision(self.precision, ds.getFullYear());
      return pre.p + '-' + pre.y;
    });
  });

  var dsnumber = 0;
  var biggests = {};
  for (var i in d) {
    if (d.hasOwnProperty(i)) {
      var ld = new Date(this.from);
      var dsdata = [];
      var maxpre = this.to.getPrecision(this.precision).p;
      while (ld.getPrecision(this.precision).p <= maxpre) {
        var ldp = ld.getPrecision(this.precision);
        var key = ldp.p + '-' + ld.getFullYear();
        var val = d[i][key] ? d[i][key].length : 0;
        biggests[key] = biggests[key] ? biggests[key] + val : val;
        dsdata.push(val);
        ld.setDate(ld.getDate() + step);
      }
      data.datasets.push({
        fillColor: COLORS[dsnumber],
        data: dsdata,
        value: i
      });

      dsnumber += 1;
    }
  }
  var biggest = _.max(biggests, function (e) { return e; });

  data.scaleStepWidth = (biggest + '').length - 1 || 1;
  data.scaleSteps = biggest / data.scaleStepWidth;

  return data;
};
Collection.prototype.getcallsclient = function () {
  var d =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return el.type === '1';
        }),
      function (el) {
        return el.events['x-dnid'];
      });
  return this.getStackedBarData(d);
};
Collection.prototype.getcallscharacters = function () {
  var d =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return el.type === '1';
        }),
      function (el) {
        return el.events['x-character-name'];
      });
  return this.getStackedBarData(d);
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
  this.itemTemplate = '<div class="color" style="background:<%= color %>"></div><p><%=value%></p>';

  for (var i = 0 ; i < params.datasets.length ; i += 1) {
    var li = document.createElement('li');
    li.innerHTML = _.template(this.itemTemplate, { color: params.datasets[i].fillColor, value: params.datasets[i].value});
    this.el.appendChild(li);
  }
};

/*
* Graph Class
*/
var Graph = function (params) {

  var key = params.id + params.collection.from.getTime() + params.collection.to.getTime() + params.collection.precision;

  this.id = key;
  this.graphId = params.id;
  this.data = params.collection;
  this.type = params.type;

  var existing = document.getElementById(key);
  if (existing) { existing.parentNode.removeChild(existing); }

  this.el = document.createElement('div');
  this.el.id = key;
  this.el.className = 'graph';
  this.canvas = document.createElement('canvas');
  this.canvas.width = 600;
  this.canvas.height = 450;
  this.ctx = this.canvas.getContext('2d');
  this.chart = new window.Chart(this.ctx);

  this.setTitle(params.title);
  this.setCloseButton();

  this.el.appendChild(this.canvas);
  var parent = document.getElementById('graphs');
  parent.appendChild(this.el);

  this.drawGraph();
};
Graph.prototype.setCloseButton = function () {
  var closeButton = document.createElement('div');
  closeButton.className = 'closebutton';
  closeButton.innerHTML = 'X';
  this.el.appendChild(closeButton);
};
Graph.prototype.setTitle = function (t) {
  var title = document.createElement('h3');
  title.className = 'title';
  title.innerHTML = t;
  this.el.appendChild(title);
};
Graph.prototype.destroy = function () {
  this.el.parentNode.removeChild(this.el);
  this.el = null;
  this.canvas = null;
  this.ctx = null;
  this.chart = null;
};
Graph.prototype.drawGraph = function () {

  var data = this.data[this.graphId].call(this.data);
  var graph = this.type;
  this.chart[graph].call(this.chart, data, {
    scaleOverride : true,
    scaleSteps : data.scaleSteps,
    scaleStepWidth : data.scaleStepWidth,
    scaleStartValue : 0,
  });
  this.legend = new Legend(data);
  this.el.appendChild(this.legend.el);
};

/*
* Picker class
*/
var Picker = function () {
  this.el = document.getElementById('picker');
  this.$el = $(this.el);
  this.template = $('#tpl-picker').text();
  this.pickers = [];
  this.el.innerHTML = _.template(this.template, { graphs: GRAPHS });
  this.$ = function (sel) { return $(sel, this.el); };
  var now = new Date();
  this.$('.to').datepicker('setValue', now);
  this.$('.from').datepicker('setValue', now.setDate(now.getDate() - 14));
};
Picker.prototype.getForm = function () {
  var to = new Date(this.$('.to').val());
  to.setHours(23);
  to.setMinutes(59);
  to.setSeconds(59);
  to.setMilliseconds(0);
  var options = {
    graph: GRAPHS[this.$('.graphname').val()],
    id: this.$('.graphname').val(),
    precision: this.$('.precision').val(),
    from: new Date(this.$('.from').val()),
    to: to
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
  this.graphs = {};
  this.listen();
};

App.prototype.listen = function () {
  this.picker.$('.generate').on('click', _.bind(this.createGraph, this));
  $('#graphs').on('click', '.closebutton', this.removeGraph.bind(this));
};
App.prototype.removeGraph = function (e) {
  var id = $(e.target).closest('.graph')[0].id;
  this.graphs[id].destroy();
  this.graphs[id] = null;
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
        self.data = new Collection(options, data);
        var graph = new Graph(_.extend(options.graph, {id: options.id, collection: self.data}));
        self.graphs[graph.id] = graph;
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