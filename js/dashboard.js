/*
* Globals
*/
var GRAPHS = {
  'getcallsclient': {           title: 'Calls (Method of communication)',           type: 'StackedBar'},
  'getcallscharacters': {       title: 'Calls (Characters)',                        type: 'StackedBar'},
  'getcallsusers': {            title: 'Calls (Registered Users)',                  type: 'StackedBar'},
  'getcallsunique': {           title: 'Calls (Unique Users)',                      type: 'StackedBar'},
  'getmsgdmvscmt': {            title: 'Messages (Direct Message vs Comment)',      type: 'StackedBar'},
  'getmsgdmpercharacter': {     title: 'Messages (Direct Message per Character)',   type: 'StackedBar'},
  'getmsgcmtperconf': {         title: 'Messages (Comments per Confessions)',       type: 'StackedBar'},
  'getcallsstate': {            title: 'Geolocated Calls',                          type: 'StackedBar'},
  //'getgender': {                title: 'Gender',                                    type: 'Doughnut'},
  //'getage': {                   title: 'Age Distribution',                          type: 'Doughnut'},
  'getsmsgender': {             title: 'Gender',                                    type: 'Doughnut'},
  'getsmsage': {                title: 'Age Distribution',                          type: 'Doughnut'},
  'getsessionlength': {         title: 'Average Session Length',                    type: 'StackedBar'},
  'gettransfers': {             title: 'Transfers to NACA',                         type: 'StackedBar'},
  'getconfovertime': {          title: 'Confessions Listening',                     type: 'StackedBar'},
  'getexitpoints': {            title: 'Exit Points',                               type: 'Bar', legend: false },
  'getactions': {               title: 'Actions per User',                          type: 'StackedBar'},
  'getbanned': {                title: 'Banned Users',                              type: 'StackedBar'},
  'geterror': {                 title: 'Errors',                                    type: 'StackedBar'},
  'getsmsovertimeusage': {      title: 'SMS (Activity)',                            type: 'StackedBar'},
  'getsmsovertimenetwork': {    title: 'SMS (Network)',                             type: 'StackedBar'},
  'getsmssubpernetwork': {      title: 'SMS Subscriptions per Network',             type: 'StackedBar'},
  'getsmsoptoutpernetwork': {   title: 'SMS Opt Outs per Network',                  type: 'StackedBar'},
  'getsmscommentscharnet': {    title: 'SMS Comments left per Character/Network',   type: 'StackedBar', manycomments: true },
  'getallcomments': {           title: 'All Comments left per Character',           type: 'StackedBar', manycomments: true }
  //'getsmscommentsnetwork': {    title: 'SMS Comments left per Network',             type: 'StackedBar'},
};

var LABELS = {
  'gettransfers': {
    '1': 'Transferred to NACA',
    '0': 'Not Transferred to NACA'
  },
  'getcallsusers': {
    '1': 'New User',
    '0': 'Registered User'
  },
  'getgender': {
    '0': 'Unknown',
    '1 SMS': 'Male (SMS)',
    '1 IVR': 'Male (IVR)',
    '2 SMS': 'Female (SMS)',
    '2 IVR': 'Female (IVR)'
  },
  'getage': {
    '0': 'Unknown'
  },
  'getsmsovertimeusage': {
    'x-sms-comment-air': 'Comments (Air)',
    'x-sms-comment-mtn': 'Comments (MTN)',
    'x-sms-subscribe-air': 'Subscription (Air)',
    'x-sms-subscribe-mtn': 'Subscription (MTN)',
    'x-sms-register-air': 'Registration (Air)',
    'x-sms-register-mtn': 'Registration (MTN)',
    'x-sms-optout-air': 'Opt Out (Air)',
    'x-sms-optout-mtn': 'Opt Out (MTN)'
  },
  'getmsgdmvscmt': {
    'x-messages-left': 'Messages',
    'x-comments-left': 'Comments'
  },
  'getsmscommentscharnet': {},
  'getexitpoints': {
    'main-menu': 'Main Menu',
    'confession': 'Confession',
    'post-confession-menu': 'Post Cofession Menu',
    'registration-confirm': 'Registration Confirm',
    'registration-accept': 'Registration Accept',
    'message-accept': 'Message Accept',
    'friends': 'Friends'
  }
};
var NIEGRIA_STATES = [
  'Abuja',
  'Anambra',
  'Enugu',
  'Akwa Ibom',
  'Adamawa',
  'Abia',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
  'Unknown'
];
var ORDERED_COLORS = [
  '#FFB553',
  '#F38630',
  '#7D8796',
  '#606978',
  '#3EBFBE',
  '#2D8B8B',
  '#E0E4CC',
  '#CFD5BA',
  '#9A61FF',
  '#FFAFC0',
  '#D1ACFF',
  '#92B2FF',
  '#C4FFF9',
  '#B9FFC1',
  '#F7FFA9',
  '#FFCE91',
  '#FF8A91',
  '#738377'
]
var COLORS = [
  '#FFB553',
  '#3EBFBE',
  '#4A505C',
  '#F38630',
  '#58E14D',
  '#E0E4CC',
  '#F04448',
  '#7D8796',
  '#9A61FF',
  '#FFAFC0',
  '#D1ACFF',
  '#92B2FF',
  '#C4FFF9',
  '#B9FFC1',
  '#F7FFA9',
  '#FFCE91',
  '#FF8A91',
  '#738377'
];
var SESSION_ACTIONS = [
  'A',
  'E',
  'X',
  'Y',
  'D',
  'V'
];
var AGE_RANGES = [
  { label: '0 &mdash; 16',  range: [0, 16]    },
  { label: '16 &mdash; 24', range: [16, 24]   },
  { label: '24 &mdash; 45', range: [24, 45]   },
  { label: 'Older than 45', range: [45, 120]  }
];
var MAX_LABELS = 20;
var NIGERIA_MAP = 'img/nigeria.png';

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
var getConfessions = function getConfessions(d) {
  return _.map(d.match(/Y\d+/g), function (e) { return e.split('Y').pop(); });
};
var getNACA = function getConfessions(d) {
  return d.split('L').length - 1;
};
var getCommentOnConfession = function getCommentOnConfession(d) {
  return d.split('G').length - 1;
};
/*
* API (singleton)
*/
var API = {
  getData: function (opt, cb) {
    var options = {};
    options.url = 'https://shuga.sbc4d.com/en/generate_log_json.php';
    options.data = opt;

    this.query(options, cb);
  },
  login: function (opt, cb) {
    var options = {};
    options.url = 'http://shuga.sbc4d.com/en/login.php';
    options.method = 'POST';
    options.data = {};
    this.query(options, cb);
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
        labels.push(date + '/' + month + '/' + year);
      } else {
        labels.push(' ');
      }

      llp.setDate(llp.getDate() + 1);
      counter += 1;
    }
  }

  return labels;

};

