/*
* Globals
*/
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
    opt.url = 'http://demo.sbc4d.com/public/shugaivr/web/en/generate_log_json.php';
    this.query(opt, cb);
  },
  login: function (opt, cb) {
    opt.url = 'http://demo.sbc4d.com/public/shugaivr/web/en/login.php';
    opt.method = 'POST';
    opt.data = {};
    opt.data.username = 'shuga';
    opt.data.password = 'shuga';
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
Collection.prototype.getPieChartView = function () {
  var gr = _.groupBy(this.entries, function (el) { return el.type; });
  return _.map(gr, function (el, i) {
    return { key: el[0].type, value: el.length, color: COLORS[i]};
  });
};

var Legend = function (params) {

};

/*
* Graph Class
*/
var Graph = function (params) {
  this.id = Date.now();
  this.collection = params.collection;
  this.el = document.createElement('div');
  this.el.id = this.id;
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.chart = new Chart(this.ctx);
  this.chart.Pie(this.collection.getPieChartView());

  this.el.appendChild(this.canvas);
  var parent = document.getElementById('graphs');
  parent.appendChild(this.el);
};

/*
* Main Class
*/
var App = function () {
  var self = this;
  API.login({}, function () {

    API.getData({}, function (err, data) {
      if (err) { return window.alert(err.toString ? err.toString() : 'Error :('); }
      self.currentCollection = new Collection({}, data);
      self.graph = new Graph({collection: self.currentCollection});
    });

  });
};

/*
* main
*/
$(function () {
  window.app = new App();
});