Collection.prototype.getAvgSessionStackedBarData = function (d) {

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
        var val = 0;

        if (d[i][key] && d[i][key].length) {
          var significantData = d[i][key].length;
          for (var k = 0 ; k < d[i][key].length ; k += 1) {

            if (typeof d[i][key][k].endtime === 'undefined') { significantData -= 1; continue; }

            val += d[i][key][k].endtime - d[i][key][k].starttime;
          }
          val /= significantData ? significantData : 1;
        }
        biggests[key] = biggests[key] ? biggests[key] + val : val;
        dsdata.push(val);
        ld.setDate(ld.getDate() + step);
      }
      data.datasets.push({
        fillColor: COLORS[dsnumber],
        data: dsdata,
        value: LABELS[arguments.callee.caller.name] ? LABELS[arguments.callee.caller.name][i] : i
      });
      dsnumber += 1;
    }
  }
  var biggest = _.max(biggests, function (e) { return e; });
  _.extend(data, this.getScaleData(biggest));

  return data;
};
Collection.prototype.getActionsStackedBarData = function (d) {

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
        var val = 0;

        if (d[i][key] && d[i][key].length) {
          var significantData = d[i][key].length;
          for (var k = 0 ; k < d[i][key].length ; k += 1) {
            var hist = d[i][key][k].events['x-history'];
            if (typeof hist === 'undefined') { significantData -= 1; continue; }
            for (var l = 0 ; l < SESSION_ACTIONS.length ; l += 1) {
              val += hist.split(SESSION_ACTIONS[l]).length - 1;
            }
          }
          val /= significantData ? significantData : 1;
        }
        biggests[key] = biggests[key] ? biggests[key] + val : val;
        dsdata.push(val);
        ld.setDate(ld.getDate() + step);
      }
      data.datasets.push({
        fillColor: COLORS[dsnumber],
        data: dsdata,
        value: LABELS[arguments.callee.caller.name] ? LABELS[arguments.callee.caller.name][i] : i
      });
      dsnumber += 1;
    }
  }
  var biggest = _.max(biggests, function (e) { return e; });
  _.extend(data, this.getScaleData(biggest));

  return data;
};
Collection.prototype.getStackedBarDataAllComments = function (d) {

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
        var val = 0;

        if (d[i][key] && d[i][key].length) {
          for (var k = 0 ; k < d[i][key].length ; k += 1) {
            val += parseInt(d[i][key][k].events['x-comments-left'], 10) || 0;
            val += parseInt(d[i][key][k].events['x-sms-comment'], 10) || 0;
          }
        }
        biggests[key] = biggests[key] ? biggests[key] + val : val;
        dsdata.push(val);
        ld.setDate(ld.getDate() + step);
      }
      data.datasets.push({
        fillColor: COLORS[dsnumber],
        data: dsdata,
        value: LABELS[arguments.callee.caller.name] ? LABELS[arguments.callee.caller.name][i] : i
      });
      dsnumber += 1;
    }
  }
  var biggest = _.max(biggests, function (e) { return e; });
  _.extend(data, this.getScaleData(biggest));

  return data;
};
Collection.prototype.getStackedBarDataCpc = function (d) {

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
        var val = 0;

        if (d[i][key] && d[i][key].length) {
          for (var k = 0 ; k < d[i][key].length ; k += 1) {
            var hist = d[i][key][k].events['x-history'];
            if (typeof hist === 'undefined') { continue; }
            val += getCommentOnConfession(hist);
          }
        }
        biggests[key] = biggests[key] ? biggests[key] + val : val;
        dsdata.push(val);
        ld.setDate(ld.getDate() + step);
      }
      data.datasets.push({
        fillColor: COLORS[dsnumber],
        data: dsdata,
        value: LABELS[arguments.callee.caller.name] ? LABELS[arguments.callee.caller.name][i] : i
      });
      dsnumber += 1;
    }
  }
  var biggest = _.max(biggests, function (e) { return e; });
  _.extend(data, this.getScaleData(biggest));

  return data;
};
Collection.prototype.getStackedBarDataUnique = function (d) {
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
        var val = 0;
        var used = {};
        if (d[i][key] && d[i][key].length) {
          console.log(d[i][key]);
          for (var k = 0 ; k < d[i][key].length ; k += 1) {
            var user = d[i][key][k].events['x-user'];
            if (!!!user) { continue; }
            if (used[user]) {
              continue;
            } else {
              val += 1;
              used[user] = true;
            }
          }
        }

        biggests[key] = biggests[key] ? biggests[key] + val : val;
        dsdata.push(val);
        ld.setDate(ld.getDate() + step);
      }
      data.datasets.push({
        fillColor: COLORS[dsnumber],
        data: dsdata,
        value: LABELS[arguments.callee.caller.name] ? LABELS[arguments.callee.caller.name][i] : i
      });
      dsnumber += 1;
    }
  }
  var biggest = _.max(biggests, function (e) { return e; });
  _.extend(data, this.getScaleData(biggest));

  return data;
};
Collection.prototype.getStackedBarData = function (d, ponderatingProp) {
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
        if (ponderatingProp && d[i][key]) {
          val = 0;
          if (typeof d[i][key][0][ponderatingProp] !== 'undefined') {
            for (var h = 0 ; h < d[i][key].length ; h += 1) {
              val += parseInt(d[i][key][h].events[ponderatingProp], 10) || 0;
            }
          } else if (typeof d[i][key][0].events[ponderatingProp] !== 'undefined') {
            for (var g = 0 ; g < d[i][key].length ; g += 1) {
              val += parseInt(d[i][key][g].events[ponderatingProp], 10) || 0;
            }
          }

          if (ponderatingProp === 'x-naca') {
            for (var o = 0 ; o < d[i][key].length ; o += 1) {
              val += d[i][key][o].events['x-history'].split('L').length - 1;
            }
          }
        }
        biggests[key] = biggests[key] ? biggests[key] + val : val;
        dsdata.push(val);
        ld.setDate(ld.getDate() + step);
      }
      data.datasets.push({
        fillColor: COLORS[dsnumber],
        data: dsdata,
        value: LABELS[arguments.callee.caller.name] ? LABELS[arguments.callee.caller.name][i] : i
      });
      dsnumber += 1;
    }
  }
  var biggest = _.max(biggests, function (e) { return e; });
  _.extend(data, this.getScaleData(biggest));

  return data;
};
// can be greatly optimized
Collection.prototype.getPonderedStackedBarData = function (d, opts) {
  var data = { labels: [], datasets: [] };
  var self = this;

  var lp = this.from.getPrecision(this.precision, this.from.getFullYear());
  var up = this.to.getPrecision(this.precision, this.to.getFullYear());

  var step = this.precision === 'week' ? 7 : 1;

  data.labels = this.getLabels(lp, up);

  _.each(d, function (el, key) {
    var grp = _.groupBy(el.data, function (el2) {
      var ds = new Date(el2.starttime * 1000);
      var pre = ds.getPrecision(self.precision, ds.getFullYear());
      return pre.p + '-' + pre.y;
    });

    d[key] = {
      data: grp,
      key: d[key].key,
      single: d[key].single || false
    };
  });

  var dsnumber = 0;
  var colortype = [];
  var biggests = {};
  for (var i in d) {
    if (d.hasOwnProperty(i)) {
      var ld = new Date(this.from);
      var dsdata = [];
      var maxpre = this.to.getPrecision(this.precision).p;
      while (ld.getPrecision(this.precision).p <= maxpre) {
        var ldp = ld.getPrecision(this.precision);
        var key = ldp.p + '-' + ld.getFullYear();

        var val = 0;
        if (d[i].data[key]) {
          for (var k = 0 ; k < d[i].data[key].length ; k += 1) {
            if (typeof d[i].data[key][k][d[i].key] !== 'undefined') {
              val += (d[i].single) ? 1 : (parseInt(d[i].data[key][k][d[i].key], 10) || 0);
            } else if (typeof d[i].data[key][k].events[d[i].key] !== 'undefined') {
              val += (d[i].single) ? 1 : (parseInt(d[i].data[key][k].events[d[i].key], 10) || 0);
            }
          }
        }
        biggests[key] = biggests[key] ? biggests[key] + val : val;
        dsdata.push(val);
        ld.setDate(ld.getDate() + step);
      }
      data.datasets.push({
        fillColor: opts && opts.orderedColors ? ORDERED_COLORS[dsnumber] : COLORS[dsnumber],
        data: dsdata,
        value: LABELS[arguments.callee.caller.name] ? LABELS[arguments.callee.caller.name][i] : i
      });

      dsnumber += 1;
    }
  }

  var biggest = _.max(biggests, function (e) { return e; });
  _.extend(data, this.getScaleData(biggest));

  return data;
};
Collection.prototype.getScaleData = function (b) {
  var data = {};
  var bl = (b + '').split('.')[0].length - 1;
  data.scaleSteps = 10;
  data.scaleStepWidth = Math.pow(10, bl);

  if ((data.scaleStepWidth / 4) % 1 === 0 && data.scaleStepWidth / 4 * data.scaleSteps >= b) { data.scaleStepWidth /= 4; }
  else if ((data.scaleStepWidth / 2) % 1 === 0 && data.scaleStepWidth / 2 * data.scaleSteps >= b) { data.scaleStepWidth /= 2; }

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
Collection.prototype.getcallsusers = function getcallsusers() {
  var d =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return el.type === '1';
        }),
      function (el) {
        return el.events['x-registered'];
      });
  var data = this.getStackedBarData(d);
  return data;
};
Collection.prototype.getcallsunique = function getcallsunique() {
  var d =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return el.type === '1' && el.events && el.events['x-dnid'] && el.events['x-dnid'] === 'skype';
        }
      ),
      function (el) {
        return el.events['x-user'] ? 'Unique Users' : '';
      }
    );
  console.log(d);
  var data = this.getStackedBarDataUnique(d);
  return data;
};
Collection.prototype.geterror = function () {
  var d =
    _.filter(
      this.entries,
      function (el) {
        return el.events['x-error'] && el.events['x-error'].length;
      });
  return this.getStackedBarData({
    'Errors': d
  });
};
Collection.prototype.getexitpoints = function getexitpoints() {
  var d =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return el.type === '1';
        }),
      function (el) {
        return el.events['x-final-state'];
      }
    );
  return this.getSimpleBarData(d);
};
Collection.prototype.getgender = function getgender() {
  var d =
    _.groupBy(this.entries, function (el) {
      return !!el.events['x-user-gender'] ? el.events['x-user-gender'] : 0;
    });

  return this.getDoughnutData(d);
};
Collection.prototype.getage = function getage() {
  var d =
    _.groupBy(this.entries, function (el) {
      if (el.events['x-user-age']) {
        var age = parseInt(el.events['x-user-age'], 10);
        for (var k = 0; k < AGE_RANGES.length ; k += 1) {
          if (age > AGE_RANGES[k].range[0] && age < AGE_RANGES[k].range[1]) {
            return k;
          }
        }
      }

      return 0;
    });

  var data = this.getDoughnutData(d);

  for (var i = 0; i < data.length; i += 1) {
    if (data[i].label !== 'Unknown') {
      data[i].label = AGE_RANGES[parseInt(data[i].label, 10)].label;
    }
  }
  return data;
};
Collection.prototype.getsmsgender = function getgender() {

  var d =
    _.groupBy(
      _.filter(this.entries, function (e) {
        return e.type === '3' && typeof e.events['x-user-gender'] !== 'undefined';
      }),
    function (el) {
      if (typeof el.events['x-user-gender'] !== 'number' && !!el.events['x-user-gender']) { el.events['x-user-gender'] = parseInt(el.events['x-user-gender'], 10); }
      return !!el.events['x-user-gender'] ? el.events['x-user-gender'] + ' SMS' : 0;
    });

  var d2 =
    _.groupBy(
      _.filter(this.entries, function (e) {
        return e.type === '1' && typeof e.events['x-user-gender'] !== 'undefined';
      }),
    function (el) {
      if (typeof el.events['x-user-gender'] !== 'number' && !!el.events['x-user-gender']) { el.events['x-user-gender'] = parseInt(el.events['x-user-gender'], 10); }
      return !!el.events['x-user-gender'] ? el.events['x-user-gender'] + ' IVR' : 0;
    });

  return this.getDoughnutData(_.extend(d, d2));
};
Collection.prototype.getsmsage = function getage() {
  var ccounter = 0;
  var d =
    _.groupBy(
      _.filter(this.entries, function (e) {
        return e.type === '3' && typeof e.events['x-user-age'] !== 'undefined';
      }),
    function (el) {
      if (el.events['x-user-age']) {
        var age = parseInt(el.events['x-user-age'], 10);
        for (var k = 0; k < AGE_RANGES.length ; k += 1) {
          if (age > AGE_RANGES[k].range[0] && age < AGE_RANGES[k].range[1]) {
            return k;
          }
        }
      }
      return 0;
    });

  var data = this.getDoughnutData(d);
  for (var i = 0; i < data.length; i += 1) {
    if (data[i].label !== 'Unknown') {
      data[i].color = COLORS[ccounter++];
      data[i].label = AGE_RANGES[parseInt(data[i].label, 10)].label + ' (SMS)';
    }
  }

  var d2 =
    _.groupBy(
      _.filter(this.entries, function (e) {
        return e.type === '1' && typeof e.events['x-user-age'] !== 'undefined';
      }),
    function (el) {
      if (el.events['x-user-age']) {
        var age = parseInt(el.events['x-user-age'], 10);
        for (var k = 0; k < AGE_RANGES.length ; k += 1) {
          if (age > AGE_RANGES[k].range[0] && age < AGE_RANGES[k].range[1]) {
            return k;
          }
        }
      }
      return 0;
    });

  var data2 = this.getDoughnutData(d2);
  for (var i = 0; i < data2.length; i += 1) {
    if (data2[i].label !== 'Unknown') {
      data2[i].color = COLORS[ccounter++];
      data2[i].label = AGE_RANGES[parseInt(data2[i].label, 10)].label + ' (IVR)';
    } else {
      ccounter++;
    }
  }

  return data.concat(data2);
};
Collection.prototype.getbanned = function getbanned() {
  var d =
    _.filter(
      this.entries,
      function (el) {
        return !!el.events['x-banuser'];
      }
    );
  return this.getStackedBarData({
    'Banned Users': d
  });
};
Collection.prototype.getDoughnutData = function getDoughnutData(data) {
  var values = [];
  var i = 0;
  for (var k in data) {
    if (data.hasOwnProperty(k)) {
      values.push({
        value: data[k].length,
        color: COLORS[i],
        label: LABELS[arguments.callee.caller.name] && LABELS[arguments.callee.caller.name][k] ? LABELS[arguments.callee.caller.name][k] : k
      });
      i += 1;
    }
  }
  return values;
};
Collection.prototype.getSimpleBarData = function (data) {
  var labels = _.keys(data);
  var values = [];
  for (var k = 0 ; k < labels.length ; k += 1) {
    labels[k] = LABELS[arguments.callee.caller.name] && LABELS[arguments.callee.caller.name][labels[k]] ? LABELS[arguments.callee.caller.name][labels[k]] : labels[k];
  }
  _.each(data, function (el) {
    values.push(el.length);
    return;
  });
  var barData = {
    labels: labels,
    datasets: [{
      fillColor: COLORS[0],
      data: values
    }]
  };


  var biggest = _.max(values);
  _.extend(barData, this.getScaleData(biggest));

  return barData;
};
// can be greatly optimized
Collection.prototype.getmsgdmvscmt = function getmsgdmvscmt() {
  return this.getPonderedStackedBarData({
    'x-messages-left': {
      key: 'x-messages-left',
      data: this.entries
    },
    'x-comments-left': {
      key: 'x-comments-left',
      data: this.entries
    }
  });
};
Collection.prototype.getsmsovertimeusage = function getsmsovertimeusage() {

  var keys = {};



  return this.getPonderedStackedBarData({
    'x-sms-subscribe-mtn': {
      key: 'x-sms-subscribe',
      data: _.filter(this.entries, function (el) { return el.events && el.events['x-network'] && el.events['x-network'].indexOf('MTN/Glo') > -1; })
    },
    'x-sms-subscribe-air': {
      key: 'x-sms-subscribe',
      data: _.filter(this.entries, function (el) { return el.events && el.events['x-network'] && el.events['x-network'].indexOf('Airtel/Etisalat') > -1; })
    },
    'x-sms-register-mtn': {
      key: 'x-sms-register',
      data: _.filter(this.entries, function (el) { return el.events && el.events['x-network'] && el.events['x-network'].indexOf('MTN/Glo') > -1; })
    },
    'x-sms-register-air': {
      key: 'x-sms-register',
      data: _.filter(this.entries, function (el) { return el.events && el.events['x-network'] && el.events['x-network'].indexOf('Airtel/Etisalat') > -1; })
    },
    'x-sms-optout-mtn': {
      key: 'x-sms-optout',
      data: _.filter(this.entries, function (el) { return el.events && el.events['x-network'] && el.events['x-network'].indexOf('MTN/Glo') > -1; }),
      single: true
    },
    'x-sms-optout-air': {
      key: 'x-sms-optout',
      data: _.filter(this.entries, function (el) { return el.events && el.events['x-network'] && el.events['x-network'].indexOf('Airtel/Etisalat') > -1; }),
      single: true
    },
    'x-sms-comment-mtn': {
      key: 'x-sms-comment',
      data: _.filter(this.entries, function (el) { return el.events && el.events['x-network'] && el.events['x-network'].indexOf('MTN/Glo') > -1; })
    },
    'x-sms-comment-air': {
      key: 'x-sms-comment',
      data: _.filter(this.entries, function (el) { return el.events && el.events['x-network'] && el.events['x-network'].indexOf('Airtel/Etisalat') > -1; })
    }
  }, {
    orderedColors: true
  });
};
Collection.prototype.getsmsovertimenetwork = function getsmsovertimenetwork() {
  var d = {};
  _.each(
    _.filter(
      this.entries,
      function (el) {
        return el.type === '3' && el.events && el.events['x-sms-sent'];
      }),
    function (el) {
      if ( typeof el.events['x-network'] === 'object') {
        for (var k = 0 ; k < el.events['x-network'].length ; k += 1) {
          if (typeof d[el.events['x-network'][k]] === 'undefined') { d[el.events['x-network'][k]] = [];}
          d[el.events['x-network'][k]].push(el);
        }
      } else {
        if (typeof d[el.events['x-network']] === 'undefined') { d[el.events['x-network']] = [];}
        d[el.events['x-network']].push(el);
      }
    }
  );
  return this.getStackedBarData(d, 'x-sms-sent');
};
Collection.prototype.getsmssubpernetwork = function getsmssubpernetwork() {
  var d =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return el.type === '3' && parseInt(el.events['x-sms-subscribe'], 10);
        }),
      function (el) {
        return typeof el.events['x-network'] === 'object' ? el.events['x-network'][0] : el.events['x-network'];
      }
    );
  return this.getStackedBarData(d);
};
Collection.prototype.getsmsoptoutpernetwork = function getsmsoptoutpernetwork() {
  var d =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return el.type === '3' && parseInt(el.events['x-sms-optout'], 10);
        }),
      function (el) {
        return typeof el.events['x-network'] === 'object' ? el.events['x-network'][0] : el.events['x-network'];
      }
    );

  return this.getStackedBarData(d);
};
Collection.prototype.getsmscommentscharnet = function getsmscommentscharnet() {
  var d =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return el.type === '3';
        }),
      function (el) {
        return el.events['x-character-name'];
      }
    );

  delete d.undefined;

  var params = {};

  for (var k in d) {
    params[k + '-mtn'] = {
      data: _.filter(d[k], function (el) { return el.type === '3' && el.events['x-network'] && el.events['x-network'].indexOf('MTN/Glo')}),
      key: 'x-sms-comment'
    };
    LABELS.getsmscommentscharnet[k + '-mtn'] = k + ' (MTN)';
    params[k + '-air'] = {
      data: _.filter(d[k], function (el) { return el.type === '3' && el.events['x-network'] && el.events['x-network'].indexOf('Airtel/Etisalat')}),
      key: 'x-sms-comment'
    };
    LABELS.getsmscommentscharnet[k + '-air'] = k + ' (AIR)';
  }

  return this.getPonderedStackedBarData(params, {
    orderedColors: true
  });
};
Collection.prototype.getallcomments = function getallcomments() {
  var d =
    _.groupBy(
      _.filter(this.entries, function (el) { return el.type === '3' }),
      function (el) {
        return el.events['x-character-name'];
      }
    );
  delete d.undefined;

  var d2 =
    _.groupBy(
      _.filter(this.entries, function (el) { return el.type === '1' }),
      function (el) {
        return el.events['x-character-name'];
      }
    );
  delete d2.undefined;


  var params = {};

  for (var k in d) {
    params[k + ' (SMS)'] = {
      key: 'x-sms-comment',
      data: d[k]
    };
    if (d2[k]) {
      params[k + ' (IVR)'] = {
        key: 'x-comments-left',
        data: d2[k]
      };
    }
  }

  for (var k in d2) {
    if (d[k] && !params[k + ' (SMS)']) {
      params[k + ' (SMS)'] = {
        key: 'x-sms-comment',
        data: d[k]
      };
    }
    if (!params[k + ' (IVR)']) {
      params[k + ' (IVR)'] = {
        key: 'x-comments-left',
        data: d2[k]
      };
    }
  }

  return this.getPonderedStackedBarData(params, {
    orderedColors: true
  });
};
Collection.prototype.getsmscommentsnetwork = function getsmscommentsnetwork() {
  var d =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return el.type === '3';
        }),
      function (el) {
        return typeof el.events['x-network'] === 'object' ? el.events['x-network'][0] : el.events['x-network'];
      }
    );

  d.Unknown = d.Unknown || [];
  d.Unknown = d.Unknown.concat(d.undefined);
  delete d.undefined;

  return this.getStackedBarData(d, 'x-sms-comment');
};
Collection.prototype.gettransfers = function gettransfers() {
  var data =
  _.groupBy(
    _.filter(
      this.entries,
      function (el) {
        return el.type === '1';
      }),
    function (el) {
      return getNACA(el.events['x-history']);
    }
  );

  delete data[0];

  return this.getStackedBarData(data, 'x-naca');
};
Collection.prototype.getconfovertime = function getconfovertime() {
  var data =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return el.type === '1';
        }),
      function (el) {
        return el.events['x-character-name'];
      }
    );

  return this.getStackedBarData(data, 'x-confessions-played');
};
Collection.prototype.getcallsstate = function getcallsstate() {
  var data =
    _.groupBy(this.entries,
      function (el) {
        return el.events['x-user-state'];
      }
    );

  var d = {};
  _.each(NIEGRIA_STATES, function (el, i) {
    d[el] = {};
    d[el].users = _.filter(data[el], function (inEl) {

      if (typeof inEl.events['x-registered'] === 'string') {
        inEl.events['x-registered'] = parseInt(inEl.events['x-registered'], 10);
      }

      return inEl.events['x-registered'] === 1;
    });
    d[el].sms = _.filter(data[el], function (inEl) { return inEl.type === '3'; });
    d[el].calls = _.filter(data[el], function (inEl) { return inEl.type === '1'; });
  });

  return d;
};
Collection.prototype.getsessionlength = function getsessionlength() {
  return this.getAvgSessionStackedBarData({'Avg Session Length (sec)': _.filter(this.entries, function (el) { return el.type === '1'; })});
};
Collection.prototype.getactions = function getactions() {
  return this.getActionsStackedBarData({'Average Actions per User': this.entries});
};
Collection.prototype.getmsgcmtperconf = function getmsgcmtperconf() {

  var data =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return !!el.events['x-character-name'];
        }),
      function (el) {
        return el.events['x-character-name'];
      }
    );
  return this.getStackedBarData(data, 'x-comments-left');
  //return this.getStackedBarDataCpc(data);

};
Collection.prototype.getmsgdmpercharacter = function () {
  var data =
    _.groupBy(
      _.filter(
        this.entries,
        function (el) {
          return !!el.events['x-character-name'];
        }),
      function (el) {
        return el.events['x-character-name'];
      }
    );

  return this.getStackedBarData(data, 'x-messages-left');
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
  var li;

  if (_.isArray(params)) {
    for (var k = 0 ; k < params.length ; k += 1) {
      li = document.createElement('li');
      li.innerHTML = _.template(this.itemTemplate, { color: params[k].color, value: params[k].label});
      this.el.appendChild(li);
    }
  } else {
    for (var i = 0 ; i < params.datasets.length ; i += 1) {
      li = document.createElement('li');
      li.innerHTML = _.template(this.itemTemplate, { color: params.datasets[i].fillColor, value: params.datasets[i].value});
      this.el.appendChild(li);
    }
  }
};

/*
* Graph Class
*/
var Graph = function (params) {

  this.id = params.id;
  this.graphId = params.id;
  this.data = params.collection;
  this.type = params.type;
  this.title = params.title;
  this.manycomments = params.manycomments;

  var existing = document.getElementById(params.id);
  if (existing) { existing.parentNode.removeChild(existing); }

  this.render();
  this.drawGraph();
};
Graph.prototype.setCloseButton = function () {
  var closeButton = document.createElement('div');
  closeButton.className = 'closebutton';
  closeButton.innerHTML = 'X';
  //this.el.appendChild(closeButton);
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
Graph.prototype.render = function () {

  this.el = document.createElement('div');
  this.el.id = this.id;
  this.el.className = 'graph';
  this.setTitle(this.title);

  if (this.manycomments) {
    this.el.className += ' manycomments';
  }

  if (this.id !== 'getcallsstate') {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 600;
    this.canvas.height = 450;
    this.ctx = this.canvas.getContext('2d');
    this.chart = new window.Chart(this.ctx);
    this.el.appendChild(this.canvas);
  } else {
    this.map = document.createElement('img');
    this.map.src = NIGERIA_MAP;
    this.map.width = 650;
    this.map.height = 450;
    this.el.appendChild(this.map);
  }

  var parent = document.getElementById('graphs');
  parent.appendChild(this.el);

};
Graph.prototype.drawGraph = function () {

  var data = this.data[this.graphId].call(this.data);
  var graph = this.type;
  var options = {};
  if (this.type === 'Doughnut') {

  } else {
    _.extend(options, {
      barStrokeWidth: 0,
      scaleOverride : true,
      scaleSteps : data.scaleSteps,
      scaleStepWidth : data.scaleStepWidth,
      scaleStartValue : 0,
    });
  }

  if (this.id !== 'getcallsstate') {

    if (this.type === 'StackedBar' && !data.datasets.length) {
      data.datasets.push({
        fillColor: '#000',
        data: [],
        value: 'No data'
      });
    }

    this.chart[graph].call(this.chart, data, options);
    if ((typeof GRAPHS[this.id].legend !== 'undefined' && GRAPHS[this.id].legend) ||
        typeof GRAPHS[this.id].legend === 'undefined') {
      this.legend = new Legend(data);
      this.el.appendChild(this.legend.el);
    } else {
      $(this.el).addClass('no-legend');
    }
  } else {
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        var el = document.createElement('div');
        el.className = 'state-label ' + k.toLowerCase().replace(' ', '_');

        var smsLabel = document.createElement('span');
        smsLabel.className = 'sms';
        smsLabel.appendChild(document.createTextNode(data[k].sms.length));

        var callsLabel = document.createElement('span');
        callsLabel.className = 'calls';
        callsLabel.appendChild(document.createTextNode(data[k].calls.length));

        var usersLabel = document.createElement('span');
        usersLabel.className = 'users';
        usersLabel.appendChild(document.createTextNode(data[k].users.length));

        var stateLabel = document.createElement('span');
        stateLabel.className = 'state';
        stateLabel.appendChild(document.createTextNode(k));

        el.appendChild(usersLabel);
        el.appendChild(callsLabel);
        el.appendChild(smsLabel);
        el.appendChild(stateLabel);

        this.el.appendChild(el);
      }
    }
  }
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
  this.toDatePicker = this.$('.to').datepicker('setValue', now);
  this.fromDatePicker = this.$('.from').datepicker('setValue', new Date('11/28/2013'));
};
Picker.prototype.getForm = function () {
  var to = new Date(this.$('.to').val());
  to.setHours(23);
  to.setMinutes(59);
  to.setSeconds(59);
  to.setMilliseconds(0);
  var options = {
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
  this.picker.$('input[type=checkbox]').on('change', this.onGraphChange.bind(this));
  this.picker.$('.precision').on('change', this.reloadData.bind(this));
  this.picker.$('.from, .to').datepicker().on('changeDate', this.reloadData.bind(this));
  this.picker.$('.find').on('click', this.find.bind(this));
  $('#graphs').on('click', '.closebutton', this.removeGraph.bind(this));
};

App.prototype.find = function (e) {
  var $el = $(e.target);
  var id = $el.data('id');
  var posY = $('#graphs').scrollTop() + $('#' + id).position().top;

  $('#graphs').animate({
    scrollTop: posY
  }, 400);
};

App.prototype.reloadData = function () {

  var options = this.picker.getForm();
  var self = this;

  this.picker.$('.from, .to').datepicker('hide');

  if (self.pending) {}
  //API.login({}, function () {
    API.getData({
      starttime: options.from.getTime() / 1000,
      endtime: options.to.getTime() / 1000
    }, function (err, data) { //
      if (err) { return window.alert(err.toString ? err.toString() : 'Error :('); }
      self.pending = true;
      self.data = new Collection(options, data);
      self.onDataChange();
    });
  //});
};
App.prototype.onDataChange = function () {
  var self = this;
  this.picker.$('input[type=checkbox]:checked').each(function () {
    self.createGraph(this.value);
  });
};
App.prototype.removeGraph = function (e) {
  var id = $(e.target).closest('.graph').length ? $(e.target).closest('.graph')[0].id : e.target.value;

  if ($('#' + id + '-f').is(':checked')) {
    $('#' + id + '-f')[0].checked = false;
  }

  this.graphs[id].destroy();
  this.graphs[id] = null;
};
App.prototype.onGraphChange = function (e) {
  $(e.target).closest('p').toggleClass('active');
  if ($(e.target).is(':checked')) {
    $(e.target).addClass('checked');
    if (this.data) {
      this.createGraph(e.target.value);
    } else {
      this.reloadData();
    }
  } else {
    this.removeGraph(e);
  }
};
App.prototype.createGraph = function (id) {
  var self = this;
  var options = this.picker.getForm();
  options.id = id;
  options.graph = GRAPHS[id];
  if (this.data) {

    if (options.graph.deactivated) { return false; }

    var graph = new Graph(_.extend(options.graph, {id: options.id, collection: self.data}));
    self.graphs[graph.id] = graph;
  }
};

/*
* main
*/
$(function () {
  window.app = new App();
});